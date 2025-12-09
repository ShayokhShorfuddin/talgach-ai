'use client';

export function CheckEligibilityCard() {
  return (
    <div className="border border-neutral-200 p-4 rounded hover:border-talgach-green hover:bg-green-50 transition duration-300">
      <p className="font-medium">Eligibility Analysis</p>

      <p className="text-sm text-neutral-600 mt-2">
        Check your eligibility for various programs and opportunities.
      </p>

      <button
        type="button"
        className="bg-talgach-green py-1 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-4 w-full"
      >
        Check Eligibility
      </button>
    </div>
  );
}
