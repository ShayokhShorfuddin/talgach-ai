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

export function StudentDashboard() {
  return (
    <section className="px-5">
      <Heading />

      <div className="grid grid-cols-3 mt-10 gap-4">
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
    </section>
  );
}
