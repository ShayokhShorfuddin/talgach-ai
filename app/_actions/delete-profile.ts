'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function deleteProfile({ id }: { id: string }) {
  await db.delete(profile).where(eq(profile.id, id));
}
