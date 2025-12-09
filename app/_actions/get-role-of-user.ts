'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function getRoleOfUser({
  id,
}: {
  id: string;
}): Promise<string | null | undefined> {
  const user = await db.query.profile.findFirst({
    where: eq(profile.id, id),
  });

  return user?.role;
}
