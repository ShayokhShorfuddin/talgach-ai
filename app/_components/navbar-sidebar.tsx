import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { innerLinks } from './navbar-navigation-menu';

export function NavbarSidebar() {
  return (
    <Sidebar variant="sidebar" side="right">
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem key={'Home'}>
            <SidebarMenuButton render={<Link href="/">Home</Link>} />
          </SidebarMenuItem>

          <SidebarMenuItem key={'Products'}>
            <SidebarMenuButton>Products</SidebarMenuButton>
            <SidebarMenuSub>
              {innerLinks.products.map((product) => (
                <SidebarMenuItem key={product.key}>
                  <SidebarMenuSubButton
                    href={product.href}
                    className="h-fit py-1.5"
                  >
                    {product.title}
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem key={'About'}>
            <SidebarMenuButton>About</SidebarMenuButton>
            <SidebarMenuSub>
              {innerLinks.about.map((about) => (
                <SidebarMenuItem key={about.key}>
                  <SidebarMenuSubButton
                    href={about.href}
                    className="h-fit py-1.5"
                  >
                    {about.title}
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem key={'Pricing'}>
            <SidebarMenuButton render={<Link href="#pricing">Pricing</Link>} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
