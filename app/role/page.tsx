import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { checkIfUserRoleAssigned } from '../_actions/check-if-user-role-assigned';
import { Choice } from './_components/Choice';

export default async function Page() {
  // First, check if the user already has a role or not
  const userId = await currentUser().then((user) => user?.id as string);
  const userHasRole = await checkIfUserRoleAssigned({ userId });

  if (userHasRole) {
    // If the user already has a role, redirect them to the dashboard.
    redirect('/dashboard');
  } else {
    return <Choice userId={userId} />;
  }
}
