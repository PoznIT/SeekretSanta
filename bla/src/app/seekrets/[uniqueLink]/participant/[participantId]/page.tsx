'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { seekretService, Seekret, Assignment } from '@/lib/seekret';

export default function ParticipantAssignmentPage() {
  const { uniqueLink, participantId } = useParams();
  const [assignmentName, setAssignmentName] = useState<String | null>(null);
  const [seekretName, setSeekretName] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (uniqueLink && participantId) {
      fetchAssignment(uniqueLink as string, participantId as string).then(r => {});
    }
  }, [uniqueLink, participantId]);

  const fetchAssignment = async (link: string, pid: string) => {
    setIsLoading(true);
    setError('');
    try {
      const assignedParticipantName = await seekretService.getAssignedParticipantName(link, pid);
      const seekretName = await seekretService.getSeekretNameByLink(link);

      if (!seekretName) {
        setError('Seekret not found.');
        setIsLoading(false);
        return;
      }
      setSeekretName(seekretName)

      if (!assignedParticipantName) {
        setError('No assignment found for this participant.');
        setIsLoading(false);
        return;
      }
      console.log("Assignment fetched:", assignedParticipantName);
      setAssignmentName(assignedParticipantName)
    } catch {
      setError('Failed to load assignment.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading assignment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }
  if (!assignmentName) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto card text-center">
        <h2 className="text-2xl text-gray-500">{seekretName}</h2>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🎁 Your Secret Santa Assignment</h1>
        <div className="my-8">
          <div className="text-lg text-gray-700 mb-2">You are giving a gift to:</div>
          <div className="text-2xl font-bold text-red-600 mb-2">{assignmentName}</div>
        </div>
        <Link href={`/`} className="btn btn-secondary mt-4">Back to home</Link>
      </div>
    </div>
  );
}
