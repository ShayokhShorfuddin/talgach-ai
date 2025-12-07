'use server';

import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function createProfile({
  id,
  firstName,
  lastName,
}: {
  id: string;
  firstName: string;
  lastName: string;
}) {
  const time = new Date();
  await db.insert(profile).values({
    id: id,
    firstName: firstName,
    lastName: lastName,
    role: '',
    gender: '',
    education: '',
    experience: '',
    jobType: '',
    jobLevel: '',
    interests: '',
    skills: '',
    passion: '',

    createdAt: time,
    updatedAt: time,
  });
}
