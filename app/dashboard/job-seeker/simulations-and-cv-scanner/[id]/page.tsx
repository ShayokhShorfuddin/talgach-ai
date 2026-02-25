'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { simulationSchema } from '@/app/api/simulationist/schema';
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

// TODO: Current markdown handling sucks. Look into the https://github.com/remarkjs/react-markdown docs to make it pretty

export default function Page() {
  const [chosenJobId, setChosenJobId] = useState<string | null>(null);
  const CVInputRef = useRef<HTMLInputElement | null>(null);

  const {
    object,
    submit,
    isLoading: isObjectLoading,
  } = useObject({
    api: '/api/simulationist',
    schema: simulationSchema,
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

    submit({
      prompt:
        'Review the CV and check if the candidate is suitable for the job role. Decide if the candidate should be approved or rejected.',
      jobDetails,
      cvBase64,
    });
  }

  return (
    <main>
      <div className="flex flex-col items-center mt-10 gap-2">
        <SelectAJob
          leadingText="Select a job you created:"
          chosenJobId={chosenJobId}
          setChosenJobId={setChosenJobId}
        />
        <UploadCVButton CVInputRef={CVInputRef} />

        <button
          type="button"
          onClick={handleBeginSimulation}
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!chosenJobId || isObjectLoading || isJobDetailsLoading}
        >
          {isObjectLoading ? 'Generating…' : 'Begin Simulation'}
        </button>

        {isObjectLoading && <Loading />}

        {object?.response && (
          <div className="mt-10 p-8 rounded prose w-full max-w-4xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold mb-0">HR's Thoughts</h3>

              {object.verdict && (
                <p className="text-sm font-medium rounded-full bg-gray-100 px-3 py-1">
                  Verdict:{' '}
                  <span>
                    {object.verdict === 'Approved' ? (
                      <span className="text-green-600">{object.verdict}</span>
                    ) : (
                      <span className="text-red-600">{object.verdict}</span>
                    )}
                  </span>
                </p>
              )}
            </div>

            <Markdown>{object.response}</Markdown>

            {object.cvScore && (
              <div className="flex items-center justify-between mt-10">
                <div>
                  <h3 className="text-lg font-semibold">CV Score</h3>
                  <p className="text-sm mt-1 max-w-sm">
                    The scoring is based on the formatting, content relevance,
                    and overall presentation.
                  </p>
                </div>

                <p className="text-xl font-mono">{object.cvScore}/10</p>
              </div>
            )}
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
  maximumAgeLimit: number;
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
