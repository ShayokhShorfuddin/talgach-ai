import { CalledForInterviewCard } from './cards/called-for-interview-card';
import { CheckCandidatesCard } from './cards/check-candidates-card';
import { CreateJobAdCard } from './cards/create-job-ad-card';
import { JobsCreatedCard } from './cards/jobs-created-card';
import { TotalHiredCandidatesCard } from './cards/total-hired-candidates-card';
import { TotalHiredCard } from './cards/total-hired-card';
import { TotalInterviewedCard } from './cards/total-interviewed-card';
import { TotalInterviewedCandidatesCard } from './cards/total-interviewed-card-candidates';
import { TotalShortlistedCandidatesCard } from './cards/total-shortlisted-candidates';
import { Heading } from './heading';

export function HRDashboard() {
  return (
    <section className="px-5">
      <Heading />

      <div className="grid grid-cols-3 mt-10 gap-4">
        <JobsCreatedCard />
        <TotalInterviewedCard />
        <TotalHiredCard />
        <TotalShortlistedCandidatesCard />
        <CalledForInterviewCard />
        <TotalInterviewedCandidatesCard />
        <TotalHiredCandidatesCard />
      </div>

      <p className="mt-14 font-medium text-lg">Quick Actions</p>
      <div className="grid grid-cols-4 mt-2 gap-4">
        <CreateJobAdCard />
        <CheckCandidatesCard />
      </div>
    </section>
  );
}
