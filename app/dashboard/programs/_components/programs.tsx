'use client';

import { useState } from 'react';
import china from '@/public/svgs/flags/china.svg';
import germany from '@/public/svgs/flags/germany.svg';
import japan from '@/public/svgs/flags/japan.svg';
import switzerland from '@/public/svgs/flags/switzerland.svg';
import turkey from '@/public/svgs/flags/turkey.svg';
import uk from '@/public/svgs/flags/uk.svg';
import usa from '@/public/svgs/flags/usa.svg';
import { ProgramCard } from './program-card';
import { SearchBar } from './search-bar';

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <p className="mt-10 font-medium text-xl">Search Programs</p>
        <p className="text-sm text-neutral-500">Find programs by their name.</p>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {programs
            .filter((program) =>
              program.programName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )
            .map((program) => (
              <ProgramCard key={program.id} {...program} />
            ))}
        </div>
      </div>
    </section>
  );
}

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
  {
    id: 10,
    flagIcon: germany,
    programName: 'PhD in Physics',
    universityName: 'Ludwig Maximilian University',
    eligibilityTags: ['Masters Degree', 'Research Proposal'],
  },
  {
    id: 11,
    flagIcon: switzerland,
    programName: 'Bachelors in Economics',
    universityName: 'University of Zurich',
    eligibilityTags: ['Matura equivalent', 'German B2'],
  },
  {
    id: 12,
    flagIcon: japan,
    programName: 'Masters in Environmental Science',
    universityName: 'Kyoto University',
    eligibilityTags: ['Bachelor Degree', 'TOEFL 90'],
  },
  {
    id: 13,
    flagIcon: usa,
    programName: 'Bachelors in Computer Engineering',
    universityName: 'MIT',
    eligibilityTags: ['SAT Score', 'AP Calculus'],
  },
  {
    id: 14,
    flagIcon: uk,
    programName: 'MA in International Relations',
    universityName: 'London School of Economics',
    eligibilityTags: ['Political Science Degree', 'IELTS 7.0'],
  },
  {
    id: 15,
    flagIcon: china,
    programName: 'Bachelors in Medicine',
    universityName: 'Peking University',
    eligibilityTags: ['Science Background', 'HSK Level 6'],
  },
  {
    id: 16,
    flagIcon: turkey,
    programName: 'Masters in Civil Engineering',
    universityName: 'Middle East Technical University',
    eligibilityTags: ['Engineering Degree', 'GRE Score'],
  },
  {
    id: 17,
    flagIcon: germany,
    programName: 'MSc in Biotechnology',
    universityName: 'Heidelberg University',
    eligibilityTags: ['Biology Degree', 'English C1'],
  },
  {
    id: 18,
    flagIcon: usa,
    programName: 'JD Law Program',
    universityName: 'Yale University',
    eligibilityTags: ['LSAT Score', 'Bachelor Degree'],
  },
  {
    id: 19,
    flagIcon: japan,
    programName: 'Bachelors in Animation',
    universityName: 'Tokyo University of the Arts',
    eligibilityTags: ['Portfolio', 'Japanese N2'],
  },
];
