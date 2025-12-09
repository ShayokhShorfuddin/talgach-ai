'use client';
import Image from 'next/image';
import china from '@/public/svgs/flags/china.svg';
import japan from '@/public/svgs/flags/japan.svg';

export function EligibleProgramsCount() {
  return (
    <div className="border border-neutral-200 p-4 rounded hover:border-talgach-green hover:bg-green-50 transition duration-300">
      <p className="text-sm">Eligible Programs</p>
      <div className="flex items-center">
        <p className="mt-1 text-3xl font-medium text-talgach-green">3</p>

        <div className="flex items-center gap-x-1 ml-3">
          <Image className="size-5 object-cover z-20" src={japan} alt="Japan" />

          <Image className="size-5 object-cover z-10" src={china} alt="China" />

          <div className="size-5 rounded-full border border-talgach-green bg-neutral-50 z-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-gray-600">+1</span>
          </div>
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
