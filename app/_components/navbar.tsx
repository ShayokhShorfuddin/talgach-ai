import Image from 'next/image';
import Link from 'next/link';
import chevron_down from '@/public/svgs/chevron-down.svg';
import logo_green from '@/public/svgs/logo-green.svg';
import { Menu } from './menu/menu';
import { MenuContent } from './menu/menu-content';
import { MenuTrigger } from './menu/menu-trigger';

export default function Navbar() {
  return (
    <header>
      <nav>
        <div className="flex justify-between items-start w-full mt-4 px-10">
          <div className="flex gap-x-2">
            <Image src={logo_green} alt="Logo" className="h-16 w-min mr-5" />

            <Link
              href="/"
              className="text-sm font-medium h-min p-2 border-talgach-green hover:border-b-2"
            >
              Home
            </Link>

            <ProductsMenu />

            <AboutMenu />

            <Link
              href="#pricing"
              className="text-sm font-medium h-min p-2 border-talgach-green hover:border-b-2"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className="border border-talgach-green py-1.5 px-3 rounded text-xs font-medium hover:cursor-pointer select-none"
            >
              Sign In
            </button>

            <button
              type="button"
              className="bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function ProductsMenu() {
  return (
    <Menu>
      <MenuTrigger>
        <div className="flex items-center gap-x-1 p-2">
          <p className="text-sm font-medium h-min hover:cursor-default mr-1">
            Products
          </p>

          <Image src={chevron_down} alt="Chevron Down" className="size-2.5" />
        </div>
      </MenuTrigger>

      <MenuContent>
        <div className="p-2 flex flex-col gap-y-1">
          <Link
            href="/dashboard"
            className="block p-1 hover:bg-gray-100 text-sm"
          >
            Job Intelligence
          </Link>
          <Link
            href="/dashboard"
            className="block p-1 hover:bg-gray-100 text-sm"
          >
            Interview Guidelines
          </Link>
          <Link
            href="/dashboard"
            className="block p-1 hover:bg-gray-100 text-sm"
          >
            Mock Interviews
          </Link>
          <Link
            href="/dashboard"
            className="block p-1 hover:bg-gray-100 text-sm"
          >
            Resume Builder
          </Link>
        </div>
      </MenuContent>
    </Menu>
  );
}

function AboutMenu() {
  return (
    <Menu>
      <MenuTrigger>
        <div className="flex items-center gap-x-1 p-2">
          <p className="text-sm font-medium h-min hover:cursor-default mr-1">
            About
          </p>

          <Image src={chevron_down} alt="Chevron Down" className="size-2.5" />
        </div>
      </MenuTrigger>

      <MenuContent>
        <div className="p-2 flex flex-col gap-y-1">
          <Link href="/" className="block p-1 hover:bg-gray-100 text-sm">
            Blog
          </Link>
          <Link href="/" className="block p-1 hover:bg-gray-100 text-sm">
            Our team
          </Link>
          <Link href="/" className="block p-1 hover:bg-gray-100 text-sm">
            Careers
          </Link>
          <Link href="/" className="block p-1 hover:bg-gray-100 text-sm">
            Contact Us
          </Link>
        </div>
      </MenuContent>
    </Menu>
  );
}
