'use client';

import { ArrowRight } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import aws from '@/public/images/aws.jpeg';
import binance from '@/public/images/binance.jpeg';
import coinbase from '@/public/images/coinbase.png';
import meta from '@/public/images/meta.png';
import notion from '@/public/images/notion.png';
import pinterest from '@/public/images/pinterest.jpeg';
import supabase from '@/public/images/supabase.png';
import vercel from '@/public/images/vercel.png';
import verizon from '@/public/images/verizon.jpeg';
import check_fill from '@/public/svgs/check-fill.svg';

const tracked_jobs: {
  id: number;
  icon: StaticImageData;
  role: string;
  hiring_company: string;
  tags: { id: number; label: string; done: boolean }[];
}[] = [
  {
    id: 1,
    icon: meta,
    role: 'Product Designer',
    hiring_company: 'Meta',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: false },
      { id: 4, label: 'Offered', done: false },
    ],
  },
  {
    id: 2,
    icon: vercel,
    role: 'Frontend Engineer',
    hiring_company: 'Vercel',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: true },
      { id: 4, label: 'Offered', done: true },
    ],
  },
  {
    id: 3,
    icon: supabase,
    role: 'Database Administrator',
    hiring_company: 'Supabase',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: false },
      { id: 3, label: 'Interviewed', done: false },
      { id: 4, label: 'Offered', done: false },
    ],
  },
  {
    id: 4,
    icon: notion,
    role: 'UX Researcher',
    hiring_company: 'Notion',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: true },
      { id: 4, label: 'Offered', done: false },
    ],
  },
  {
    id: 5,
    icon: coinbase,
    role: 'Blockchain Engineer',
    hiring_company: 'Coinbase',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: false },
      { id: 4, label: 'Offered', done: false },
    ],
  },
  {
    id: 6,
    icon: binance,
    role: 'Product Manager',
    hiring_company: 'Binance',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: true },
      { id: 4, label: 'Offered', done: false },
    ],
  },
  {
    id: 7,
    icon: aws,
    role: 'Cloud Architect',
    hiring_company: 'AWS',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: false },
      { id: 4, label: 'Offered', done: false },
    ],
  },
  {
    id: 8,
    icon: pinterest,
    role: 'Data Scientist',
    hiring_company: 'Pinterest',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: false },
      { id: 4, label: 'Offered', done: false },
    ],
  },
  {
    id: 9,
    icon: verizon,
    role: 'Network Engineer',
    hiring_company: 'Verizon',
    tags: [
      { id: 1, label: 'Applied', done: true },
      { id: 2, label: 'Shortlisted', done: true },
      { id: 3, label: 'Interviewed', done: false },
      { id: 4, label: 'Offered', done: false },
    ],
  },
];

export function JobTracker() {
  return (
    <section className="flex flex-col lg:flex-row lg:items-center justify-between mt-30 gap-12 px-6 md:px-10">
      <div className="flex flex-col">
        <h2 className="text-3xl font-medium max-w-sm">
          Track your job applications with ease
          <span className="text-talgach-green">.</span>
        </h2>

        <p className="mt-4 text-neutral-600 max-w-sm text-sm">
          Keep track of your job applications effortlessly. Monitor your
          progress and stay organized throughout your job search journey.
        </p>

        <Button
          className={
            'bg-talgach-green rounded text-xs font-medium cursor-pointer mt-6 w-fit'
          }
        >
          <span>Get Started</span>
          <ArrowRight color="#ffffff" strokeWidth={1.5} />
        </Button>
      </div>

      <JobsGrid />
    </section>
  );
}

function JobsGrid() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
      {tracked_jobs.map((job) => (
        <div
          key={job.id}
          className="relative border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer"
        >
          {/* Tick icon if all stages have been cleared */}
          {job.tags.every((tag) => tag.done) && (
            <Image
              src={check_fill}
              alt="Check fill icon"
              className="absolute top-2 right-2"
            />
          )}

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

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {job.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] text-neutral-600 rounded-full px-2 py-0.5 text-nowrap"
                style={{
                  backgroundColor: tag.done ? '#D1FAE5' : '#F3F4F6',
                  color: tag.done ? '#065F46' : '#6B7280',
                }}
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
