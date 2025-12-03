import Image from 'next/image';
import hero_laptop from '@/public/images/hero-laptop.png';

export function HeroImage() {
  return (
    <Image
      src={hero_laptop}
      alt="Laptop showing analytics of user."
      className="w-full max-w-290 mx-auto mt-14"
    />
  );
}
