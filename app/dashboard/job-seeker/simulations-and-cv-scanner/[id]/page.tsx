'use client';

import { useCompletion } from '@ai-sdk/react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { Loading } from './_components/loading';
import { SelectAJob } from './_components/select-a-job';
import { UploadCVButton } from './_components/upload-cv';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Page() {
  const [chosenJobId, setChosenJobId] = useState<string | null>(null);
  const CVInputRef = useRef<HTMLInputElement | null>(null);

  const {
    complete,
    completion,
    isLoading: isCompletionLoading,
  } = useCompletion({
    api: '/api/simulationist',
  });

  const { data: jobDetails, isLoading: isJobDetailsLoading } =
    useQuery<Type_JobDetails>({
      queryKey: ['job-details', chosenJobId],
      queryFn: () => fetchJobDetailsUsingID({ jobID: chosenJobId! }),
      enabled: !!chosenJobId,
      staleTime: 30 * 60 * 1000,
    });

  async function handleBeginSimulation() {
    const file = CVInputRef.current?.files?.[0];
    if (!file) {
      alert('Please upload your CV first.');
      return;
    }
    if (!jobDetails) {
      alert('Job details are still loading. Please wait.');
      return;
    }

    const cvBase64 = await fileToBase64(file);

    complete(
      'Review the CV and check if the candidate is suitable for the job role. Decide if the candidate should be approved or rejected.',
      {
        body: {
          jobDetails,
          cvBase64,
        },
      },
    );
  }

  return (
    <main>
      <div className="flex flex-col items-center mt-10 gap-2">
        <SelectAJob chosenJobId={chosenJobId} setChosenJobId={setChosenJobId} />
        <UploadCVButton CVInputRef={CVInputRef} />

        <button
          type="button"
          onClick={handleBeginSimulation}
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!chosenJobId || isCompletionLoading || isJobDetailsLoading}
        >
          {isCompletionLoading ? 'Generating…' : 'Begin Simulation'}
        </button>

        {isCompletionLoading && <Loading />}

        {completion && (
          <div className="mt-10 p-8 rounded prose w-full max-w-4xl">
            <h3 className="text-lg font-semibold mb-2">HR's Thoughts</h3>
            <Markdown>{completion}</Markdown>
          </div>
        )}
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
