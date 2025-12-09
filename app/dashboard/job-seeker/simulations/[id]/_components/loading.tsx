'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import loading from '@/public/svgs/loading.svg';

export function Loading() {
  return (
    <div className="flex items-center mt-4">
      <Image src={loading} alt="Loading..." className="size-4 animate-spin" />
      <LoadingText />
    </div>
  );
}

function LoadingText() {
  const texts = [
    'Thinking...',
    'Checking keywords...',
    'Reviewing points...',
    'Skimming...',
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(Math.floor(Math.random() * texts.length));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return <p className="text-sm ml-2">{texts[index]}</p>;
}
