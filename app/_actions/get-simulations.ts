'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { simulation } from '@/schemas/simulation-schema';

export async function getSimulations({ userId }: { userId: string }) {
  const simulations = await db.query.simulation.findMany({
    where: eq(simulation.userId, userId),
    orderBy: (simulation, { desc }) => [desc(simulation.createdAt)],
  });

  return simulations;
}
