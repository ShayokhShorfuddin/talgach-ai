'use client';

export function Pricing() {
  return (
    <section className="mt-30 px-10">
      <small className="text-talgach-green text-sm font-medium">
        Students and candidates suite
      </small>

      <p className="text-4xl font-medium max-w-xl mt-2">
        Kickstart your journey with our launchpad options
        <span className="text-talgach-green">.</span>
      </p>

      <div className="flex items-center gap-x-4 mt-4">
        <button
          type="button"
          className="bg-talgach-green py-1 px-1.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
        ></button>

        <button
          type="button"
          className="border border-talgach-green py-1.5 px-3 rounded text-xs font-medium hover:cursor-pointer select-none"
        >
          Find Jobs
        </button>
      </div>
    </section>
  );
}
