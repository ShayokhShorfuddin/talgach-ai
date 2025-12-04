import { Chip } from './_components/chip';
import { Features } from './_components/features';
import { HeroCompanies } from './_components/hero-companies';
import { HeroCTAButtons } from './_components/hero-cta-buttons';
import { HeroImage } from './_components/hero-image';
import HeroText from './_components/hero-text';
import { JobCategories } from './_components/job-categories';
import { JobsFeatured } from './_components/jobs-featured';
import { MiniHeader } from './_components/mini-header';

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
    </main>
  );
}
