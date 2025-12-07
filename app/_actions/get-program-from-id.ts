'use server';

import { db } from '@/lib/db';

export async function getProgramFromId({ id }: { id: string }) {
  const programData = await db.query.program.findFirst({
    where: (program, { eq }) => eq(program.id, id),
    columns: {
      id: true,
      universityName: true,
      programLink: true,
      country: true,
      department: true,
      programName: true,
      semester: true,
      professor: true,
      requirements: true,
      startedApplication: true,
      submittedApplication: true,
      madePayment: true,
      approved: true,
      createdAt: true,
    },
  });

  return programData;
}
