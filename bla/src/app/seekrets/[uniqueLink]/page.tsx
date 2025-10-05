'use client';

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Link from 'next/link';
import {Seekret, seekretService} from '@/lib/seekret';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {authService} from "@/lib/auth";

export default function SeekretView() {
  const router = useRouter();
  const {uniqueLink} = useParams();
  const [seekret, setSeekret] = useState<Seekret | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    if (uniqueLink) {
      loadSeekret(uniqueLink as string);
    }
  }, [uniqueLink]);

  const loadSeekret = async (link: string) => {
    try {
      const data = await seekretService.getSeekretByLink(link);
      setSeekret(data);
    } catch (err) {
      setError('Seekret not found');
    } finally {
      setIsLoading(false);
    }
  };

  const generateAssignments = async () => {
    if (!seekret) return;

    setIsGenerating(true);
    setError('');

    try {
      const updated = await seekretService.generateAssignments(seekret.uniqueLink);
      setSeekret(updated);
    } catch (err) {
      setError('Failed to generate assignments. Please check your constraints.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Seekret...</p>
        </div>
      </div>
    );
  }

  if (error && !seekret) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!seekret) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div style={{
          flex: 1,
          flexDirection: "row"
        }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/dashboard" className="text-red-600 hover:underline mb-2 block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">{seekret.name}</h1>
              <p className="text-gray-600">
                Created by {seekret.ownerName} on {new Date(seekret.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div
              style={{
                justifyContent: "flex-end",
              }}
              className="flex gap-2 mt-4"
            >
              <Link href={`/seekrets/${seekret.uniqueLink}/edit`} className="btn btn-secondary">
                Edit
              </Link>
              <button
                onClick={async () => {
                  if (confirm('Are you sure you want to delete this Seekret?')) {
                    try {
                      await seekretService.deleteSeekret(seekret.uniqueLink);
                      window.location.href = '/dashboard';
                    } catch {
                      setError('Failed to delete Seekret.');
                    }
                  }
                }}
                className="btn bg-red-600 hover:bg-red-700 text-white flex items-center justify-center p-2 rounded-full"
                title="Delete"
              >
                <DeleteOutlineRoundedIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Participants ({seekret.participants.length})</h2>
            <div className="space-y-2">
              {seekret.participants.map((participant, index) => (
                <div key={participant.id || index}
                     className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{participant.name}</span>
                  <span className="text-gray-600 text-sm">{participant.email}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Constraints</h2>
            {seekret.constraints.length === 0 ? (
              <p className="text-gray-500">No constraints set</p>
            ) : (
              <div className="space-y-2">
                {seekret.constraints.map((constraint, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <span className="font-medium">{constraint.giverEmail}</span>
                    <span className="text-gray-600"> cannot give to </span>
                    <span className="font-medium">{constraint.cannotReceiveEmail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {seekret.assignmentsGenerated && (
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-4">🎁 Secret Santa Links</h2>
            <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
              <p className="text-green-800 font-medium">✅ Assignments have been generated!</p>
              <p className="text-green-600 text-sm">Share the link with each participant so they can view their own assignment.</p>
            </div>
            <div className="space-y-3">
              {seekret.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between bg-gray-50 rounded p-3">
                  <div>
                    <span className="font-medium">{participant.name}</span>
                    <span className="text-gray-600 text-sm ml-2">{participant.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-gray-200 rounded px-2 py-1 select-all">
                      {`${window.location.origin}/seekrets/${seekret.uniqueLink}/participant/${participant.id}`}
                    </span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        const url = `${window.location.origin}/seekrets/${seekret.uniqueLink}/participant/${participant.id}`;
                        navigator.clipboard.writeText(url);
                        alert('Link copied to clipboard!');
                      }}
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!seekret.assignmentsGenerated && (
          <button
            onClick={generateAssignments}
            disabled={isGenerating}
            className="btn bg-green-600 text-white w-full mt-6"
          >
            {isGenerating ? 'Generating...' : 'Generate Assignments'}
          </button>
        )}
      </div>
    </div>
  );
}
