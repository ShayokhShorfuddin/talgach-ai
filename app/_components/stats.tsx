import Image from 'next/image';
import whiteboard from '@/public/images/whiteboard.png';

const stats = [
  {
    id: 1,
    value: '4,000+',
    description: 'Students',
    subtitle: "We've helped thousands of students all over the world.",
  },
  {
    id: 2,
    value: '95%',
    description: 'Satisfaction Rate',
    subtitle: 'We make sure our users are satisfied and smiling.',
  },
  {
    id: 3,
    value: '4.6/5',
    description: 'Rating on Trustpilot',
    subtitle: 'Our users love us! Check out our reviews on Trustpilot.',
  },
  {
    id: 4,
    value: 'Crystal',
    description: 'Award Winner',
    subtitle: 'Recognized for excellence in education and innovation.',
  },
];

export function Stats() {
  return (
    <section className="mt-30 px-10">
      <p className="text-xs font-medium text-talgach-green">Accelerate</p>

      <p className="text-2xl mt-2 font-medium">
        Achieve something great
        <span className="text-talgach-green">.</span>
      </p>

      <p className="mt-2 text-neutral-600 text-sm max-w-md">
        We've done all the heavy lifting so you don't have to — get all the data
        you need to make informed decisions and drive growth.
      </p>

      <div className="flex items-center justify-between mt-10 gap-10">
        <StatGrid />

        <Image src={whiteboard} alt="Whiteboard" className="w-120" />
      </div>
    </section>
  );
}

function StatGrid() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-10">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}

function StatCard({
  value,
  description,
  subtitle,
}: {
  value: string;
  description: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-4xl font-medium text-talgach-green">{value}</p>
      <p className="mt-1 font-medium">{description}</p>
      <p className="text-xs text-neutral-500 mt-1 max-w-xs">{subtitle}</p>
    </div>
  );
}
