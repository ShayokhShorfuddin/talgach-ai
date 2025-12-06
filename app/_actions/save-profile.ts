'use server';

import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function setProfile({ id, name }: { id: string; name: string }) {
  const time = new Date();
  await db.insert(profile).values({
    id: id,
    name: name,
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
