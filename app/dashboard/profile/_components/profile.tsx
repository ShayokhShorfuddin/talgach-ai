import { currentUser } from '@clerk/nextjs/server';
import { getProfile } from '@/app/_actions/get-profile';
import { InformationForm } from './information-form';

export async function Profile() {
  // Get the id and first name of currently logged in user
  const user = await currentUser();
  const userId = user?.id as string;

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
