export function HeroCTAButtons() {
  return (
    <div className="flex justify-center items-center gap-x-2 mt-8">
      <button
        type="button"
        className="bg-talgach-green py-1.5 px-3 rounded text-sm font-medium text-white hover:cursor-pointer"
      >
        Build My AI CV
      </button>

      <button
        type="button"
        className="border border-talgach-green py-1.5 px-3 rounded text-sm font-medium hover:cursor-pointer"
      >
        Find Jobs
      </button>
    </div>
  );
}
