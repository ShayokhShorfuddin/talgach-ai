import {
  ArrowRight,
  ClipboardPen,
  Code,
  FlaskConical,
  LucideChartNoAxesColumn,
  Option,
  TrendingUp,
  Triangle,
  User,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories: { id: number; icon: React.ReactNode; name: string }[] = [
  {
    id: 1,
    icon: <Triangle color="#0a8a55" className="size-3" />,
    name: 'Templates',
  },
  {
    id: 2,
    icon: <Code color="#0a8a55" className="size-3" />,
    name: 'Keyword Scanner',
  },
  {
    id: 3,
    icon: <Wrench color="#0a8a55" className="size-3" />,
    name: 'CV Builder',
  },
  {
    id: 4,
    icon: <LucideChartNoAxesColumn color="#0a8a55" className="size-3" />,
    name: 'Word Analysis',
  },
  {
    id: 5,
    icon: <ClipboardPen color="#0a8a55" className="size-3" />,
    name: 'CV Scoring',
  },
  {
    id: 6,
    icon: <TrendingUp color="#0a8a55" className="size-3" />,
    name: 'ATS Optimizer',
  },
  {
    id: 7,
    icon: <User color="#0a8a55" className="size-3" />,
    name: 'Simulationist',
  },
  {
    id: 8,
    icon: <FlaskConical color="#0a8a55" className="size-3" />,
    name: 'CV Health',
  },

  {
    id: 9,
    icon: <Option color="#0a8a55" className="size-3" />,
    name: 'A/B Testing',
  },
];

export function CVTools() {
  return (
    <section className="flex flex-col sm:items-center sm:text-center mt-30 px-6">
      <small className="text-sm font-medium text-talgach-green">
        Fine-tune
      </small>

      <h2 className="text-3xl sm:text-4xl mt-2 font-medium">
        Cutting-edge tools to sharpen your CV
        <span className="text-talgach-green">.</span>
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Powerful, self-serve product and growth analytics to help you excel and
        gain confidence. Trusted by over 4,000 job seekers.
      </p>

      <div className="grid gap-5 grid-cols-2 grid-rows-3 mt-12 sm:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-center gap-x-2 items-center border border-neutral-200 rounded py-2 px-2 hover:border-talgach-green hover:bg-green-50 cursor-pointer transition duration-300"
          >
            {category.icon}
            <p className="text-xs font-mono">{category.name}</p>
          </div>
        ))}
      </div>

      <Button
        className={
          'bg-talgach-green rounded text-xs font-medium cursor-pointer mt-8 w-fit'
        }
      >
        <span>See All Tools</span>
        <ArrowRight color="#ffffff" strokeWidth={1.5} />
      </Button>
    </section>
  );
}
