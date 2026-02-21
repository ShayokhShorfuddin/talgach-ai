'use server';

import { db } from '@/lib/db';

export async function checkIfUserHasFilledUpProfile({
  userId,
}: {
  userId: string;
}): Promise<boolean> {
  const user = await db.query.profile.findFirst({
    where: (profile, { eq }) => eq(profile.id, userId),
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.hasFilledUpProfile;
}
