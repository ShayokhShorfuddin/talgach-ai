'use client';

import Image from 'next/image';
import notion from '@/public/images/notion.png';
import vercel from '@/public/images/vercel.png';

export function InterviewInvitationsCard() {
  return (
    <div className="relative border border-neutral-200 p-4 rounded hover:border-talgach-green hover:bg-green-50 transition duration-300">
      <p className="text-sm">Interview Invitations</p>
      <div className="flex items-center">
        <p className="mt-1 text-3xl font-medium text-talgach-green">2</p>

        <div className="flex items-center gap-x-1 ml-3">
          <Image
            className="size-5 rounded-full border border-talgach-green object-cover z-20"
            src={vercel}
            alt="Vercel"
          />

          <Image
            className="size-5 rounded-full border border-talgach-green object-cover z-10"
            src={notion}
            alt="Notion"
          />
        </div>
      </div>
      <div className="flex items-end justify-between mt-1">
        <p className="text-xs">Last updated: N/A</p>

        <button
          type="button"
          className="bg-talgach-green py-0.5 px-2 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
        >
          Refresh
        </button>
      </div>

      <p className="absolute text-[11px] text-red-500 top-2 right-3 border border-red-500 px-1 rounded bg-red-100">
        Deadline soon!
      </p>
    </div>
  );
}
