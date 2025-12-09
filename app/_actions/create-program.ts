'use server';

import { db } from '@/lib/db';
import { program } from '@/schemas/program-schema';
import { generateUniqueId } from '@/utils/generate-unique-id';

type Type_CreateProgramData = {
  universityName: string;
  programLink?: string;
  country: string;
  department: string;
  programName: string;
  semester: string;
  professor: {
    name: string;
    email: string;
    emailed: boolean;
  };
  requirements: {
    languageTests: {
      name: string;
      score: string;
      fulfilled: boolean;
    }[];
    degrees: {
      name: string;
      cgpa: string;
      fulfilled: boolean;
    }[];
    recommendation: {
      count: number;
      fulfilled: boolean;
    };
    payment: {
      required: boolean;
      amount: string;
      fulfilled: boolean;
    };
    sop: {
      required: boolean;
      ready: boolean;
      fulfilled: boolean;
    };
    miscellaneous: {
      text: string;
      fulfilled: boolean;
    };
  };
};

export async function createProgram({
  studentId,
  programData,
}: {
  studentId: string;
  programData: Type_CreateProgramData;
}) {
  const id = generateUniqueId();
  const time = new Date();

  await db.insert(program).values({
    id,
    studentId,
    universityName: programData.universityName,
    programLink: programData.programLink || '',
    country: programData.country,
    department: programData.department,
    programName: programData.programName,
    semester: programData.semester,
    professor: programData.professor,
    requirements: programData.requirements,

    createdAt: time,
    updatedAt: time,
  });
}
