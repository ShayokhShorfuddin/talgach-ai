import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const innerLinks = {
  products: [
    { key: 1, title: 'Job Intelligence', href: '/dashboard' },
    { key: 2, title: 'Interview Guidelines', href: '/dashboard' },
    { key: 3, title: 'Mock Interviews', href: '/dashboard' },
    { key: 4, title: 'Resume Builder', href: '/dashboard' },
  ],

  about: [
    { key: 1, title: 'Blog', href: '/' },
    { key: 2, title: 'Our Team', href: '/' },
    { key: 3, title: 'Careers', href: '/' },
    { key: 4, title: 'Contact Us', href: '/' },
  ],
};

export function NavbarNavigationMenu() {
  return (
    <NavigationMenu className={'hidden sm:block h-min'}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/">Home</Link>}
          />
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              'px-2.5 h-fit hover:bg-background data-open:hover:bg-background data-popup-open:hover:bg-background'
            }
          >
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              {innerLinks.products.map((product) => (
                <ListItem
                  key={product.key}
                  title={product.title}
                  href={product.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              'px-2.5 h-fit hover:bg-background data-open:hover:bg-background data-popup-open:hover:bg-background'
            }
          >
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              {innerLinks.about.map((about) => (
                <ListItem
                  key={about.key}
                  title={about.title}
                  href={about.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="#pricing">Pricing</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="text-muted-foreground line-clamp-2">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
