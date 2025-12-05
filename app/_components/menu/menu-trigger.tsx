'use client';

import { useMenu } from './menu';

export function MenuTrigger({ children }: { children: React.ReactNode }) {
  const { triggerRef } = useMenu();

  return (
    <div ref={triggerRef as React.RefObject<HTMLDivElement>}>{children}</div>
  );
}
