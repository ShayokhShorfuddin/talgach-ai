import { authClient } from '@/lib/auth-client';

export async function Heading() {
  // TODO: We have to think of caching the user information in context or tanstack query. Calling currentUser() or useUser() everywhere feels odd and potentially slow/risky

  // TODO: When there is no internet, our app crashes like this: "[cause]: Error [NeonDbError]: Error connecting to database: TypeError: fetch failed" when trying to fetch session. Find out what to do.

  // TODO: We should show a toast. https://ui.shadcn.com/docs/components/base/sonner
  const firstname = await authClient
    .getSession()
    .then((session) => session?.data?.user.name.split(' ')[0] || 'User');
  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">
          Hello, {firstname}
          <span className="text-talgach-green">.</span>
        </p>
        <p className="text-sm">Let's get you started for today.</p>
      </div>
    </div>
  );
}
