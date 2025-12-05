export function HeroCTAButtons() {
  return (
    <div className="flex justify-center items-center gap-x-2 mt-6">
      <button
        type="button"
        className="bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
      >
        Build My AI CV
      </button>

      <button
        type="button"
        className="border border-talgach-green py-1.5 px-3 rounded text-xs font-medium hover:cursor-pointer select-none"
      >
        Test My Skills
      </button>
    </div>
  );
}
