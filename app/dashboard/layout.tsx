'use client';

import '@/app/globals.css';
import { createContext, useState } from 'react';
import Sidebar from './_components/sidebar';

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

  return (
    <div
      className="grid grid-cols-[max-content_1fr] h-svh overflow-hidden"
      suppressHydrationWarning
    >
      <SidebarContext.Provider
        value={{ expanded, toggle: () => setExpanded((s) => !s) }}
      >
        <Sidebar />
      </SidebarContext.Provider>

      <main className="overflow-y-scroll scroll">{children}</main>
    </div>
  );
}
