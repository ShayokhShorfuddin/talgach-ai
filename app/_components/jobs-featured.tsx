import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import aws from '@/public/images/aws.jpeg';
import binance from '@/public/images/binance.jpeg';
import bytedance from '@/public/images/bytedance.png';
import coinbase from '@/public/images/coinbase.png';
import github from '@/public/images/github.png';
import meta from '@/public/images/meta.png';
import notion from '@/public/images/notion.png';
import pinterest from '@/public/images/pinterest.jpeg';
import supabase from '@/public/images/supabase.png';
import vercel from '@/public/images/vercel.png';
import verizon from '@/public/images/verizon.jpeg';
import webflow from '@/public/images/webflow.jpeg';
import arrow_right_white from '@/public/svgs/arrow-right-white.svg';

const featured_jobs: {
  id: number;
  icon: StaticImageData;
  role: string;
  hiring_company: string;
  tags: { id: number; label: string }[];
}[] = [
  {
    id: 1,
    icon: meta,
    role: 'Senior Product Designer',
    hiring_company: 'Meta',
    tags: [
      { id: 1, label: 'Design' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Remote' },
    ],
  },
  {
    id: 2,
    icon: vercel,
    role: 'Frontend Engineer',
    hiring_company: 'Vercel',
    tags: [
      { id: 1, label: 'Engineering' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'San Francisco' },
    ],
  },
  {
    id: 3,
    icon: supabase,
    role: 'Backend Developer',
    hiring_company: 'Supabase',
    tags: [
      { id: 1, label: 'Engineering' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Remote' },
    ],
  },
  {
    id: 4,
    icon: notion,
    role: 'UX Researcher',
    hiring_company: 'Notion',
    tags: [
      { id: 1, label: 'Research' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'New York' },
    ],
  },
  {
    id: 5,
    icon: coinbase,
    role: 'Blockchain Engineer',
    hiring_company: 'Coinbase',
    tags: [
      { id: 1, label: 'Engineering' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Remote' },
    ],
  },
  {
    id: 6,
    icon: binance,
    role: 'Product Manager',
    hiring_company: 'Binance',
    tags: [
      { id: 1, label: 'Product' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Singapore' },
    ],
  },
  {
    id: 7,
    icon: aws,
    role: 'Cloud Architect',
    hiring_company: 'AWS',
    tags: [
      { id: 1, label: 'Engineering' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Seattle' },
    ],
  },
  {
    id: 8,
    icon: pinterest,
    role: 'Data Scientist',
    hiring_company: 'Pinterest',
    tags: [
      { id: 1, label: 'Data' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Remote' },
    ],
  },
  {
    id: 9,
    icon: verizon,
    role: 'Network Engineer',
    hiring_company: 'Verizon',
    tags: [
      { id: 1, label: 'Engineering' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'New York' },
    ],
  },
  {
    id: 10,
    icon: webflow,
    role: 'Growth Manager',
    hiring_company: 'Webflow',
    tags: [
      { id: 1, label: 'Marketing' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Remote' },
    ],
  },
  {
    id: 11,
    icon: github,
    role: 'DevOps Engineer',
    hiring_company: 'GitHub',
    tags: [
      { id: 1, label: 'Engineering' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Remote' },
    ],
  },
  {
    id: 12,
    icon: bytedance,
    role: 'AI Researcher',
    hiring_company: 'ByteDance',
    tags: [
      { id: 1, label: 'Research' },
      { id: 2, label: 'Full-time' },
      { id: 3, label: 'Beijing' },
    ],
  },
];

export function JobsFeatured() {
  return (
    <section className="flex items-center justify-between px-10 mt-30 gap-x-12">
      <div className="flex flex-col">
        <h2 className="text-3xl font-medium">
          Featured Jobs
          <span className="text-talgach-green">.</span>
        </h2>

        <p className="mt-4 text-neutral-600 max-w-sm text-sm">
          Explore a curated list of job opportunities tailored to your skills
          and aspirations. Stay ahead in your career with our featured listings.
        </p>

        <div className="flex items-center mt-6 gap-x-2">
          <button
            type="button"
            className="flex items-center bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
          >
            <span>Get started</span>
            <Image
              src={arrow_right_white}
              alt="Arrow right icon"
              className="ml-2 size-2.5"
            />
          </button>

          <button
            type="button"
            className="border border-talgach-green py-1.5 px-3 rounded text-xs font-medium hover:cursor-pointer select-none"
          >
            Browse more
          </button>
        </div>
      </div>

      <JobsGrid />
    </section>
  );
}

function JobsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {featured_jobs.map((job) => (
        <div
          key={job.id}
          className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer"
        >
          <div className="flex">
            <Image
              src={job.icon}
              alt={`${job.hiring_company} logo`}
              className="w-6 h-min rounded"
            />

            <div className="ml-4">
              <p className="text-sm font-medium leading-none">{job.role}</p>
              <p className="text-xs text-neutral-700">{job.hiring_company}</p>
            </div>
          </div>

          <div className="flex items-center gap-x-1 mt-1">
            {job.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] text-neutral-600 border border-neutral-300 rounded-full px-2 py-0.5 mt-3 text-nowrap"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
