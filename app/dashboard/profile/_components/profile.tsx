import { headers } from 'next/headers';
import { getProfile } from '@/app/_actions/get-profile';
import { auth } from '@/lib/auth';
import { InformationForm } from './information-form';

export async function Profile() {
  // Get the id of currently logged in user (server-side)
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id as string;

  // Get the profile data of the user from Neon
  const profileData = await getProfile({ id: userId });

  return (
    <div className="px-5 mt-5">
      <p className="text-2xl font-medium">Profile</p>
      <p className="mt-10">Personal details</p>
      <InformationForm profileData={profileData} userId={userId} />
    </div>
  );
}
