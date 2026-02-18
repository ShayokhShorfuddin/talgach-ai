import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { checkIfUserRoleAssigned } from '../_actions/check-if-user-role-assigned';
import { Choice } from './_components/Choice';

export default async function Page() {
  // TODO: A non-user might directly access "/role" page. Check if user exists/authenticated before calling server action.

  // First, check if the user already has a role or not
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id as string;
  const userHasRole = await checkIfUserRoleAssigned({ userId });

  // TODO: Let users choose one or more roles.

  if (userHasRole) {
    // If the user already has a role, redirect them to the dashboard.
    redirect('/dashboard');
  } else {
    return <Choice userId={userId} />;
  }
}
