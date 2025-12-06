'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { createSimulation } from '@/app/_actions/create-simulation';
import { generateUniqueId } from '@/utils/generate-unique-id';

export function Heading() {
  const userId = useUser().user?.id as string;
  const router = useRouter();

  async function handleBeginSession() {
    const uniqueId = generateUniqueId();
    await createSimulation({
      id: uniqueId,
      userId,
      thought: '',
      isApproved: false,
    });

    router.push(`/dashboard/simulations/${uniqueId}`);
  }

  return (
    <div className="flex justify-between items-start mt-5">
      <div>
        <p className="text-2xl font-medium">
          Past Simulations
          <span className="text-talgach-green">.</span>
        </p>
        <p className="text-sm">
          Visit past generations and review their outcomes.
        </p>
      </div>

      <button
        type="button"
        className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-3"
        onClick={handleBeginSession}
      >
        Begin New Session
      </button>
    </div>
  );
}
