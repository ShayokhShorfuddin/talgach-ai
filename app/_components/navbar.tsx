'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import chevron_down from '@/public/svgs/chevron-down.svg';
import close from '@/public/svgs/close.svg';
import logo_green from '@/public/svgs/logo-green.svg';
import menu_icon from '@/public/svgs/menu.svg';
import { Menu } from './menu/menu';
import { MenuContent } from './menu/menu-content';
import { MenuTrigger } from './menu/menu-trigger';
import { MobileMenu } from './mobile-menu/mobile-menu';
import { MobileMenuContent } from './mobile-menu/mobile-menu-content';
import { MobileMenuTrigger } from './mobile-menu/mobile-menu-trigger';

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function handleGetStarted() {
    const { data: session } = await authClient.getSession();

    if (!session) {
      router.push('/signin');
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <header>
      <nav>
        <DesktopNavbar handleGetStarted={handleGetStarted} />
        <MobileNavbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          sidebarRef={dropdownRef}
          handleGetStarted={handleGetStarted}
        />
      </nav>
    </header>
  );
}

function MobileNavbar({
  sidebarRef,
  isSidebarOpen,
  setIsSidebarOpen,
  handleGetStarted,
}: {
  isSidebarOpen: boolean;
  sidebarRef: React.RefObject<HTMLElement | null> | null;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetStarted: () => Promise<void>;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <div className="relative flex sm:hidden justify-between items-start w-full mt-4 px-4 md:px-10">
      <Image src={logo_green} alt="Logo" className="h-14 w-min mr-5" />

      <div className="flex items-center gap-x-1">
        {!session && (
          <button
            type="button"
            onClick={handleGetStarted}
            className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
          >
            Get Started
          </button>
        )}

        {session && (
          <button
            type="button"
            className="bg-talgach-green py-1 px-2.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
            onClick={() => router.push('/dashboard')}
          >
            Go To Dashboard
          </button>
        )}

        <button
          type="button"
          className="cursor-pointer pl-2 py-2"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <Image src={menu_icon} alt="Menu" className="size-4" />
        </button>
      </div>

      <MobileDropdown
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sidebarRef={sidebarRef}
      />
    </div>
  );
}

function DesktopNavbar({
  handleGetStarted,
}: {
  handleGetStarted: () => Promise<void>;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <div className="hidden sm:flex justify-between items-start w-full mt-4 px-4 md:px-10">
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

      {!session && (
        <div className="flex items-center gap-x-2">
          <button
            type="button"
            className="border border-talgach-green py-1.5 px-3 rounded text-xs font-medium hover:cursor-pointer select-none"
            onClick={() => router.push('/signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleGetStarted}
            className="bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
          >
            Get Started
          </button>
        </div>
      )}

      {session && (
        <button
          type="button"
          className="bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
          onClick={() => router.push('/dashboard')}
        >
          Go To Dashboard
        </button>
      )}
    </div>
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

function MobileDropdown({
  sidebarRef,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarRef: React.RefObject<HTMLElement | null> | null;
}) {
  return (
    <aside
      className="fixed z-20 right-0 top-0 sm:hidden flex flex-col h-screen border-l border-gray-200 bg-white p-5"
      style={{
        visibility: isSidebarOpen ? 'visible' : 'hidden',
      }}
      ref={sidebarRef}
    >
      <button
        type="button"
        className="hover:cursor-pointer self-end pl-2 py-2"
        aria-label="Close menu"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
      >
        <Image src={close} alt="Close menu" className="size-4" />
      </button>

      <div className="flex flex-col gap-y-3.5 mt-2">
        <Link href="/" className="text-sm font-medium h-min">
          Home
        </Link>

        <MobileMenu>
          <MobileMenuTrigger>
            <p className="text-sm font-medium">Products</p>
          </MobileMenuTrigger>

          <MobileMenuContent>
            <div className="flex flex-col gap-y-3.5 mt-3">
              <Link href="/dashboard" className="text-sm">
                Job Intelligence
              </Link>
              <Link href="/dashboard" className="text-sm">
                Interview Guidelines
              </Link>
              <Link href="/dashboard" className="text-sm">
                Mock Interviews
              </Link>
              <Link href="/dashboard" className="text-sm">
                Resume Builder
              </Link>
            </div>
          </MobileMenuContent>
        </MobileMenu>

        <MobileMenu>
          <MobileMenuTrigger>
            <p className="text-sm font-medium">About</p>
          </MobileMenuTrigger>

          <MobileMenuContent>
            <div className="flex flex-col gap-y-3.5 mt-3">
              <Link href="/" className="text-sm">
                Blog
              </Link>
              <Link href="/" className="text-sm">
                Our team
              </Link>
              <Link href="/" className="text-sm">
                Careers
              </Link>
              <Link href="/" className="text-sm">
                Contact Us
              </Link>
            </div>
          </MobileMenuContent>
        </MobileMenu>

        <Link href="#pricing" className="text-sm font-medium h-min ">
          Pricing
        </Link>
      </div>
    </aside>
  );
}
