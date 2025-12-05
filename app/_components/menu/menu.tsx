'use client';

import { createContext, useContext, useRef, useState } from 'react';

interface MenuContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  closeTimeoutRef: React.RefObject<NodeJS.Timeout | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  isNested: boolean;
}

const MenuContext = createContext<MenuContextType | null>(null);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu');
  }
  return context;
}

export function Menu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const parentMenu = useContext(MenuContext);
  const isNested = parentMenu !== null;

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        triggerRef,
        closeTimeoutRef,
        handleMouseEnter,
        handleMouseLeave,
        isNested,
      }}
    >
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <> */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
}
