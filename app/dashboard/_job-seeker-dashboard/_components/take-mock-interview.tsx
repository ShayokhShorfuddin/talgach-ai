'use client';

export function TakeMockInterview() {
  return (
    <div className="flex justify-center items-center border p-4 border-talgach-green bg-green-50 transition duration-300 text-center rounded">
      <div>
        <p className="text-lg font-medium">Are you ready?</p>
        <button
          type="button"
          className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-1"
        >
          Create Mock Interview
        </button>
      </div>
    </div>
  );
}
