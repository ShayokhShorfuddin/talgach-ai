import { Assistant } from './_components/assistant';
import { Chip } from './_components/chip';
import { CorporateTraining } from './_components/corporate-training';
import { CTA } from './_components/cta';
import { CVTools } from './_components/cv-tools';
import { Features } from './_components/features';
import { Footer } from './_components/footer';
import { HeroCompanies } from './_components/hero-companies';
import { HeroCTAButtons } from './_components/hero-cta-buttons';
import { HeroImage } from './_components/hero-image';
import HeroText from './_components/hero-text';
import { JobTracker } from './_components/job-tracker';
import { MiniHeader } from './_components/mini-header';
import { Pricing } from './_components/pricing';
import { Stats } from './_components/stats';
import { StudyAbroadPrograms } from './_components/study-abroad-programs';
import { Testimonials } from './_components/testimonials';
import { Tests } from './_components/tests';

export default function Page() {
  return (
    <main>
      <MiniHeader />
      <Assistant />
      <Chip />
      <HeroText />
      <HeroCTAButtons />
      <HeroImage />
      <HeroCompanies />
      <Features />
      <CVTools />
      <JobTracker />
      <StudyAbroadPrograms />
      <Tests />
      <CorporateTraining />
      <Stats />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
