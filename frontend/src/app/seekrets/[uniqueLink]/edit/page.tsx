'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
  seekretService,
  CreateSeekretRequest,
  Participant,
  Constraint,
  Seekret,
  UpdateSeekretRequest
} from '@/lib/seekret';
import SeekretForm from '@/app/seekrets/SeekretForm';

export default function EditSeekret() {
  const router = useRouter();
  const {uniqueLink} = useParams();
  const [seekret, setSeekret] = useState<Seekret | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (uniqueLink) {
      seekretService.getSeekretByLink(uniqueLink as string)
        .then(setSeekret)
        .catch(() => setError('Failed to load Seekret.'))
        .finally(() => setIsLoading(false));
    }
  }, [uniqueLink]);

  const updateSeekret = async (data: CreateSeekretRequest) => {
    if (!uniqueLink) return;
    try {
      const requestData = { seekretRequest: data, uniqueLink } as UpdateSeekretRequest;
      return await seekretService.updateSeekret(requestData);
    } catch {
      setError('Failed to update Seekret.');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!seekret) {
    return <div className="container mx-auto px-4 py-8 text-red-600">{error || 'Seekret not found.'}</div>;
  }

  return (
    <SeekretForm
      initialName={seekret.name}
      initialParticipants={seekret.participants as Participant[]}
      initialConstraints={seekret.constraints as Constraint[]}
      onSubmit={updateSeekret}
      onCancelHref={`/seekrets/${uniqueLink}`}
      submitText="Update Seekret"
      initialError={error}
    />
  );
}
