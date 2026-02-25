'use client';

import { useRef, useState } from 'react';
import {
  SelectAJob,
  type Type_LightDetailsOfJobsCreatedByJobSeeker,
} from '../../simulations-and-cv-scanner/[id]/_components/select-a-job';
import { UploadCVButton } from '../../simulations-and-cv-scanner/[id]/_components/upload-cv';

export function CreateNewInterview() {
  const [chosenJobId, setChosenJobId] = useState<string | null>(null);
  const CVInputRef = useRef<HTMLInputElement | null>(null);
  // const router = useRouter();
  // const jobSeekerId = authClient.useSession().data?.user.id;

  // const {
  //   data: lightDetailsOfJobsCreatedByJobSeeker,
  //   isLoading,
  //   error,
  // } = useQuery<Type_LightDetailsOfJobsCreatedByJobSeeker>({
  //   queryKey: ['light-details-of-jobs-created-by-job-seeker', jobSeekerId],
  //   queryFn: () =>
  //     fetchLightDetailsOfJobsCreatedByUser({ jobSeekerId: jobSeekerId! }),
  //   enabled: !!jobSeekerId, // Only run the query if jobSeekerId is available
  //   staleTime: 60 * 60 * 1000, // Cache the data for 1 hour
  // });
  // async function handleBeginNewInterview() {
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
          // onClick={handleBeginNewInterview}
        >
          Begin New Interview
        </button>
      </div>
    </div>
  );
}

const fetchLightDetailsOfJobsCreatedByUser = async ({
  jobSeekerId,
}: {
  jobSeekerId: string;
}): Promise<Type_LightDetailsOfJobsCreatedByJobSeeker> => {
  const response = await fetch('/api/get-jobs-created-by-job-seeker', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'job-seeker-id': jobSeekerId,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs created by user');
  }

  return response.json() as Promise<Type_LightDetailsOfJobsCreatedByJobSeeker>;
};
