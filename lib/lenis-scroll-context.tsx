'use client';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { createContext, useEffect, useState } from 'react';

const LenisScrollContext = createContext<Lenis | null>(null);

export function LenisScrollContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);
  const [rafState, setRafState] = useState<number | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <It's necessary otherwise we get "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.">
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    setLenisRef(lenis);
    setRafState(requestAnimationFrame(raf));

    return () => {
      if (lenisRef) {
        cancelAnimationFrame(rafState as number);
        lenisRef.destroy();
      }
    };
  }, []);

  return (
    <LenisScrollContext.Provider value={lenisRef}>
      {children}
    </LenisScrollContext.Provider>
  );
}
