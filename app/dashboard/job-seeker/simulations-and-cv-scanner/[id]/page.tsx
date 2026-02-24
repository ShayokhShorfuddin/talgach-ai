'use client';

import { useRef, useState } from 'react';
import { SelectAJob } from './_components/select-a-job';
import { UploadCVButton } from './_components/upload-cv';

export default function Page() {
  const [chosenJobId, setChosenJobId] = useState<string | null>(null);
  const CVInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <main>
      <div className="flex flex-col items-center mt-10 gap-2">
        <SelectAJob chosenJobId={chosenJobId} setChosenJobId={setChosenJobId} />
        <UploadCVButton CVInputRef={CVInputRef} />

        {/* TODO: Send data to backend AI, process, store and stream back the response */}
      </div>
    </main>
  );
}
