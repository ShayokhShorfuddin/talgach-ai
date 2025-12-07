'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { program } from '@/schemas/schema';

export async function updateProgram(
  programData: {
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
    startedApplication: boolean;
    submittedApplication: boolean;
    madePayment: boolean;
    approved: boolean;
  },
  programId: string,
) {
  await db
    .update(program)
    .set({
      universityName: programData.universityName,
      programLink: programData.programLink,
      country: programData.country,
      department: programData.department,
      programName: programData.programName,
      semester: programData.semester,
      professor: programData.professor,
      requirements: programData.requirements,
      startedApplication: programData.startedApplication,
      submittedApplication: programData.submittedApplication,
      madePayment: programData.madePayment,
      approved: programData.approved,
    })
    .where(eq(program.id, programId));
}
