import Image from 'next/image';
import catalog from '@/public/images/catalog.png';
import circooles from '@/public/images/circooles.png';
import layers from '@/public/images/layers.png';
import quotient from '@/public/images/quotient.png';
import sisyphus from '@/public/images/sisyphus.png';

export function HeroCompanies() {
  return (
    <section className="flex flex-col items-center mt-14">
      <p className="text-xs text-neutral-600">
        Join 100+ companies growing with us.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-x-18 gap-y-6 mt-5 border-b border-neutral-200 pb-8">
        <Image src={layers} alt="Layers logo" className="w-28" />
        <Image src={sisyphus} alt="Sisyphus logo" className="w-28" />
        <Image src={circooles} alt="Circooles logo" className="w-28" />
        <Image src={catalog} alt="Catalog logo" className="w-28" />
        <Image src={quotient} alt="Quotient logo" className="w-28" />
      </div>
    </section>
  );
}
