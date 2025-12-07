'use client';

import '@/app/globals.css';
import { useUser } from '@clerk/nextjs';
import { createContext, useEffect, useState } from 'react';
import { getRoleOfUser } from '../_actions/get-role-of-user';
import { HRSidebar } from './_hr-dashboard/_components/sidebar';
import { JobSeekerSidebar } from './_job-seeker-dashboard/_components/sidebar';
import { OrganizationSidebar } from './_organization-dashboard/_components/sidebar';
import { StudentSidebar } from './_student-dashboard/_components/sidebar';

export const SidebarContext = createContext<{
  expanded: boolean;
  toggle: () => void;
}>({ expanded: true, toggle: () => {} });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [expanded, setExpanded] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const userId = useUser().user?.id as string;

  useEffect(() => {
    async function getUserRole() {
      const userRole = await getRoleOfUser({ id: userId });
      setRole(userRole);
    }

    if (userId) {
      getUserRole();
    }
  }, [userId]);

  return (
    <div
      className="grid grid-cols-[max-content_1fr] h-svh overflow-hidden"
      suppressHydrationWarning
    >
      <SidebarContext.Provider
        value={{ expanded, toggle: () => setExpanded((s) => !s) }}
      >
        {role === 'student' && <StudentSidebar />}
        {role === 'job-seeker' && <JobSeekerSidebar />}
        {role === 'human-resource' && <HRSidebar />}
        {role === 'organization' && <OrganizationSidebar />}
      </SidebarContext.Provider>

      <main className="overflow-y-scroll scroll">{children}</main>
    </div>
  );
}
