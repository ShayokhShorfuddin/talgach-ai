import { Chip } from './_components/chip';
import { CorporateTraining } from './_components/corporate-training';
import { CTA } from './_components/cta';
import { Features } from './_components/features';
import { Footer } from './_components/footer';
import { HeroCompanies } from './_components/hero-companies';
import { HeroCTAButtons } from './_components/hero-cta-buttons';
import { HeroImage } from './_components/hero-image';
import HeroText from './_components/hero-text';
import { JobCategories } from './_components/job-categories';
import { JobsFeatured } from './_components/jobs-featured';
import { MiniHeader } from './_components/mini-header';
import { Stats } from './_components/stats';
import { StudyAbroadPrograms } from './_components/study-abroad-programs';
import { Testimonials } from './_components/testimonials';
import { Tests } from './_components/tests';

export default function Page() {
  return (
    <main>
      <MiniHeader />
      <Chip />
      <HeroText />
      <HeroCTAButtons />
      <HeroImage />
      <HeroCompanies />
      <Features />
      <JobCategories />
      <JobsFeatured />
      <StudyAbroadPrograms />
      <Tests />
      <CorporateTraining />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
