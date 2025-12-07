'use server';

import { db } from '@/lib/db';

export async function checkIfUserRoleAssigned({
  userId,
}: {
  userId: string;
}): Promise<boolean> {
  const user = await db.query.profile.findFirst({
    where: (profile, { eq }) => eq(profile.id, userId),
  });

  return !!user?.role;
}
