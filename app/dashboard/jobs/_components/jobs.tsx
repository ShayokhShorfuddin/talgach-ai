'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListOJobsForHR } from '@/app/_actions/get-list-of-jobs-for-hr';
import { SearchBar } from './search-bar';

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobsForHRList, setJobsForHRList] = useState<
    {
      id: string;
      createdAt: Date;
      position: string;
      deadline: Date;
      skills: {
        name: string;
      }[];
    }[]
  >([]);

  useEffect(() => {
    async function getJobsForHRList() {
      const jobsForHRList = await getListOJobsForHR();
      setJobsForHRList(jobsForHRList);
    }
    getJobsForHRList();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <p className="mt-10 font-medium text-xl">Search Jobs</p>
        <p className="text-sm text-neutral-500">Find jobs by their position.</p>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {jobsForHRList.length === 0 ? (
          <NoJobs />
        ) : (
          <JobsList jobs={jobsForHRList} searchQuery={searchQuery} />
        )}
      </div>
    </section>
  );
}

function NoJobs() {
  const router = useRouter();

  return (
    <>
      <p className="mt-10">No jobs added yet.</p>

      <button
        type="button"
        onClick={() => {
          router.push('/dashboard/jobs/add');
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
    deadline: Date;
    skills: {
      name: string;
    }[];
  }[];
  searchQuery: string;
}) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {jobs
        .filter((job) =>
          job.position.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
    </div>
  );
}

function JobCard({
  id,
  createdAt,
  position,
  deadline,
  skills,
}: {
  id: string;
  createdAt: Date;
  position: string;
  deadline: Date;
  skills: { name: string }[];
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      key={id}
      className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer text-left"
      onClick={() => {
        router.push(`/dashboard/jobs/${id}`);
      }}
    >
      <p className="font-medium">{position}</p>
      <p className="text-sm">{deadline.toLocaleDateString()}</p>

      {/* <div className="flex flex-wrap items-center gap-2 mt-2">
        <Tag text="Application Started" />
        <Tag text="Application Submitted" />
        <Tag text="Payment Made" />
        <Tag text="Approved" />
      </div> */}

      <p className="text-xs font-medium mt-2">
        Created at: {createdAt.toLocaleDateString()}
      </p>
    </button>
  );
}

// function Tag({ text }: { text: string }) {
//   return (
//     <div className="py-0.5 px-2 rounded-full border border-neutral-200">
//       <p className="text-[10px]">{text}</p>
//     </div>
//   );
// }
