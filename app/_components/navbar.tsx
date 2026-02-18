import Image from 'next/image';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import logo_green from '@/public/svgs/logo-green.svg';
import { NavbarNavigationMenu } from './navbar-navigation-menu';

export function Navbar() {
  return (
    <header>
      <nav>
        <div className="flex justify-between px-4 md:px-10 mt-3">
          <div className="flex gap-x-2">
            <Image
              src={logo_green}
              alt="Talgach logo"
              className="h-16 w-min mr-5"
            />

            <NavbarNavigationMenu />
          </div>

          <div className="hidden sm:flex items-start gap-x-2">
            <Link
              className="border border-talgach-green py-1.5 px-3 rounded text-xs font-medium hover:cursor-pointer select-none"
              href="/signin"
            >
              Sign In
            </Link>

            <Link className="bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none" href="/signup">
              Get Started
            </Link>
          </div>

          <SidebarTrigger className={'sm:hidden'} />
        </div>
      </nav>
    </header>
  );
}
