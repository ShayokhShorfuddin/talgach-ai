import Image from 'next/image';
import bot from '@/public/svgs/bot.svg';

export function Assistant() {
  return (
    <button
      type="button"
      className="bg-talgach-green p-2 rounded-full fixed bottom-6 right-6 z-200 hover:scale-110 transition-transform duration-200 hover:cursor-pointer"
    >
      <Image src={bot} alt="Assistant Bot" />
    </button>
  );
}
