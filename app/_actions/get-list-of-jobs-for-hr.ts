'use server';

import { db } from '@/lib/db';

export async function getListOfJobsForHR() {
  const JobsForHRData = await db.query.hrJob.findMany({
    columns: {
      id: true,
      position: true,
      responsibilities: true,
      deadline: true,
      skills: true,
      createdAt: true,
    },
  });

  return JobsForHRData;
}
