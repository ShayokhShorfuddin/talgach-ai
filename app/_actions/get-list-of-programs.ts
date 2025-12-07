'use server';

import { db } from '@/lib/db';

export async function getListOfPrograms() {
  const programData = await db.query.program.findMany({
    columns: {
      id: true,
      programName: true,
      universityName: true,
      startedApplication: true,
      submittedApplication: true,
      madePayment: true,
      approved: true,
      createdAt: true,
    },
  });

  return programData;
}
