'use client';

import { useEffect, useState } from 'react';
import { useMenu } from './menu';

export function MenuContent({ children }: { children: React.ReactNode }) {
  const { isOpen, triggerRef, isNested } = useMenu();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function updatePosition() {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();

        if (isNested) {
          // Submenu: position to the right
          setPosition({
            x: rect.right,
            y: rect.top,
          });
        } else {
          // Top-level menu: position below
          setPosition({
            x: rect.left,
            y: rect.bottom,
          });
        }
      }
    }

    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [triggerRef, isNested]);

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible bridge to prevent gap */}
      {isNested ? (
        <div className="absolute h-[200%] w-2 -right-2 top-0" />
      ) : (
        <div className="absolute w-full h-2 -bottom-2" />
      )}
      <div
        className="fixed flex flex-col gap-y-2 bg-white border border-neutral-200 shadow-sm z-20"
        style={{
          top: isNested ? position.y : position.y + 10,
          left: isNested ? position.x + 10 : position.x,
        }}
      >
        {children}
      </div>
    </>
  );
}
