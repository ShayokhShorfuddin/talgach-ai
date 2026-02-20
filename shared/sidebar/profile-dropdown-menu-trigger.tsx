'use client';

import { authClient } from '@/lib/auth-client';

export function ProfileDropdownMenuTrigger() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name.split(' ')[0] || 'User';

  return (
    <div className="flex items-center rounded outline outline-neutral-200 p-1.5 gap-2.5">
      <div className="size-7 bg-talgach-green rounded-full flex items-center justify-center">
        <p className="text-sm font-medium text-white">
          {firstName.charAt(0).toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col items-start">
        <p className="text-sm">{firstName}</p>
        <p className="text-[11px] text-neutral-500">Free tier</p>
      </div>
    </div>
  );
}
