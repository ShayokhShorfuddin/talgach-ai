'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function getRolesOfUser({
  id,
}: {
  id: string;
}): Promise<string[]> {
  const user = await db.query.profile.findFirst({
    where: eq(profile.id, id),
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.roles;
}
