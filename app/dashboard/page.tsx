import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getRoleOfUser } from '../_actions/get-role-of-user';

export default async function Page() {
  // First, check if user is authenticated or not
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/signin');
  }

  // Since user is authenticated, we can get their role now.
  const userId = session?.user.id as string;
  const userRole = await getRoleOfUser({ id: userId });

  // If its null or undefined, its a new user, so we can redirect them to role selection page.

  // TODO: Check if /role is okay or not
  if (!userRole) {
    redirect('/role');
  }

  // If userRole is defined, we can render the appropriate dashboard.

  // TODO: Uncomment these when the new routes are ready.
  // if (userRole === 'job-seeker') {
  //   return <JobSeekerDashboard />;
  // }

  if (userRole === 'student') {
    return redirect('/dashboard/student');
  }

  // if (userRole === 'human-resource') {
  //   return <HRDashboard />;
  // }

  // if (userRole === 'organization') {
  //   return <OrganizationDashboard />;
  // }

  return <p className="text-red-500">Failed to get user role</p>;
}
