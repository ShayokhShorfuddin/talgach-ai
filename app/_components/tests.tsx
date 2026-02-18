import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories: { id: number; name: string; color: string }[] = [
  {
    id: 1,
    name: 'GRE',
    color: '#86efac',
  },
  {
    id: 2,
    name: 'GMAT',
    color: '#93c5fd',
  },
  {
    id: 3,
    name: 'TOEFL',
    color: '#fcd34d',
  },
  {
    id: 4,
    name: 'IELTS',
    color: '#f9a8d4',
  },
  {
    id: 5,
    name: 'SAT',
    color: '#a5b4fc',
  },
  {
    id: 6,
    name: 'HSK',
    color: '#fca5a5',
  },
  {
    id: 7,
    name: 'JLPT',
    color: '#d8b4fe',
  },
  {
    id: 8,
    name: 'DELE',
    color: '#6ee7b7',
  },
  {
    id: 9,
    name: 'DALF',
    color: '#fdba74',
  },
];

export function Tests() {
  return (
    <section className="flex flex-col sm:items-center sm:text-center mt-30 px-6">
      <small className="text-sm font-medium text-talgach-green">Practice</small>

      <h2 className="text-3xl sm:text-4xl mt-2 font-medium">
        Find the right tests for you
        <span className="text-talgach-green">.</span>
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Powerful, self-serve product and growth analytics to help you excel and
        gain confidence. Trusted by over 4,000 language test takers
      </p>

      <div className="grid gap-x-3 xs:gap-x-10 gap-y-3 xs:gap-y-5 grid-cols-3 grid-rows-3 mt-12">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-center items-center border border-neutral-200 rounded py-1 px-4 hover:border-talgach-green hover:bg-green-50 cursor-pointer transition duration-300"
          >
            <div
              style={{ backgroundColor: category.color }}
              className="size-1.5 mr-2 rounded-full"
            ></div>
            <p className="text-xs font-mono">{category.name}</p>
          </div>
        ))}
      </div>

      <Button
        className={
          'bg-talgach-green rounded text-xs font-medium cursor-pointer mt-8 w-fit'
        }
      >
        <span>See All Tests</span>
        <ArrowRight color="#ffffff" strokeWidth={1.5} />
      </Button>
    </section>
  );
}
