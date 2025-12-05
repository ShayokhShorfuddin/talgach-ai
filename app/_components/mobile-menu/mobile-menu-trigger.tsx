'use client';

import Image from 'next/image';
import chevron_down from '@/public/svgs/chevron-down.svg';
import { useMobileMenu } from './mobile-menu';

export function MobileMenuTrigger({ children }: { children: React.ReactNode }) {
  const { toggle, isOpen } = useMobileMenu();

  return (
    <button
      type="button"
      onClick={toggle}
      className="w-full flex items-center justify-between hover:cursor-pointer"
      aria-expanded={isOpen}
    >
      {children}
      <Image
        src={chevron_down}
        alt="Chevron Down"
        className={`size-3 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
}
