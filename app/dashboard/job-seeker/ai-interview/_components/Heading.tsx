'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { generateUniqueId } from '@/utils/generate-unique-id';

export function Heading() {
  const router = useRouter();
  const jobSeekerId = authClient.useSession().data?.user.id;

  async function handleBeginNewInterviewSession() {
    const uniqueId = generateUniqueId();

    // await createSimulation({
    //   id: uniqueId,
    //   jobSeekerId,
    //   thought: '',
    //   isApproved: false,
    // });

    router.push(`/dashboard/job-seeker/ai-interview/${uniqueId}`);
  }

  return (
    <div className="flex justify-between items-start mt-5">
      <div>
        <p className="text-2xl font-medium">
          Past Interviews
          <span className="text-talgach-green">.</span>
        </p>
        <p className="text-sm">
          Visit past interviews and review their outcomes.
        </p>
      </div>

      <button
        type="button"
        className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-3"
        onClick={handleBeginNewInterviewSession}
      >
        Begin New Interview
      </button>
    </div>
  );
}
