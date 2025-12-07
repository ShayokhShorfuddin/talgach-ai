'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListOfPrograms } from '@/app/_actions/get-list-of-programs';
import { SearchBar } from './search-bar';

export default function Programs() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [programsList, setProgramsList] = useState<
    {
      id: string;
      createdAt: Date;
      universityName: string;
      programName: string;
      startedApplication: boolean;
      submittedApplication: boolean;
      madePayment: boolean;
      approved: boolean;
    }[]
  >([]);

  useEffect(() => {
    async function getProgramsList() {
      const programsList = await getListOfPrograms();
      setProgramsList(programsList);
    }
    getProgramsList();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <p className="mt-10 font-medium text-xl">Search Programs</p>
        <p className="text-sm text-neutral-500">Find programs by their name.</p>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {programsList.length === 0 ? (
          <NoPrograms />
        ) : (
          <ProgramsList programs={programsList} searchQuery={searchQuery} />
        )}
      </div>
    </section>
  );
}

function NoPrograms() {
  const router = useRouter();

  return (
    <>
      <p className="mt-10">No programs added yet.</p>

      <button
        type="button"
        onClick={() => {
          router.push('/dashboard/programs/add');
        }}
        className="bg-talgach-green py-1 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-4"
      >
        Add Program
      </button>
    </>
  );
}

function ProgramsList({
  programs,
  searchQuery,
}: {
  programs: {
    id: string;
    createdAt: Date;
    universityName: string;
    programName: string;
    startedApplication: boolean;
    submittedApplication: boolean;
    madePayment: boolean;
    approved: boolean;
  }[];
  searchQuery: string;
}) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {programs
        .filter((program) =>
          program.programName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((program) => (
          <ProgramCard key={program.id} {...program} />
        ))}
    </div>
  );
}

function ProgramCard({
  id,
  createdAt,
  universityName,
  programName,
  startedApplication,
  submittedApplication,
  madePayment,
  approved,
}: {
  id: string;
  createdAt: Date;
  universityName: string;
  programName: string;
  startedApplication: boolean;
  submittedApplication: boolean;
  madePayment: boolean;
  approved: boolean;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      key={id}
      className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer text-left"
      onClick={() => {
        router.push(`/dashboard/programs/${id}`);
      }}
    >
      <p className="font-medium">{programName}</p>
      <p className="text-sm">{universityName}</p>

      <p className="text-xs font-medium mt-2">
        Created at: {createdAt.toLocaleDateString()}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Tag text="Application Started" done={startedApplication} />
        <Tag text="Application Submitted" done={submittedApplication} />
        <Tag text="Payment Made" done={madePayment} />
        <Tag text="Approved" done={approved} />
      </div>
    </button>
  );
}

function Tag({ text, done }: { text: string; done: boolean }) {
  return (
    <div
      className="py-0.5 px-2 rounded-full"
      style={{
        backgroundColor: done ? '#D1FAE5' : '#FEE2E2',
        color: done ? '#065F46' : '#B91C1C',
      }}
    >
      <p className="text-[10px]">{text}</p>
    </div>
  );
}
