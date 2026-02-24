'use client';

import { useRouter } from 'next/navigation';

export function Simulationist() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center border p-4 border-talgach-green bg-green-50 transition duration-300 text-center rounded">
      <div>
        <p className="text-lg font-medium">Simulationist</p>
        <p className="text-xs">Simulate an HR's CV judgment process.</p>
        <button
          type="button"
          onClick={() =>
            router.push('/dashboard/job-seeker/simulations-and-cv-scanner')
          }
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-3"
        >
          Manage Sessions
        </button>
      </div>
    </div>
  );
}
