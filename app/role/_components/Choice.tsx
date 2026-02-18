'use client';

import { Book, Briefcase, Building2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setUserRole } from '@/app/_actions/set-user-role';
import { Button } from '@/components/ui/button';

export function Choice({ userId }: { userId: string }) {
  const router = useRouter();

  const [selectedRoles, setSelectedRoles] = useState(
    new Set<Type_UserRole>([]),
  );

  const toggle = (option: Type_UserRole) => {
    setSelectedRoles((previous) => {
      const next = new Set(previous);
      next.has(option) ? next.delete(option) : next.add(option);
      return next;
    });
  };

  const roles: {
    id: 'student' | 'job_seeker' | 'human_resource' | 'organization';
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'student', label: 'Student', icon: <Book /> },
    {
      id: 'job_seeker',
      label: 'Job Seeker',
      icon: <User />,
    },
    {
      id: 'human_resource',
      label: 'Human Resource',
      icon: <Briefcase />,
    },
    {
      id: 'organization',
      label: 'Organization',
      icon: <Building2 />,
    },
  ];

  async function handleRoleSelection() {
    try {
      await setUserRole({
        userId,
        roles: Array.from(selectedRoles),
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error selecting role:', error);
    }
  }

  return (
    <div className="flex justify-center mt-10 px-5">
      <div className="flex flex-col items-center w-full max-w-lg">
        <p className="text-2xl text-talgach-green text-center font-medium">
          Welcome to Talgach AI.
        </p>

        <p className="text-sm text-center mt-1">
          Which of the following describes you best?
        </p>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-10">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant={'outline'}
              className={
                selectedRoles.has(role.id)
                  ? 'rounded py-5 border-talgach-green bg-talgach-green/10 hover:bg-talgach-green/10'
                  : 'rounded py-5 hover:border-talgach-green hover:bg-transparent'
              }
              onClick={() => {
                toggle(role.id);
              }}
            >
              {role.icon}
              {role.label}
            </Button>
          ))}
        </div>

        <Button
          disabled={selectedRoles.size === 0}
          className={'bg-talgach-green rounded mt-10 cursor-pointer text-sm'}
          onClick={handleRoleSelection}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
