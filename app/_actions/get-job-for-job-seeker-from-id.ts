'use server';

import { db } from '@/lib/db';

export async function getJobForJobSeekerFromId({ id }: { id: string }) {
  const jobData = await db.query.jobSeekerJob.findFirst({
    where: (job, { eq }) => eq(job.id, id),
    columns: {
      id: true,
      companyName: true,
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
