import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import china from '@/public/svgs/flags/china.svg';
import germany from '@/public/svgs/flags/germany.svg';
import japan from '@/public/svgs/flags/japan.svg';
import switzerland from '@/public/svgs/flags/switzerland.svg';
import turkey from '@/public/svgs/flags/turkey.svg';
import uk from '@/public/svgs/flags/uk.svg';
import usa from '@/public/svgs/flags/usa.svg';

const programs: {
  id: number;
  flagIcon: string;
  programName: string;
  universityName: string;
  eligibilityTags: string[];
}[] = [
  {
    id: 1,
    flagIcon: uk,
    programName: 'Master of Science in AI',
    universityName: 'University of Oxford',
    eligibilityTags: ['Minimum 3.5 GPA', 'IELTS 7.0'],
  },
  {
    id: 2,
    flagIcon: germany,
    programName: 'Bachelors in Business Admin.',
    universityName: 'Technical University of Munich',
    eligibilityTags: ['Abitur equivalent', 'German B2'],
  },
  {
    id: 3,
    flagIcon: usa,
    programName: 'MBA in Finance',
    universityName: 'Harvard University',
    eligibilityTags: ['GMAT score', 'Work Experience'],
  },
  {
    id: 4,
    flagIcon: japan,
    programName: 'Exchange Program in Robotics',
    universityName: 'University of Tokyo',
    eligibilityTags: ['Junior standing', 'JLPT N3'],
  },
  {
    id: 5,
    flagIcon: china,
    programName: 'Masters in Computer Science',
    universityName: 'Tsinghua University',
    eligibilityTags: ['Bachelor Degree', 'HSK Level 5'],
  },
  {
    id: 6,
    flagIcon: switzerland,
    programName: 'MSc in Mechanical Engineering',
    universityName: 'ETH Zurich',
    eligibilityTags: ['GRE Score', 'German C1'],
  },
  {
    id: 7,
    flagIcon: turkey,
    programName: 'Bachelors in Architecture',
    universityName: 'Istanbul Technical University',
    eligibilityTags: ['High School Diploma', 'Portfolio'],
  },
  {
    id: 8,
    flagIcon: uk,
    programName: 'LLM in International Law',
    universityName: 'University of Cambridge',
    eligibilityTags: ['Law Degree', 'IELTS 7.5'],
  },
  {
    id: 9,
    flagIcon: usa,
    programName: 'MS in Data Science',
    universityName: 'Columbia University',
    eligibilityTags: ['GRE Quantitative', 'Python Skills'],
  },
];

export function StudyAbroadPrograms() {
  return (
    <section className="flex flex-col-reverse lg:flex-row lg:items-center justify-between mt-30 gap-12 px-6 md:px-10">
      <ProgramsGrid />

      <div className="flex flex-col">
        <h2 className="text-3xl font-medium">
          Global Admission Programs
          <span className="text-talgach-green">.</span>
        </h2>

        <p className="mt-4 text-neutral-600 max-w-sm text-sm">
          Explore a curated list of job opportunities tailored to your skills
          and aspirations. Stay ahead in your career with our featured listings.
        </p>

        <Button
          className={
            'bg-talgach-green rounded text-xs font-medium cursor-pointer mt-8 w-fit'
          }
        >
          <span>Check Eligibility with AI</span>
          <ArrowRight color="#ffffff" strokeWidth={1.5} />
        </Button>
      </div>
    </section>
  );
}

function ProgramsGrid() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
      {programs.map((program) => (
        <div
          key={program.id}
          className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer"
        >
          <div className="flex">
            <Image
              src={program.flagIcon}
              alt={`${program.universityName} logo`}
              className="w-6 h-min"
            />

            <div className="ml-4 leading-none">
              <p className="text-sm font-medium">{program.programName}</p>
              <p className="text-xs text-neutral-700">
                {program.universityName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-1 mt-1">
            {program.eligibilityTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-neutral-600 border border-neutral-300 rounded-full px-2 py-0.5 mt-3 text-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
