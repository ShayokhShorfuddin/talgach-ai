'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AskToFillUpProfile({ basePath }: { basePath: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <p className="text-center">
        Please fill up your profile to access the dashboard.
      </p>

      <Button
        className={
          'bg-talgach-green rounded text-xs font-medium cursor-pointer mt-2'
        }
        onClick={() => {
          router.push(`${basePath}/profile`);
        }}
      >
        <span>Go To Profile</span>
      </Button>
    </div>
  );
}
