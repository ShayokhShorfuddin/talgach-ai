'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { simulation } from '@/schemas/simulation-schema';

export async function getSimulations({ jobSeekerId }: { jobSeekerId: string }) {
  const simulations = await db.query.simulation.findMany({
    where: eq(simulation.jobSeekerId, jobSeekerId),
    orderBy: (simulation, { desc }) => [desc(simulation.createdAt)],
  });

  return simulations;
}
