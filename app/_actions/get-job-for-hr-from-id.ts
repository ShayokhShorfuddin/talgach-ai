'use server';

import { db } from '@/lib/db';

export async function getJobForHRFromId({ id }: { id: string }) {
  const jobData = await db.query.hrJob.findFirst({
    where: (job, { eq }) => eq(job.id, id),
    columns: {
      id: true,
      position: true,
      deadline: true,
      maximumAgeLimit: true,
      experienceRequirement: true,
      skills: true,
      proficiency: true,
      employmentStatus: true,
      otherKnowledge: true,
      responsibilities: true,
      salaryAndBenefits: true,
    },
  });

  return jobData;
}
