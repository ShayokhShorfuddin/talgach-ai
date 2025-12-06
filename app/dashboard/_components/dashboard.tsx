import { AICVScore } from './cards/ai-cv-scrore';
import { AppliedJobsCard } from './cards/applied-jobs-card';
import { CVStrengthCard } from './cards/cv-strength-card';
import { Heading } from './heading';

export function Dashboard() {
  return (
    <section className="px-5 font-sans">
      <Heading />

      <div className="grid grid-cols-4 mt-10 gap-4">
        <CVStrengthCard />
        <AICVScore />
        <AppliedJobsCard />
      </div>
    </section>
  );
}
