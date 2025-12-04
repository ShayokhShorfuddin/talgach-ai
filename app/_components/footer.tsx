import Image from 'next/image';
import Link from 'next/link';
import Facebook from '@/public/svgs/facebook.svg';
import LinkedIn from '@/public/svgs/linkedin.svg';
import X from '@/public/svgs/x.svg';

export function Footer() {
  return (
    <footer className="px-4 sm:px-8 bg-neutral-950">
      <div className="flex flex-col lg:flex-row gap-y-10 gap-x-2 justify-between pt-18">
        {/* Logo and subtext */}
        <div>
          <p className="text-neutral-500 mt-3 max-w-[20rem]">
            Empowering you to land that dream job at leading companies and
            beyond.
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-4 gap-x-12 gap-y-8 text-neutral-500">
          <div className="flex flex-col gap-y-3">
            <p className="text-neutral-300 font-semibold">About</p>

            <Link href="/" className="text-sm">
              Our Story
            </Link>
            <div className="flex items-center gap-x-2">
              <Link href="/" className="text-sm">
                Careers
              </Link>
              <p className="py-0.5 px-1 text-xs rounded bg-talgach-green text-white select-none">
                Hiring
              </p>
            </div>
            <Link href="/" className="text-sm">
              Blog
            </Link>
            <Link href="/" className="text-sm">
              Contact Us
            </Link>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-neutral-300 font-semibold">Products</p>

            <Link href="/" className="text-sm">
              Job Intelligence
            </Link>
            <Link href="/" className="text-sm">
              Interview Guidelines
            </Link>
            <Link href="/" className="text-sm">
              Mock Interviews
            </Link>
            <Link href="/" className="text-sm">
              Resume Builder
            </Link>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-neutral-300 font-semibold">Resources</p>

            <Link href="/" className="text-sm">
              Help Centre
            </Link>
            <Link href="/" className="text-sm">
              API Documentation
            </Link>
            <Link href="/" className="text-sm">
              Community
            </Link>
            <Link href="/" className="text-sm">
              Partners
            </Link>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-neutral-300 font-semibold">Support</p>

            <Link href="/" className="text-sm">
              FAQ
            </Link>
            <Link href="/" className="text-sm">
              Developer Support
            </Link>
            <Link href="/" className="text-sm">
              Report a problem
            </Link>
            <Link href="/" className="text-sm">
              Security & Privacy
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[0.5px] w-full bg-neutral-800 mt-10" />

      <div className="flex flex-wrap gap-x-10 gap-y-2 justify-between items-center text-neutral-600 py-5 text-sm">
        <p>@ 2025 Talgach AI.</p>

        <div className="flex items-center gap-x-5">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Cookie Policy</Link>
          <Link href="/">Legal</Link>
        </div>

        <div className="flex gap-x-3.5">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Facebook} alt="Facebook" className="size-4" />
          </Link>
          <Link
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={LinkedIn} alt="LinkedIn" className="size-4" />
          </Link>
          <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
            <Image src={X} alt="X" className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
