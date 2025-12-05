'use client';

import { useEffect, useState } from 'react';
import { useMenu } from './menu';

export function MenuContent({ children }: { children: React.ReactNode }) {
  const { isOpen, triggerRef, isNested } = useMenu();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function updatePosition() {
      if (triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();

        // Find the nearest positioned ancestor (the relative wrapper)
        const offsetParent = triggerRef.current.offsetParent as HTMLElement;
        const parentRect = offsetParent?.getBoundingClientRect() || {
          left: 0,
          top: 0,
        };

        if (isNested) {
          // Submenu: position to the right
          setPosition({
            x: triggerRect.right - parentRect.left,
            y: triggerRect.top - parentRect.top,
          });
        } else {
          // Top-level menu: position below
          setPosition({
            x: triggerRect.left - parentRect.left,
            y: triggerRect.bottom - parentRect.top,
          });
        }
      }
    }

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
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
        className="absolute text-nowrap flex flex-col gap-y-2 bg-white border border-neutral-200 shadow-sm z-20 rounded"
        style={{
          top: position.y,
          left: position.x,
        }}
      >
        {children}
      </div>
    </>
  );
}
