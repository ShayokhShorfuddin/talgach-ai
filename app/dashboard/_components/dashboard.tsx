import { AICVScoreCard } from './cards/ai-cv-score-card';
import { AppliedJobsCard } from './cards/applied-jobs-card';
import { BookmarkedJobsCard } from './cards/bookmarked-jobs';
import { CVStrengthCard } from './cards/cv-strength-card';
import { InterviewInvitationsCard } from './cards/interview-invitations-card';
import { Heading } from './heading';

export function Dashboard() {
  return (
    <section className="px-5 font-sans">
      <Heading />

      <div className="grid grid-cols-4 mt-10 gap-4">
        <CVStrengthCard />
        <AICVScoreCard />
        <AppliedJobsCard />
        <InterviewInvitationsCard />
        <BookmarkedJobsCard />
      </div>
    </section>
  );
}
