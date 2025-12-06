'use client';

export function AICVScoreCard() {
  return (
    <div className="border border-neutral-200 p-4 rounded hover:border-talgach-green hover:bg-green-50 transition duration-300">
      <p className="text-sm">AI CV Score</p>
      <p className="mt-1 text-3xl font-medium text-talgach-green">
        83<span className="text-xl font-medium">/100</span>
      </p>

      <div className="flex items-end justify-between mt-1">
        <p className="text-xs">Last updated: N/A</p>

        <button
          type="button"
          className="bg-talgach-green py-0.5 px-2 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
        >
          Compute AI Score
        </button>
      </div>
    </div>
  );
}
