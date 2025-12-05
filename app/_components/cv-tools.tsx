import Image from 'next/image';
import arrow_right_white from '@/public/svgs/arrow-right-white.svg';
import arrows_crossed from '@/public/svgs/arrows-crossed.svg';
import beaker from '@/public/svgs/beaker.svg';
import chart from '@/public/svgs/chart.svg';
import code from '@/public/svgs/code.svg';
import coins from '@/public/svgs/coins.svg';
import delta from '@/public/svgs/delta.svg';
import head from '@/public/svgs/head.svg';
import trending from '@/public/svgs/trending.svg';
import wrench from '@/public/svgs/wrench.svg';

const categories: { id: number; icon: string; name: string }[] = [
  {
    id: 1,
    icon: delta,
    name: 'Templates',
  },
  {
    id: 2,
    icon: code,
    name: 'Keyword Scanner',
  },
  {
    id: 3,
    icon: wrench,
    name: 'CV Builder',
  },
  {
    id: 4,
    icon: chart,
    name: 'Word Analysis',
  },
  {
    id: 5,
    icon: coins,
    name: 'CV Scoring',
  },
  {
    id: 6,
    icon: trending,
    name: 'ATS Optimizer',
  },
  {
    id: 7,
    icon: head,
    name: 'Simulationist',
  },
  {
    id: 8,
    icon: beaker,
    name: 'CV Health',
  },

  {
    id: 9,
    icon: arrows_crossed,
    name: 'A/B Testing',
  },
];

export function CVTools() {
  return (
    <section className="flex flex-col items-center mt-30 text-center">
      <small className="text-sm font-medium text-talgach-green">
        Fine-tune
      </small>

      <h2 className="text-3xl mt-2 font-medium">
        Extensive range of tools to supercharge your CV
        <span className="text-talgach-green">.</span>
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Powerful, self-serve product and growth analytics to help you excel and
        gain confidence. Trusted by over 4,000 job seekers.
      </p>

      <div className="grid gap-5 grid-cols-3 grid-rows-3 mt-12">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center border border-neutral-200 rounded py-2.5 px-5 hover:border-talgach-green hover:bg-green-50 cursor-pointer transition duration-300"
          >
            <Image
              src={category.icon}
              alt={`${category.name} icon`}
              className="size-3 mr-2.5"
            />
            <p className="text-xs font-mono">{category.name}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="flex items-center bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-8"
      >
        <span>See all tools</span>
        <Image
          src={arrow_right_white}
          alt="Arrow right icon"
          className="ml-2 size-2.5"
        />
      </button>
    </section>
  );
}
