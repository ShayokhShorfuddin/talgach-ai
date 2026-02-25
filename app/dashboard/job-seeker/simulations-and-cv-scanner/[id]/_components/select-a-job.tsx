'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { authClient } from '@/lib/auth-client';

export type Type_LightDetailsOfJobsCreatedByJobSeeker = {
  id: string;
  position: string;
  companyName: string;
  createdAt: string;
}[];

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

export function SelectAJob({
  leadingText,
  chosenJobId,
  setChosenJobId,
}: {
  leadingText: string;
  chosenJobId: string | null;
  setChosenJobId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const jobSeekerId = session?.user?.id;

  const {
    data: lightDetailsOfJobsCreatedByJobSeeker,
    isLoading,
    error,
  } = useQuery<Type_LightDetailsOfJobsCreatedByJobSeeker>({
    queryKey: ['light-details-of-jobs-created-by-job-seeker', jobSeekerId],
    queryFn: () =>
      fetchLightDetailsOfJobsCreatedByUser({ jobSeekerId: jobSeekerId! }),
    enabled: !!jobSeekerId, // Only run the query if jobSeekerId is available
    staleTime: 60 * 60 * 1000, // Cache the data for 1 hour
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading jobs.</p>;
  }

  if (!lightDetailsOfJobsCreatedByJobSeeker) {
    return <p>No jobs found.</p>;
  }

  return (
    <div className="flex items-center gap-2">
      <p>{leadingText}</p>
      <Select onValueChange={(value: string | null) => setChosenJobId(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a job">
            {chosenJobId
              ? lightDetailsOfJobsCreatedByJobSeeker.find(
                  (j) => j.id === chosenJobId,
                )?.position
              : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false} className={'w-fit'}>
          <SelectGroup>
            {lightDetailsOfJobsCreatedByJobSeeker.length === 0
              ? handleNoJobCreatedYet({ router })
              : lightDetailsOfJobsCreatedByJobSeeker.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    <SelectItemForJob job={job} />
                  </SelectItem>
                ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function SelectItemForJob({
  job,
}: {
  job: Type_LightDetailsOfJobsCreatedByJobSeeker[number];
}) {
  return (
    <div>
      <p className="font-medium">{job.position}</p>
      <p className="text-xs text-neutral-900 mt-1">
        Company: {job.companyName}
      </p>
      <p className="text-xs text-neutral-900">
        Created at: {new Date(job.createdAt).toLocaleDateString()}
      </p>

      <p className="text-xs text-neutral-900 mt-1">
        Job ID: {job.id.slice(0, 6)}…{job.id.slice(-4)}
      </p>
    </div>
  );
}

function handleNoJobCreatedYet({
  router,
}: {
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <div className="text-center p-2">
      <p className="text-sm">You haven't created any jobs yet.</p>

      <button
        type="button"
        onClick={() => router.push('/dashboard/job-seeker/jobs/add')}
        className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white cursor-pointer mt-1 w-full"
      >
        Create a job.
      </button>
    </div>
  );
}
