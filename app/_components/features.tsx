import Image from 'next/image';
import ats from '@/public/svgs/ats.svg';
import briefcase from '@/public/svgs/briefcase.svg';
import building from '@/public/svgs/building.svg';
import file from '@/public/svgs/file.svg';

const features: {
  id: number;
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    icon: file,
    title: 'CV Builder',
    description:
      'Create professional CVs tailored to your experience and target roles.',
  },
  {
    id: 2,
    icon: ats,
    title: 'Robust ATS',
    description:
      'Track and manage your applications with our comprehensive applicant tracking system.',
  },
  {
    id: 3,
    icon: briefcase,
    title: 'Job Matching',
    description:
      'Find the perfect opportunities that align with your skills and career aspirations.',
  },
  {
    id: 4,
    icon: building,
    title: 'Admission Eligibility',
    description:
      'Check your eligibility and get guidance for your desired academic programs.',
  },
];

export function Features() {
  return (
    <section className="flex flex-col items-center mt-20 font-sans text-center">
      <small className="text-xs font-medium text-talgach-green">Features</small>

      <h2 className="text-3xl mt-2 font-medium">
        Designed to help you ace any challenge
        <span className="text-talgach-green">.</span>
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Powerful, self-serve product and growth analytics to help you excel and
        gain confidence. Trusted by over 4,000 job seekers.
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-12 mt-14">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center max-w-xs">
            <div className="bg-green-50 rounded-full p-1.5">
              <div className="rounded-full bg-green-100">
                <Image
                  src={feature.icon}
                  alt={`${feature.title} icon`}
                  className="p-2 size-8"
                />
              </div>
            </div>

            <p className="mt-4 font-medium">{feature.title}</p>
            <p className="mt-1 text-neutral-600 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
