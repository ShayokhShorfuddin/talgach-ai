import { currentUser } from '@clerk/nextjs/server';
import { getProfile } from '@/app/_actions/get-profile';
import { setProfile } from '@/app/_actions/save-profile';
import { InformationForm } from './information-form';

export async function Profile() {
  // Get the id and first name of currently logged in user
  const user = await currentUser();
  const firstname = user?.firstName || 'User';
  const userId = user?.id as string;

  // TODO: ⚠️ This is not the official way of accessing/retrieving profile data and saving on database from Clerk. A sort of Webhook is used for that but we are skipping that for now due to time constraints. Implement that when possible.

  // User not found (ie. they did signed up but our database doesn't have their id yet)
  if (!(await getProfile({ id: userId }))) {
    await setProfile({ id: userId, name: firstname });
  }

  // Get the profile data of the user from Neon
  const profileData = await getProfile({ id: userId });

  return (
    <div className="px-5 mt-5 font-sans">
      <p className="text-2xl font-medium">Profile</p>

      <p className="mt-10">Personal details</p>

      <InformationForm profileData={profileData} userId={userId} />
    </div>
  );
}
