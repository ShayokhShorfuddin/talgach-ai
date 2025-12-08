'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { simulation } from '@/schemas/simulation-schema';

export async function getSimulation({
  simulationId,
}: {
  simulationId: string;
}) {
  const result = await db.query.simulation.findFirst({
    where: eq(simulation.id, simulationId),
  });

  return result;
}
