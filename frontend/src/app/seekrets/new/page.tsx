'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { seekretService, CreateSeekretRequest, Participant, Constraint } from '@/lib/seekret';
import SeekretForm from "@/app/seekrets/SeekretForm";

export default function NewSeekret() {
  const router = useRouter();

  const createSeekret = async (data: CreateSeekretRequest) => {
    const created = await seekretService.createSeekret(data);
    router.push(`/seekrets/${created.uniqueLink}`);
  };

  return (
    <SeekretForm
      onSubmit={createSeekret}
      onCancelHref="/dashboard"
      submitText="Create Seekret"
    />
  );
}
