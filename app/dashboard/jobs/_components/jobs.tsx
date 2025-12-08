'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListOfJobsForHR } from '@/app/_actions/get-list-of-jobs-for-hr';
import { getRoleOfUser } from '@/app/_actions/get-role-of-user';
import { authClient } from '@/lib/auth-client';
import { SearchBar } from './search-bar';

export default function Jobs() {
  const userId = authClient.useSession().data?.user.id as string;

  // TODO: At the moment, /job page can be visited by both job seekers and HR, we need to first determine the user type and then fetch data accordingly

  // TODO: We to restructure our routes to be like this -
  // /dashboard/job-seeker/jobs
  // /dashboard/hr/jobs

  // ⚠️ NOT LIKE THIS ANYMORE -
  // /dashboard/jobs (for both job seekers and HRs)

  // TODO: Temporary state to identify user type
  const [isHR, setIsHR] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobsForHRList, setJobsForHRList] = useState<
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
    async function getJobsForHRList() {
      const userRole = await getRoleOfUser({ id: userId });

      if (userRole !== 'human-resource') {
        setIsHR(false);
        return;
      }

      const jobsForHRList = await getListOfJobsForHR();
      setJobsForHRList(jobsForHRList);
    }
    getJobsForHRList();
  }, [userId]);

  return (
    <section className="px-5">
      {isHR ? (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-10 font-medium text-xl">Search Jobs</p>
          <p className="text-sm text-neutral-500">
            Find jobs by their position.
          </p>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {jobsForHRList.length === 0 ? (
            <NoJobs />
          ) : (
            <JobsList jobs={jobsForHRList} searchQuery={searchQuery} />
          )}
        </div>
      ) : (
        <p className="text-center mt-20">🚧 Work in progress.</p>
      )}
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
    responsibilities: string;
    deadline: Date;
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
        router.push(`/dashboard/jobs/${id}`);
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

// function Tag({ text }: { text: string }) {
//   return (
//     <div className="py-0.5 px-2 rounded-full border border-neutral-200">
//       <p className="text-[10px]">{text}</p>
//     </div>
//   );
// }
