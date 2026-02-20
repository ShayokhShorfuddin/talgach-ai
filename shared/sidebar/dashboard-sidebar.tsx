import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import type { Type_SidebarMenuItems } from '@/types/sidebar-menu-items';
import { DashboardSidebarLogoutButton } from './dashboard-sidebar-logout-button';
import { DashboardSidebarMenu } from './dashboard-sidebar-menu';
import { ProfileDropdownMenuTrigger } from './profile-dropdown-menu-trigger';
import { SidebarHeaderDropdown } from './sidebar-header-dropdown';

export function DashboardSidebar({
  sidebarMenuItems,
  basePath,
}: {
  sidebarMenuItems: Type_SidebarMenuItems;
  basePath: string;
}) {
  // TODO: Make sidebar collapse to icons when a button is clicked

  return (
    <Sidebar variant="sidebar" side="left">
      <SidebarHeader>
        <SidebarHeaderDropdown />
      </SidebarHeader>

      <SidebarContent>
        <DashboardSidebarMenu sidebarMenuItems={sidebarMenuItems} />
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ProfileDropdownMenuTrigger />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem
                render={
                  <Link href={`${basePath}/profile`} className="cursor-pointer">
                    Profile
                  </Link>
                }
              />
              <DropdownMenuSeparator />
            </DropdownMenuGroup>

            <DropdownMenuItem>
              <DashboardSidebarLogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
