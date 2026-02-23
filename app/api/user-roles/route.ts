import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { profile } from '@/schemas/profile-schema';

export async function GET(request: Request) {
  const userID = request.headers.get('user-id');

  if (!userID) {
    return Response.json({ error: 'No user ID provided.' }, { status: 400 });
  }

  const user = await db.query.profile.findFirst({
    where: eq(profile.id, userID),
  });

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json(user.roles);
}
