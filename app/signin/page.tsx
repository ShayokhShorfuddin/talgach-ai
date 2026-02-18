import { SignIn } from './_components/SignIn';

export default function Page() {
  return (
    // TODO: If the user is already signed in, redirect to /dashboard
    <main>
      <SignIn />
    </main>
  );
}
