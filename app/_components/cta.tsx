export function CTA() {
  return (
    <section className="mt-30 bg-talgach-green py-6 px-10">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-medium text-white text-center italic">
          Ready, Set, Ace!
        </p>

        <div className="max-w-sm">
          <p className="text-white text-sm">
            Join thousands of professionals who've transformed their future with
            Talgach's expert training, test preparations, and international
            opportunities.
          </p>

          <button
            type="button"
            className="bg-white py-1.5 px-3 rounded text-xs font-medium text-talgach-green hover:cursor-pointer select-none mt-3"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
