import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { checkIfUserHasRole } from '../_actions/check-if-user-has-roles';
import { Choice } from './_components/Choice';

export default async function Page() {
  // First, check if the user already has a role or not
  const session = await auth.api.getSession({ headers: await headers() });

  // If the user is not authenticated, redirect them to the login page.
  if (!session) {
    redirect('/signin');
  }

  const userId = session.user.id;
  const userHasRoles = await checkIfUserHasRole({ userId });

  if (userHasRoles) {
    // If the user already has roles, redirect them to the dashboard.
    redirect('/dashboard');
  } else {
    return <Choice userId={userId} />;
  }
}
