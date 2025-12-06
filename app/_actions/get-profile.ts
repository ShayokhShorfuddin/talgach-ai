'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function getProfile({ id }: { id: string }) {
  const targetUser = await db
    .select({
      name: profile.name,
      gender: profile.gender,
      education: profile.education,
      experience: profile.experience,
      jobType: profile.jobType,
      jobLevel: profile.jobLevel,
      interests: profile.interests,
      skills: profile.skills,
      passion: profile.passion,
    })
    .from(profile)
    .where(eq(profile.id, id))
    .limit(1);

  return targetUser[0];
}
