import { CreateJobAdCard } from './cards/create-job-ad-card';
import { JobsCreatedCard } from './cards/jobs-created-card';
import { TotalHiredCard } from './cards/total-hired-card';
import { TotalInterviewedCard } from './cards/total-interviewed-card';
import { Heading } from './heading';

export function HRDashboard() {
  return (
    <section className="px-5">
      <Heading />

      <div className="grid grid-cols-3 mt-10 gap-4">
        <JobsCreatedCard />
        <TotalInterviewedCard />
        <TotalHiredCard />
      </div>

      <p className="mt-14 font-medium text-lg">Quick Actions</p>
      <div className="grid grid-cols-4 mt-2 gap-4">
        <CreateJobAdCard />
      </div>
    </section>
  );
}
