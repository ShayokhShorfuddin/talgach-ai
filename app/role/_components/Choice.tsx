'use client';

import { Book, Briefcase, Building2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setUserRole } from '@/app/_actions/set-user-role';

export function Choice({ userId }: { userId: string }) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<
    'student' | 'job-seeker' | 'human-resource' | 'organization' | null
  >(null);

  async function handleRoleSelect(
    role: 'student' | 'job-seeker' | 'human-resource' | 'organization',
  ) {
    setSelectedRole(role);

    try {
      await setUserRole({ userId, role });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error selecting role:', error);
    }
  }

  const roles: {
    id: 'student' | 'job-seeker' | 'human-resource' | 'organization';
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'student', label: 'Student', icon: <Book size={18} /> },
    {
      id: 'job-seeker',
      label: 'Job Seeker',
      icon: <User size={18} />,
    },
    {
      id: 'human-resource',
      label: 'Human Resource',
      icon: <Briefcase size={18} />,
    },
    {
      id: 'organization',
      label: 'Organization',
      icon: <Building2 size={18} />,
    },
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
              {role.icon}
              {role.label}
            </button>
          ))}
        </div>

        <button type="button" className="mt-10 cursor-pointer">
          Continue
        </button>
      </div>
    </div>
  );
}
