'use client';

import Image from 'next/image';
import aws from '@/public/images/aws.jpeg';
import pinterest from '@/public/images/pinterest.jpeg';

export function BookmarkedJobsCard() {
  return (
    <div className="border border-neutral-200 p-4 rounded hover:border-talgach-green hover:bg-green-50 transition duration-300">
      <p className="text-sm">Bookmarked Jobs</p>
      <div className="flex items-center">
        <p className="mt-1 text-3xl font-medium text-talgach-green">5</p>

        <div className="flex items-center gap-x-1 ml-3">
          <Image
            className="size-5 rounded-full border border-talgach-green object-cover z-10"
            src={pinterest}
            alt="Pinterest"
          />

          <Image
            className="size-5 rounded-full border border-talgach-green object-cover z-20"
            src={aws}
            alt="AWS"
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
    </div>
  );
}
