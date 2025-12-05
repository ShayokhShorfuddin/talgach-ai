'use client';

import { useMobileMenu } from './mobile-menu';

export function MobileMenuContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useMobileMenu();

  return (
    <section
      className={`ml-2.5 grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden">{children}</div>
    </section>
  );
}
