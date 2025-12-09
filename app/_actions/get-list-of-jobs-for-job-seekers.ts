'use server';

import { db } from '@/lib/db';

export async function getListOfJobsForJobSeekers({
  jobSeekerId,
}: {
  jobSeekerId: string;
}) {
  const JobsForJobSeekerData = await db.query.jobSeekerJob.findMany({
    columns: {
      id: true,
      companyName: true,
      position: true,
      responsibilities: true,
      deadline: true,
      skills: true,
      createdAt: true,
    },

    where: (jobs, { eq }) => eq(jobs.jobSeekerId, jobSeekerId),
  });

  return JobsForJobSeekerData;
}
