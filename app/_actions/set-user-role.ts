'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function setUserRole({
  userId,
  roles,
}: {
  userId: string;
  roles: ('student' | 'job_seeker' | 'human_resource' | 'organization')[];
}) {
  await db.update(profile).set({ roles }).where(eq(profile.id, userId));
}
