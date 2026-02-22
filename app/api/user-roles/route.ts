import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function GET(request: Request) {
  const userID = request.headers.get('user-id');

  if (!userID) {
    return new Response('No user ID provided.');
  }

  const user = await db.query.profile.findFirst({
    where: eq(profile.id, userID),
  });

  if (!user) {
    return new Response('User not found');
  }

  return Response.json(user.roles);
}
