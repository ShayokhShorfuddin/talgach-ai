'use client';

import { readStreamableValue } from '@ai-sdk/rsc';
import { useRef, useState } from 'react';
import { simulateHR } from '@/app/_actions/simulate-hr';
import { setProfile } from '@/app/_actions/update-simulation';
import { FileToBytesArray } from '@/utils/file-to-bytes-array';

export function UploadCVButton({
  simulationId,
  isReviewing,
  setIsReviewing,
  setReviewResult,
}: {
  simulationId: string;
  isReviewing: boolean;
  setIsReviewing: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewResult: React.Dispatch<
    React.SetStateAction<{ response: string; isApproved: boolean } | null>
  >;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  async function handleSubmit() {
    setIsReviewing(true);
    let finalResult: { response: string; isApproved: boolean } | null = null;
    try {
      const bytes = await FileToBytesArray(
        fileInputRef.current?.files?.[0] as File,
      );
      const { object } = await simulateHR({ bytes });

      for await (const partialObject of readStreamableValue(object)) {
        if (partialObject) {
          finalResult = partialObject as {
            response: string;
            isApproved: boolean;
          };
          setReviewResult(finalResult);
        }
      }

      // Save the final result after streaming completes
      if (finalResult) {
        await setProfile({
          id: simulationId,
          thought: finalResult.response,
          isApproved: finalResult.isApproved,
        });
      }
    } finally {
      setIsReviewing(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isReviewing}
      >
        Upload CV
      </button>
      {fileName && (
        <p className="text-sm font-mono">
          Uploaded: <span className="font-medium">{fileName}</span>
        </p>
      )}
      {fileName && (
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isReviewing}
        >
          {isReviewing ? 'Simulating...' : 'Begin Simulation'}
        </button>
      )}
    </div>
  );
}
