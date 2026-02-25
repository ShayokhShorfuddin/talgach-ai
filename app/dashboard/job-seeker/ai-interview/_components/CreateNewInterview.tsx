'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SelectAJob } from '../../simulations-and-cv-scanner/[id]/_components/select-a-job';
import { UploadCVButton } from '../../simulations-and-cv-scanner/[id]/_components/upload-cv';

export function CreateNewInterview() {
  const [chosenJobId, setChosenJobId] = useState<string | null>(null);
  const CVInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function handleBeginNewInterview() {
    // TODO: We are simply redirecting now. We will need object storage to proceed
    router.push('/dashboard/job-seeker/ai-interview/123');
  }
  //   const uniqueId = generateUniqueId();

  //   // await createSimulation({
  //   //   id: uniqueId,
  //   //   jobSeekerId,
  //   //   thought: '',
  //   //   isApproved: false,
  //   // });

  //   router.push(`/dashboard/job-seeker/ai-interview/${uniqueId}`);
  // }

  return (
    <div className="flex justify-between items-start mt-5">
      <div>
        <p className="text-2xl font-medium">
          AI Interviews
          <span className="text-talgach-green">.</span>
        </p>
        <p className="text-sm">Practice with AI-powered mock interviews.</p>
      </div>

      <div className="flex flex-col gap-2">
        <SelectAJob
          leadingText="Choose a job:"
          chosenJobId={chosenJobId}
          setChosenJobId={setChosenJobId}
        />

        <UploadCVButton CVInputRef={CVInputRef} />

        <button
          type="button"
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
          onClick={handleBeginNewInterview}
        >
          Begin New Interview
        </button>
      </div>
    </div>
  );
}
