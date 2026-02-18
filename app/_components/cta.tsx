import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="mt-30 bg-talgach-green py-6 px-6 md:px-10">
      <div className="flex items-center justify-between gap-x-5">
        <p className="hidden sm:block text-3xl font-medium text-white text-center italic">
          Ready, Set, Ace!
        </p>

        <div className="max-w-sm">
          <p className="text-white text-sm">
            Join thousands of professionals who've transformed their future with
            Talgach's expert training, test preparations, and international
            opportunities.
          </p>

          <Button
            className={
              'bg-white rounded text-xs font-medium text-talgach-green cursor-pointer mt-3'
            }
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
