'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CreateJobCard() {
  const router = useRouter();
  return (
    <div className="border border-neutral-200 p-4 rounded hover:border-talgach-green hover:bg-green-50 transition duration-300">
      <p className="font-medium">Create Job</p>

      <p className="text-sm text-neutral-600 mt-2">
        Track and manage your applications efficiently.
      </p>

      <Button
        size={'sm'}
        className="bg-talgach-green rounded text-xs font-medium mt-4 w-full"
        onClick={() => router.push('/dashboard/job-seeker/jobs/add')}
      >
        Create Job
      </Button>
    </div>
  );
}
