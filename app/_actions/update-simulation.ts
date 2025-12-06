'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { simulation } from '@/schemas/simulation-schema';

export async function setProfile({
  id,
  thought,
  isApproved,
}: {
  id: string;
  thought: string;
  isApproved: boolean;
}) {
  const time = new Date();

  await db
    .update(simulation)
    .set({
      thought,
      isApproved,
      updatedAt: time,
    })
    .where(eq(simulation.id, id));
}
