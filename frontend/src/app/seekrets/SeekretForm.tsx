'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Switch } from '@mui/material';

import {Participant, CreateSeekretRequest, Seekret} from '@/lib/seekret';


type Props = {
  initialName?: string;
  initialParticipants?: Participant[];
  initialConstraints?: Constraint[];
  initialIsLoading?: boolean;
  initialError?: string;
  onSubmit: (data: CreateSeekretRequest) => Promise<Seekret | undefined>;
  onCancelHref: string;
  submitText: string;
};


// Update Constraint type to include 'type'
type Constraint = {
  giverEmail: string;
  cannotReceiveEmail: string;
  type?: 'UNIDIRECTIONAL' | 'BIDIRECTIONAL';
};


export default function SeekretForm(
  {
    initialName = '',
    initialParticipants = [{name: '', email: ''}, {name: '', email: ''}],
    initialConstraints = [],
    initialIsLoading = false,
    initialError = '',
    onCancelHref = '/dashboard',
    onSubmit,
    submitText,
  }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [constraints, setConstraints] = useState<Constraint[]>(initialConstraints);
  const [isLoading, setIsLoading] = useState(initialIsLoading);
  const [error, setError] = useState(initialError);

  const addParticipant = () => {
    setParticipants([...participants, {name: '', email: ''}]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 2) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    const updated = [...participants];
    updated[index] = {...updated[index], [field]: value};
    setParticipants(updated);
  };

  const addConstraint = () => {
    if (participants.length >= 2) {
      setConstraints([
        ...constraints,
        { giverEmail: '', cannotReceiveEmail: '', type: 'UNIDIRECTIONAL' }
      ]);
    }
  };

  const removeConstraint = (index: number) => {
    setConstraints(constraints.filter((_, i) => i !== index));
  };

  const updateConstraint = (index: number, field: keyof Constraint, value: string) => {
    const updated = [...constraints];
    if (field === 'type') {
      updated[index][field] = value as 'UNIDIRECTIONAL' | 'BIDIRECTIONAL';
    } else {
      updated[index][field] = value;
    }
    setConstraints(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Validate participants
    const validParticipants = participants.filter(p => p.name.trim() && p.email.trim());
    if (validParticipants.length < 2) {
      setError('At least 2 participants are required');
      setIsLoading(false);
      return;
    }
    // Validate constraints: all fields must be set
    for (let i = 0; i < constraints.length; i++) {
      const c = constraints[i];
      if (!c.giverEmail || !c.cannotReceiveEmail) {
        setError(`All constraint fields must be set (row ${i + 1})`);
        setIsLoading(false);
        return;
      }
      if (!c.type) {
        setError(`Constraint type must be set (row ${i + 1})`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const request: CreateSeekretRequest = {
        name: name.trim(),
        participants: validParticipants,
        constraints: constraints.map(c => ({
          giverEmail: c.giverEmail,
          cannotReceiveEmail: c.cannotReceiveEmail
        }))
      };
      console.log(request)
      const seekret = await onSubmit(request);
      if (seekret) {
        router.push(`/seekrets/${seekret.uniqueLink}`);
      }
    } catch (err) {
      setError('Failed to create Seekret. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="text-red-600 hover:underline mr-4">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Create New Seekret</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <div>
              <label htmlFor="name" className="form-label">Event Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Christmas 2024 Secret Santa"
                required
              />
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Participants</h2>
              <button
                type="button"
                onClick={addParticipant}
                className="btn btn-secondary"
              >
                Add Participant
              </button>
            </div>

            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                      className="form-input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={participant.email}
                      onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                      className="form-input"
                      placeholder="john@example.com"
                    />
                  </div>
                  {participants.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="btn btn-secondary px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Constraints (Optional)</h2>
              <button
                type="button"
                onClick={addConstraint}
                className="btn btn-secondary"
                disabled={participants.length < 2}
              >
                Add Constraint
              </button>
            </div>

            {constraints.length === 0 ? (
              <p className="text-gray-500">No constraints set. Anyone can give to anyone.</p>
            ) : (
              <div className="space-y-3">
                {constraints.map((constraint, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <select
                      value={constraint.giverEmail || ''}
                      onChange={(e) => updateConstraint(index, 'giverEmail', e.target.value)}
                      className="form-input flex-1"
                    >
                      <option value="">Select participant</option>
                      {participants.map((p, i) => (
                        <option key={i} value={p.email}>{p.name || `Participant ${i + 1}`}</option>
                      ))}
                    </select>
                    <span className="text-gray-500">cannot give to</span>
                    <select
                      value={constraint.cannotReceiveEmail || ''}
                      onChange={(e) => updateConstraint(index, 'cannotReceiveEmail', e.target.value)}
                      className="form-input flex-1"
                    >
                      <option value="">Select participant</option>
                      {participants.map((p, i) => (
                        <option key={i} value={p.email}>{p.name || `Participant ${i + 1}`}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeConstraint(index)}
                      className="p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                      title="Remove constraint"
                    >
                      <BackspaceRoundedIcon className="w-6 h-6 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Link href={onCancelHref} className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary flex-1"
            >
              {isLoading ? 'Creating...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
