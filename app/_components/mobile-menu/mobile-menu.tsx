'use client';

import { createContext, useContext, useState } from 'react';

interface MobileMenuContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('MobileMenu components must be used within a MobileMenu');
  }
  return context;
}

export function MobileMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <MobileMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggle,
      }}
    >
      <div className="flex flex-col">{children}</div>
    </MobileMenuContext.Provider>
  );
}

export default MobileMenu;
