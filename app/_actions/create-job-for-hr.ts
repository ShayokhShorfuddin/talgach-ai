'use server';

import { db } from '@/lib/db';
import { hrJob } from '@/schemas/hr-job-schema';
import { generateUniqueId } from '@/utils/generate-unique-id';

type Type_CreateJobForHRData = {
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
};

export async function createJobForHR({
  hrId,
  jobData,
}: {
  hrId: string;
  jobData: Type_CreateJobForHRData;
}) {
  const id = generateUniqueId();
  const time = new Date();

  await db.insert(hrJob).values({
    id,
    hrId,
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

    createdAt: time,
    updatedAt: time,
  });
}
