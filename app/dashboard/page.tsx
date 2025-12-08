import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getRoleOfUser } from '../_actions/get-role-of-user';
import { HRDashboard } from './_hr-dashboard/_components/dashboard';
import { JobSeekerDashboard } from './_job-seeker-dashboard/_components/dashboard';
import { OrganizationDashboard } from './_organization-dashboard/_components/dashboard';
import { StudentDashboard } from './_student-dashboard/_components/dashboard';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Since we have 4 types of users (student, job seekers, hr and organizations), we will first need to see the role of the logged in user and then render the appropriate dashboard.

  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id as string;

  const userRole: 'student' | 'job-seeker' | 'human-resource' | 'organization' =
    await getRoleOfUser({ id: userId });

    console.log(userRole);

  if (userRole === 'job-seeker') {
    return <JobSeekerDashboard />;
  }

  if (userRole === 'student') {
    return <StudentDashboard />;
  }

  if (userRole === 'human-resource') {
    return <HRDashboard />;
  }

  if (userRole === 'organization') {
    return <OrganizationDashboard />;
  }

  return <p>Failed to get user role</p>
}
