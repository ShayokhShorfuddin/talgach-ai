'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { hrJob } from '@/schemas/schema';

export async function updateJobForHR(
  jobData: {
    position: string;
    deadline: string;
    maximumAgeLimit: number;
    experienceRequirement: string;
    skills: { name: string }[];
    proficiency: string;
    employmentStatus: 'Full time' | 'Part time';
    otherKnowledge: string;
    responsibilities: string;
    salaryAndBenefits: string;
  },
  jobId: string,
) {
  await db
    .update(hrJob)
    .set({
      position: jobData.position,
      deadline: new Date(jobData.deadline),
      maximumAgeLimit: jobData.maximumAgeLimit,
      experienceRequirement: jobData.experienceRequirement,
      skills: jobData.skills,
      proficiency: jobData.proficiency,
      employmentStatus: jobData.employmentStatus,
      otherKnowledge: jobData.otherKnowledge,
      responsibilities: jobData.responsibilities,
      salaryAndBenefits: jobData.salaryAndBenefits,
    })
    .where(eq(hrJob.id, jobId));
}
