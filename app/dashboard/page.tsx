import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { dashboardRoutesForRoles } from '@/shared/dashboard-routes';
import { getRolesOfUser } from '../_actions/get-roles-of-user';

export default async function Page() {
  // First, check if user is authenticated or not
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/signin');
  }

  // Since user is authenticated, we can get their roles now.
  const userId = session.user.id;
  const userRoles = await getRolesOfUser({ id: userId });

  // If there roles array is empty, its a new user, so we can redirect them to role selection page.
  if (userRoles.length === 0) {
    redirect('/role');
  }

  // We will initially redirect a user to a dashboard corresponding to the first role in their roles array.
  redirect(dashboardRoutesForRoles[userRoles[0]]);
}
