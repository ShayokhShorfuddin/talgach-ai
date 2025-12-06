'use server';

import { db } from '@/lib/db';
import { simulation } from '@/schemas/simulation-schema';

export async function createSimulation({
  id,
  userId,
  thought,
  isApproved,
}: {
  id: string;
  userId: string;
  thought: string;
  isApproved: boolean;
}) {
  const time = new Date();

  await db.insert(simulation).values({
    id: id,
    userId: userId,
    thought: thought,
    isApproved: isApproved,
    createdAt: time,
    updatedAt: time,
  });
}
