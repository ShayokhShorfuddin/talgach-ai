import { currentUser } from '@clerk/nextjs/server';
import { getRoleOfUser } from '../_actions/get-role-of-user';
import { HRDashboard } from './_hr-dashboard/_components/dashboard';
import { JobSeekerDashboard } from './_job-seeker-dashboard/_components/dashboard';
import { OrganizationDashboard } from './_organization-dashboard/_components/dashboard';
import { StudentDashboard } from './_student-dashboard/_components/dashboard';

export default async function Page() {
  // Since we have 4 types of users (student, job seekers, hr and organizations), we will first need to see the role of the logged in user and then render the appropriate dashboard.

  const userId = await currentUser().then((user) => user?.id as string);

  const userRole: 'student' | 'job-seeker' | 'human-resource' | 'organization' =
    await getRoleOfUser({ id: userId });

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
}
