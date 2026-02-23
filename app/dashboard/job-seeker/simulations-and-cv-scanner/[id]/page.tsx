'use client';

import { useRef, useState } from 'react';
import { SelectAJob } from './_components/select-a-job';
import { UploadCVButton } from './_components/upload-cv';

export default function Page() {
  // TODO:
  // 1. Let users upload CV
  // 2. Let users choose a job they created

  const [chosenJobId, setChosenJobId] = useState<string | null>(null);
  const CVInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <main>
      <div className="flex flex-col items-center mt-10 gap-2">
        <SelectAJob chosenJobId={chosenJobId} setChosenJobId={setChosenJobId} />

        <UploadCVButton CVInputRef={CVInputRef} />
      </div>
    </main>
  );
}
