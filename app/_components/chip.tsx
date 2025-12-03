import Image from 'next/image';
import arrow_right from '@/public/arrow-right.svg';

export function Chip() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center p-1.5 mt-16 text-xs text-talgach-green gap-x-2 bg-green-50 rounded-full cursor-pointer">
        <p className="py-1 px-2 border border-green-300 rounded-full font-medium">
          New feature
        </p>
        <p>Launching state-of-the-art models.</p>
        <Image
          src={arrow_right}
          alt="Arrow right icon"
          className="h-2.5 mr-2"
        />
      </div>
    </div>
  );
}
