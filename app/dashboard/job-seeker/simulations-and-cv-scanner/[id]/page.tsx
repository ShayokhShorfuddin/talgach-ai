'use client';

import { useCompletion } from '@ai-sdk/react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
// import { FileToBytesArray } from '@/utils/file-to-bytes-array';
import { SelectAJob } from './_components/select-a-job';
import { UploadCVButton } from './_components/upload-cv';

export default function Page() {
  const [chosenJobId, setChosenJobId] = useState<string | null>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const CVInputRef = useRef<HTMLInputElement | null>(null);

  const {
    complete,
    completion,
    isLoading: isCompletionLoading,
  } = useCompletion({
    api: '/api/simulationist',
  });

  const {
    data: jobDetails,
    isLoading,
    error,
  } = useQuery<Type_JobDetails>({
    queryKey: ['job-details', chosenJobId],
    queryFn: () => fetchJobDetailsUsingID({ jobID: chosenJobId! }),
    enabled: !!chosenJobId && simulationStarted,
    staleTime: 30 * 60 * 1000,
  });

  async function handleBeginSimulation() {
    setSimulationStarted(true);

    // Get the bytes of the uploaded CV file
    // const CVBytes = await FileToBytesArray(
    //   CVInputRef.current?.files?.[0] as File,
    // );
  }

  return (
    <main>
      <div className="flex flex-col items-center mt-10 gap-2">
        <SelectAJob chosenJobId={chosenJobId} setChosenJobId={setChosenJobId} />
        <UploadCVButton CVInputRef={CVInputRef} />

        <button
          type="button"
          onClick={() => complete('Are you an LLM? How can you be sure?')}
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isCompletionLoading || !chosenJobId}
        >
          {isCompletionLoading ? 'Generating…' : 'Begin Simulation'}
        </button>

        {/* TODO: Send data to backend AI, process, store and stream back the response */}

        <p className="mt-10">{completion}</p>
      </div>
    </main>
  );
}

export type Type_JobDetails = {
  companyName: string;
  position: string;
  deadline: string;
  ageLimit: number;
  experienceRequirement: string;
  skills: {
    name: string;
  }[];
  proficiency: string;
  employmentStatus: string;
  otherKnowledge: string;
  responsibilities: string;
  salaryAndBenefits: string;
};

const fetchJobDetailsUsingID = async ({
  jobID,
}: {
  jobID: string;
}): Promise<Type_JobDetails> => {
  const response = await fetch('/api/get-job-details-from-id', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'job-id': jobID,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch job details');
  }

  return response.json() as Promise<Type_JobDetails>;
};
