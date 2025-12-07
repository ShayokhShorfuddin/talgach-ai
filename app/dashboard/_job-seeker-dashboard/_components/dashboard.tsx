import { AICVScoreCard } from './cards/ai-cv-score-card';
import { AppliedJobsCard } from './cards/applied-jobs-card';
import { BookmarkedJobsCard } from './cards/bookmarked-jobs';
import { CVStrengthCard } from './cards/cv-strength-card';
import { InterviewInvitationsCard } from './cards/interview-invitations-card';
import { ProfileCard } from './cards/profile-card';
import { Heading } from './heading';
import { Simulationist } from './simulationist';
import { TakeMockInterview } from './take-mock-interview';

export function JobSeekerDashboard() {
  return (
    <section className="px-5">
      <Heading />

      <div className="grid grid-cols-4 mt-10 gap-4">
        <CVStrengthCard />
        <AICVScoreCard />
        <ProfileCard />
        <AppliedJobsCard />
        <InterviewInvitationsCard />
        <BookmarkedJobsCard />
        <TakeMockInterview />
        <Simulationist />
      </div>
    </section>
  );
}
