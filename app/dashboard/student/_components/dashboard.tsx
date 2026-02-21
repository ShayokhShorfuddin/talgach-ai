import { headers } from 'next/headers';
import { checkIfUserHasFilledUpProfile } from '@/app/_actions/check-if-user-has-filled-up-profile';
import { auth } from '@/lib/auth';
import { AskToFillUpProfile } from './ask-to-fill-up-profile';
import { AIReadinessScore } from './cards/ai-readiness-score';
import { ApplicationsSubmitted } from './cards/application-submitted';
import { ApprovedApplications } from './cards/approved-applications';
import { BookConsultationCard } from './cards/book-consultation-card';
import { BrowseProgramsCard } from './cards/browse-programs-card';
import { CheckEligibilityCard } from './cards/check-eligibility-card';
import { EligibleProgramsCount } from './cards/eligible-programs-count';
import { PendingApplications } from './cards/pending-applications';
import { TotalProgramsCard } from './cards/total-programs-card';
import { UploadDocumentsCard } from './cards/upload-documents-card';
import { Heading } from './heading';

export async function StudentDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error('Session not found.');
  }

  const userId = session.user.id;

  const hasUserFilledUpProfile = await checkIfUserHasFilledUpProfile({
    userId: userId,
  });

  return (
    <section className="px-5">
      <Heading />

      {hasUserFilledUpProfile ? (
        <>
          <div className="grid grid-cols-3 mt-6 gap-4">
            <TotalProgramsCard />
            <EligibleProgramsCount />
            <ApplicationsSubmitted />
            <PendingApplications />
            <ApprovedApplications />
            <AIReadinessScore />
          </div>

          <p className="mt-14 font-medium text-lg">Quick Actions</p>
          <div className="grid grid-cols-4 mt-2 gap-4">
            <CheckEligibilityCard />
            <BrowseProgramsCard />
            <UploadDocumentsCard />
            <BookConsultationCard />
          </div>
        </>
      ) : (
        <AskToFillUpProfile basePath="/dashboard/student" />
      )}
    </section>
  );
}
