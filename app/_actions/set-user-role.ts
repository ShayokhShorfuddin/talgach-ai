'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function setUserRole({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  await db.update(profile).set({ role }).where(eq(profile.id, userId));
}
