'use client';

import { createContext, useState } from 'react';
import { OrganizationSidebar } from './_components/sidebar';

export const SidebarContext = createContext<{
  expanded: boolean;
  toggle: () => void;
}>({ expanded: true, toggle: () => {} });

export default function OrganizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider
      value={{ expanded, toggle: () => setExpanded((s) => !s) }}
    >
      <div
        className="grid grid-cols-[max-content_1fr] h-svh overflow-hidden"
        suppressHydrationWarning
      >
        <OrganizationSidebar />
        <main className="overflow-y-scroll scroll">{children}</main>
      </div>
    </SidebarContext.Provider>
  );
}
