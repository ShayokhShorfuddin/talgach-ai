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

      <main>
        <div className="h-svh py-2 pr-2">
          <div className="h-full border border-neutral-200 rounded-xl overflow-y-scroll">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
