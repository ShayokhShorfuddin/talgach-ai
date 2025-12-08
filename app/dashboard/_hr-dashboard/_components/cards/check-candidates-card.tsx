'use client';

export function CheckCandidatesCard() {
  return (
    <div className="border border-neutral-200 p-4 rounded hover:border-talgach-green hover:bg-green-50 transition duration-300">
      <p className="font-medium">Check candidates</p>

      <p className="text-sm text-neutral-600 mt-2">
        Review and manage candidate applications for your job postings.
      </p>

      <button
        type="button"
        className="bg-talgach-green py-1 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-4 w-full"
      >
        Browse
      </button>
    </div>
  );
}
