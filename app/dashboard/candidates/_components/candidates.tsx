'use client';

import { useState } from 'react';
import { SearchBar } from './search-bar';

export default function Candidates() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [jobsForHRList, setJobsForHRList] = useState<
  //   {
  //     id: string;
  //     createdAt: Date;
  //     position: string;
  //     responsibilities: string;
  //     deadline: Date;
  //     skills: {
  //       name: string;
  //     }[];
  //   }[]
  // >([]);

  // useEffect(() => {
  //   async function getJobsForHRList() {
  //     const jobsForHRList = await getListOJobsForHR();
  //     setJobsForHRList(jobsForHRList);
  //   }
  //   getJobsForHRList();
  // }, []);

  return (
    <section className="px-5">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-10 font-medium text-xl">Search Candidates</p>
        <p className="text-sm text-neutral-500">
          Find candidates by their name.
        </p>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <CandidatesList candidates={candidates} searchQuery={searchQuery} />
      </div>
    </section>
  );
}
function CandidatesList({
  candidates,
  searchQuery,
}: {
  candidates: {
    id: string;
    name: string;
    positionAppliedFor: string;
    experience: number;
    cvScore: number;
    salaryExpectation: number;
    isCalledForInterview: boolean;
    isInterviewTaken: boolean;
    isHired: boolean;
  }[];
  searchQuery: string;
}) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {candidates
        .filter((candidate) =>
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((candidate) => (
          <CandidateCard key={candidate.id} {...candidate} />
        ))}
    </div>
  );
}

function CandidateCard({
  id,
  name,
  positionAppliedFor,
  experience,
  cvScore,
  salaryExpectation,
  isCalledForInterview,
  isInterviewTaken,
  isHired,
}: {
  id: string;
  name: string;
  positionAppliedFor: string;
  experience: number;
  cvScore: number;
  salaryExpectation: number;
  isCalledForInterview: boolean;
  isInterviewTaken: boolean;
  isHired: boolean;
}) {
  return (
    <button
      type="button"
      key={id}
      className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer text-left"
      onClick={() => {
        // router.push(`/dashboard/jobs/${id}`);
      }}
    >
      <p className="font-medium">{name}</p>
      <p className="text-sm">Experience: {experience} years</p>

      <p className="mt-2 text-xs text-talgach-green">Desired Position</p>
      <p className="text-sm">{positionAppliedFor}</p>

      <p className="text-sm mt-2">
        CV Score: <span className="text-talgach-green">{cvScore}%</span>
      </p>

      <p className="text-xs font-medium">
        Salary Expectation: ${salaryExpectation}
      </p>

      <div className="flex items-center gap-x-2 mt-5">
        <Tag
          text={isCalledForInterview ? 'Called for Interview' : 'Not Called'}
        />
        <Tag
          text={isInterviewTaken ? 'Interview Taken' : 'Interview Pending'}
        />
        <Tag text={isHired ? 'Hired' : 'Not Hired'} />
      </div>
    </button>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <div className="py-0.5 px-2 rounded-full border border-neutral-200">
      <p className="text-[10px]">{text}</p>
    </div>
  );
}

const candidates: {
  id: string;
  name: string;
  positionAppliedFor: string;
  experience: number;
  cvScore: number;
  salaryExpectation: number;
  isCalledForInterview: boolean;
  isInterviewTaken: boolean;
  isHired: boolean;
}[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    positionAppliedFor: 'Senior Frontend Developer',
    experience: 5,
    cvScore: 92,
    salaryExpectation: 120000,
    isCalledForInterview: true,
    isInterviewTaken: true,
    isHired: false,
  },
  {
    id: '2',
    name: 'Bob Smith',
    positionAppliedFor: 'UI/UX Designer',
    experience: 3,
    cvScore: 85,
    salaryExpectation: 85000,
    isCalledForInterview: true,
    isInterviewTaken: false,
    isHired: false,
  },
  {
    id: '3',
    name: 'Carol Davis',
    positionAppliedFor: 'Senior Frontend Developer',
    experience: 7,
    cvScore: 95,
    salaryExpectation: 140000,
    isCalledForInterview: true,
    isInterviewTaken: true,
    isHired: true,
  },
  {
    id: '4',
    name: 'David Wilson',
    positionAppliedFor: 'Backend Engineer',
    experience: 4,
    cvScore: 78,
    salaryExpectation: 100000,
    isCalledForInterview: false,
    isInterviewTaken: false,
    isHired: false,
  },
];
