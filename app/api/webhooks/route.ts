import { verifyWebhook } from '@clerk/nextjs/webhooks';
import type { NextRequest } from 'next/server';
import { createProfile } from '@/app/_actions/create-profile';
import { deleteProfile } from '@/app/_actions/delete-profile';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const userId = evt.data.id as string;

    // If it's a new user created event
    if (evt.type === 'user.created') {
      console.log(`New user created with ID: ${userId}`);

      const firstName = evt.data.first_name as string;
      const lastName = evt.data.last_name as string;

      // Save to Neon
      await createProfile({ id: userId, firstName, lastName });
    }

    // If it's a user deleted event
    if (evt.type === 'user.deleted') {
      console.log(`User deleted with ID: ${userId}`);

      // Remove from Neon
      await deleteProfile({ id: userId });
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
