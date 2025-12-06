'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSimulations } from '@/app/_actions/get-simulations';

export function SimulationHistory() {
  const userId = useUser().user?.id as string;
  const router = useRouter();
  const [simulations, setSimulations] = useState<
    Awaited<ReturnType<typeof getSimulations>>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchSimulations = async () => {
      try {
        setIsLoading(true);
        const data = await getSimulations({ userId });
        setSimulations(data);
      } catch (error) {
        console.error('Failed to fetch simulations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimulations();
  }, [userId]);

  if (isLoading) {
    return <p className="mt-20 text-center">Loading…</p>;
  }

  if (simulations.length === 0) {
    return <p className="mt-20 text-center">No simulations found.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {simulations.map((simulation, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <>
          key={index}
          className="relative p-4 border border-neutral-200 hover:border-talgach-green hover:bg-green-50 rounded transition duration-300"
        >
          <div className="flex items-center justify-between gap-x-5">
            <div>
              {simulation.thought === '' ? (
                <p className="italic text-red-500">No response yet</p>
              ) : (
                <p className="italic">
                  {simulation.thought.split(' ').slice(0, 16).join(' ')}…
                </p>
              )}

              <p className="text-xs font-medium mt-2">
                Created at: {new Date(simulation.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              type="button"
              className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
              onClick={() => {
                router.push(`/dashboard/simulations/${simulation.id}`);
              }}
            >
              Review
            </button>
          </div>

          <p
            className={`absolute -top-2 -right-2 rounded-full py-0.5 px-2 text-xs ${simulation.isApproved ? 'text-talgach-green bg-green-100' : 'text-red-500 bg-red-100'}`}
          >
            {simulation.isApproved ? 'Approved' : 'Rejected'}
          </p>
        </div>
      ))}
    </div>
  );
}
