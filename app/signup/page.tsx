import { SignUp } from './_components/SignUp';

export default function Page() {
  return (
    // TODO: If the user is already signed in, redirect to /dashboard
    <main>
      <SignUp />
    </main>
  );
}
