'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function updateProfile({
  id,
  updatedData,
}: {
  id: string;
  updatedData: {
    gender: string;
    education: string;
    experience: string;
    jobType: string;
    jobLevel: string;
    interests: string;
    skills: string;
    passion: string;
  };
}): Promise<boolean> {
  try {
    await db.update(profile).set(updatedData).where(eq(profile.id, id));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
