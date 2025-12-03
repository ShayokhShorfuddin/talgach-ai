import { Chip } from './_components/chip';
import { HeroCTAButtons } from './_components/hero-cta-buttons';
import HeroText from './_components/hero-text';
import { MiniHeader } from './_components/mini-header';

export default function Page() {
  return (
    <main>
      <MiniHeader />
      <Chip />
      <HeroText />
      <HeroCTAButtons />
    </main>
  );
}
