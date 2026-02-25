'use server';

import { db } from '@/lib/db';
import { jobSeekerJob } from '@/schemas/schema';
import { generateUniqueId } from '@/utils/generate-unique-id';

type Type_CreateJobForJobSeekerData = {
  companyName: string;
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

export async function createJobForJobSeeker({
  jobSeekerId,
  jobData,
}: {
  jobSeekerId: string;
  jobData: Type_CreateJobForJobSeekerData;
}) {
  const id = generateUniqueId();
  const time = new Date();

  await db.insert(jobSeekerJob).values({
    id,
    jobSeekerId,
    companyName: jobData.companyName,
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
