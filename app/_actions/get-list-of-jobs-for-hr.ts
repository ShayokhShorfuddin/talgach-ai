'use server';

import { db } from '@/lib/db';

export async function getListOfJobsForHR({ hrId }: { hrId: string }) {
  const JobsForHRData = await db.query.hrJob.findMany({
    columns: {
      id: true,
      position: true,
      responsibilities: true,
      deadline: true,
      skills: true,
      createdAt: true,
    },

    where: (jobs, { eq }) => eq(jobs.hrId, hrId),
  });

  return JobsForHRData;
}
