import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { checkIfUserRoleAssigned } from '../_actions/check-if-user-role-assigned';
import { Choice } from './_components/Choice';

export default async function Page() {
  // First, check if the user already has a role or not
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id as string;
  const userHasRole = await checkIfUserRoleAssigned({ userId });

  if (userHasRole) {
    // If the user already has a role, redirect them to the dashboard.
    redirect('/dashboard');
  } else {
    return <Choice userId={userId} />;
  }
}
