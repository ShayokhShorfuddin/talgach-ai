import Image from 'next/image';
import ats from '@/public/svgs/ats.svg';
import briefcase from '@/public/svgs/briefcase.svg';
import building from '@/public/svgs/building.svg';
import file from '@/public/svgs/file.svg';

export function Features() {
  return (
    <div className="flex flex-col items-center mt-20 font-sans text-center">
      <small className="text-xs font-medium text-talgach-green">Features</small>

      <h2 className="text-3xl mt-2 font-medium">
        Designed to help you ace any challenge.
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Powerful, self-serve product and growth analytics to help you excel and
        gain confidence. Trusted by over 4,000 job seekers
        <span className="text-talgach-green">.</span>
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-12 mt-14">
        <div className="flex flex-col items-center max-w-xs">
          <div className="bg-green-50 rounded-full p-1.5">
            <div className="rounded-full bg-green-100">
              <Image src={file} alt="File icon" className="p-2 size-8" />
            </div>
          </div>

          <p className="mt-4 font-medium">CV Builder</p>
          <p className="mt-1 text-neutral-600 text-sm">
            Create professional CVs tailored to your experience and target
            roles.
          </p>
        </div>

        <div className="flex flex-col items-center max-w-xs">
          <div className="bg-green-50 rounded-full p-1.5">
            <div className="rounded-full bg-green-100">
              <Image src={ats} alt="ATS icon" className="p-2 size-8" />
            </div>
          </div>
          <p className="mt-4 font-medium">Robust ATS</p>
          <p className="mt-1 text-neutral-600 text-sm">
            Track and manage your applications with our comprehensive applicant
            tracking system.
          </p>
        </div>

        <div className="flex flex-col items-center max-w-xs">
          <div className="bg-green-50 rounded-full p-1.5">
            <div className="rounded-full bg-green-100">
              <Image
                src={briefcase}
                alt="Briefcase icon"
                className="p-2 size-8"
              />
            </div>
          </div>
          <p className="mt-4 font-medium">Job Matching</p>
          <p className="mt-1 text-neutral-600 text-sm">
            Find the perfect opportunities that align with your skills and
            career aspirations.
          </p>
        </div>

        <div className="flex flex-col items-center max-w-xs">
          <div className="bg-green-50 rounded-full p-1.5">
            <div className="rounded-full bg-green-100">
              <Image
                src={building}
                alt="Building icon"
                className="p-2 size-8"
              />
            </div>
          </div>
          <p className="mt-4 font-medium">Admission Eligibility</p>
          <p className="mt-1 text-neutral-600 text-sm">
            Check your eligibility and get guidance for your desired academic
            programs.
          </p>
        </div>
      </div>
    </div>
  );
}
