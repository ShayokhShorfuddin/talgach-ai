'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setUserRole } from '@/app/_actions/set-user-role';
import book from '@/public/svgs/book.svg';
import briefcase from '@/public/svgs/briefcase-black.svg';
import building from '@/public/svgs/building-black.svg';
import head from '@/public/svgs/head-black.svg';

export function Choice({ userId }: { userId: string }) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  async function handleRoleSelect(role: string) {
    setSelectedRole(role);

    try {
      await setUserRole({ userId, role });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error selecting role:', error);
    }
  }

  const roles = [
    { id: 'student', label: 'Student', icon: book },
    { id: 'job-seeker', label: 'Job Seeker', icon: briefcase },
    { id: 'human-resource', label: 'Human Resource (HR)', icon: head },
    { id: 'organization', label: 'Organization', icon: building },
  ];

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center w-full max-w-lg">
        <p className="text-2xl text-talgach-green font-medium">
          Welcome to Talgach AI.
        </p>
        <p className="text-sm">Which of the following describes you best?</p>

        <div className="grid grid-cols-2 gap-4 mt-10">
          {roles.map((role) => (
            <button
              type="button"
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="min-h-11 px-6 py-3 rounded border border-neutral-200 hover:border-talgach-green hover:bg-green-50 focus-visible:outline focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation hover:cursor-pointer text-sm flex items-center justify-center gap-2"
              aria-pressed={selectedRole === role.id}
            >
              <Image
                src={role.icon.src}
                alt=""
                className="size-4"
                width={4}
                height={4}
              />
              {role.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
