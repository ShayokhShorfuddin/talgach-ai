import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function Heading() {
  // TODO: We have think of caching the user information in context or tanstack query. Calling currentUser() or useUser() everywhere feels odd and potentially slow/risky
  const session = await auth.api.getSession({ headers: await headers() });
  const firstName = session?.user?.name?.split(' ')[0] || 'User';

  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">
          Hello, {firstName}
          <span className="text-talgach-green">.</span>
        </p>
        <p className="text-sm">Let's get you started for today.</p>
      </div>
    </div>
  );
}
