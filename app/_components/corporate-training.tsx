import Image from 'next/image';
import arrow_right_white from '@/public/svgs/arrow-right-white.svg';
import briefcase from '@/public/svgs/briefcase.svg';
import desktop from '@/public/svgs/desktop.svg';
import head from '@/public/svgs/head.svg';
import message from '@/public/svgs/message.svg';

const skills: {
  id: number;
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    icon: head,
    title: 'Leadership',
    description:
      'Develop leadership skills to effectively manage teams across multiple projects.',
  },
  {
    id: 2,
    icon: message,
    title: 'Communication',
    description:
      'Enhance your communication skills to effectively convey ideas and collaborate with others.',
  },
  {
    id: 3,
    icon: desktop,
    title: 'Digital skills',
    description:
      'Gain proficiency in digital tools and technologies to thrive in the modern workplace.',
  },
  {
    id: 4,
    icon: briefcase,
    title: 'Project management',
    description:
      'Learn project management methodologies to successfully plan, execute, and deliver projects on time.',
  },
];

export function CorporateTraining() {
  return (
    <section className="flex flex-col items-center mt-30 text-center">
      <small className="text-xs font-medium text-talgach-green">
        Corporate
      </small>

      <h2 className="text-3xl mt-2 font-medium">
        Powerful features for corporations and institutions
        <span className="text-talgach-green">.</span>
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Powerful, self-serve product and growth analytics to help you excel and
        gain confidence. Trusted by over 4,000 organizations.
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-14">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex gap-x-2 border border-neutral-200 hover:border-talgach-green hover:bg-green-50 transition duration-300 rounded p-3 hover:cursor-pointer"
          >
            <Image
              src={skill.icon}
              alt={`${skill.title} icon`}
              className="p-2 size-8"
            />

            <div className="text-start">
              <p className="font-medium text-sm">{skill.title}</p>
              <p className="mt-1 text-neutral-600 text-xs max-w-xs">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="flex items-center bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-6 w-fit"
      >
        <span>Explore corporate solutions</span>
        <Image
          src={arrow_right_white}
          alt="Arrow right icon"
          className="ml-2 size-2.5"
        />
      </button>
    </section>
  );
}
