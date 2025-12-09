'use server';

import { db } from '@/lib/db';
import { simulation } from '@/schemas/simulation-schema';

export async function createSimulation({
  id,
  jobSeekerId,
  thought,
  isApproved,
}: {
  id: string;
  jobSeekerId: string;
  thought: string;
  isApproved: boolean;
}) {
  const time = new Date();

  await db.insert(simulation).values({
    id: id,
    jobSeekerId,
    thought: thought,
    isApproved: isApproved,
    createdAt: time,
    updatedAt: time,
  });
}
