import { currentUser } from '@clerk/nextjs/server';

export async function Profile() {
  const firstname = await currentUser().then(
    (user) => user?.firstName || 'User',
  );

  return (
    <div>
      <p>Profile</p>
      <p>Hello {firstname}</p>

      <p className="mt-10">Personal details</p>

      <InformationForm />
    </div>
  );
}
