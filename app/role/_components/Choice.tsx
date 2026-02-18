'use client';

import { Book, Briefcase, Building2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Choice({ userId }: { userId: string }) {
  const router = useRouter();
  type role = 'student' | 'job_seeker' | 'human_resource' | 'organization';

  const [selectedRoles, setSelectedRoles] = useState(new Set<role>([]));

  const toggle = (option: role) => {
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
    { id: 'student', label: 'Student', icon: <Book size={18} /> },
    {
      id: 'job_seeker',
      label: 'Job Seeker',
      icon: <User size={18} />,
    },
    {
      id: 'human_resource',
      label: 'Human Resource',
      icon: <Briefcase size={18} />,
    },
    {
      id: 'organization',
      label: 'Organization',
      icon: <Building2 size={18} />,
    },
  ];

  // TODO: Nice! We can now select multiple roles. Next, we can send the selected roles to the server and update the user's profile accordingly.

  // async function handleRoleSelect(
  //   role: 'student' | 'job_seeker' | 'human_resource' | 'organization',
  // ) {
  //   setSelectedRole(role);

  //   try {
  //     await setUserRole({ userId, role });
  //     router.push('/dashboard');
  //   } catch (error) {
  //     console.error('Error selecting role:', error);
  //   }
  // }

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center w-full max-w-lg">
        <p className="text-2xl text-talgach-green font-medium">
          Welcome to Talgach AI.
        </p>
        <p className="text-sm">Which of the following describes you best?</p>

        <div className="grid grid-cols-2 gap-4 mt-10">
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
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
