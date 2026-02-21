'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListOfJobsForJobSeekers } from '@/app/_actions/get-list-of-jobs-for-job-seekers';
import { authClient } from '@/lib/auth-client';
import { SearchBar } from './search-bar';

export default function Jobs() {
  const jobSeekerId = authClient.useSession().data?.user.id as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [jobsForJobSeekerList, setJobsForJobSeekerList] = useState<
    {
      id: string;
      createdAt: Date;
      position: string;
      responsibilities: string;
      deadline: Date;
      skills: {
        name: string;
      }[];
    }[]
  >([]);

  useEffect(() => {
    async function getJobsForJobSeekerList() {
      const jobsForJobSeekerList = await getListOfJobsForJobSeekers({
        jobSeekerId,
      });
      setJobsForJobSeekerList(jobsForJobSeekerList);
    }
    getJobsForJobSeekerList();
  }, [jobSeekerId]);

  return (
    <section className="px-5">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-10 font-medium text-xl">Search Jobs</p>
        <p className="text-sm text-neutral-500">Find jobs by their position.</p>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* TODO: Need to add loading state while fetching jobs */}
        {jobsForJobSeekerList.length === 0 ? (
          <NoJobs />
        ) : (
          <JobsList jobs={jobsForJobSeekerList} searchQuery={searchQuery} />
        )}
      </div>
    </section>
  );
}

function NoJobs() {
  const router = useRouter();

  return (
    <>
      <p className="mt-10">No jobs or circular added yet.</p>

      <button
        type="button"
        onClick={() => {
          router.push('/dashboard/job-seeker/jobs/add');
        }}
        className="bg-talgach-green py-1 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-4"
      >
        Add Job
      </button>
    </>
  );
}

function JobsList({
  jobs,
  searchQuery,
}: {
  jobs: {
    id: string;
    createdAt: Date;
    position: string;
    responsibilities: string;
    deadline: Date;
  }[];
  searchQuery: string;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {jobs
          .filter((job) =>
            job.position.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
      </div>

      <button
        type="button"
        onClick={() => {
          router.push('/dashboard/job-seeker/jobs/add');
        }}
        className="bg-talgach-green py-1 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-4"
      >
        Add Job
      </button>
    </div>
  );
}

function JobCard({
  id,
  createdAt,
  position,
  deadline,
  responsibilities,
}: {
  id: string;
  createdAt: Date;
  position: string;
  deadline: Date;
  responsibilities: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      key={id}
      className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer text-left"
      onClick={() => {
        router.push(`/dashboard/job-seeker/jobs/${id}`);
      }}
    >
      <p className="font-medium">{position}</p>
      <p className="text-sm">{deadline.toLocaleDateString()}</p>

      <p className="text-sm text-neutral-700 line-clamp-3 mt-2">
        {responsibilities}
      </p>

      <p className="text-xs font-medium mt-2">
        Created at: {createdAt.toLocaleDateString()}
      </p>
    </button>
  );
}
