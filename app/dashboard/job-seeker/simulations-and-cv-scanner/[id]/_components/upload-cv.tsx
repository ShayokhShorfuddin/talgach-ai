'use client';

import { useState } from 'react';

export function UploadCVButton({
  CVInputRef,
}: {
  CVInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleButtonClick = () => {
    CVInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <input
        ref={CVInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
      />

      <div className="flex items-center gap-2">
        <p>Upload your CV here:</p>

        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload CV
        </button>
      </div>

      {fileName && (
        <p>
          Uploaded: <span className="text-sm font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
}
