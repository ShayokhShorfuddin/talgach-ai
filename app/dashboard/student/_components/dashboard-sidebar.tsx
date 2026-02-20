import { File, Home, PenBoxIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { authClient } from '@/lib/auth-client';
import { DashboardSidebarMenu } from './dashboard-sidebar-menu';
import { SidebarHeaderDropdown } from './sidebar-header-dropdown';

const sidebarMenuItems = [
  {
    key: 'home',
    title: 'Home',
    href: '/dashboard/student',
    icon: <Home />,
  },
  {
    key: 'programs',
    title: 'Programs',
    href: '/dashboard/student/programs',
    icon: <File />,
  },
  {
    key: 'writing_assistant',
    title: 'Writing Assistant',
    href: '/dashboard/student/writing-assistant',
    icon: <PenBoxIcon />,
  },
];

export function DashboardSidebar() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name.split(' ')[0] || 'User';

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
            <ProfileDropdownMenuTrigger firstName={firstName} />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem
                render={
                  <Link
                    href={'/dashboard/student/profile'}
                    className="cursor-pointer"
                  >
                    Profile
                  </Link>
                }
              />
              <DropdownMenuSeparator />
            </DropdownMenuGroup>

            <DropdownMenuItem>
              <Button
                size={'sm'}
                variant={'destructive'}
                className="rounded w-full"
                onClick={async () => {
                  await authClient.signOut();
                  redirect('/');
                }}
              >
                Log Out
              </Button>
            </DropdownMenuItem>

            {/* TODO: Fix other dashboards */}
            {/* TODO: Since all dashboards are expected to use the same base sidebar, we need to move it to /shared */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function ProfileDropdownMenuTrigger({ firstName }: { firstName: string }) {
  return (
    <div className="flex items-center rounded outline outline-neutral-200 p-1.5 gap-2.5">
      <div className="size-7 bg-talgach-green rounded-full flex items-center justify-center">
        <p className="text-sm font-medium text-white">
          {firstName.charAt(0).toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col items-start">
        <p className="text-sm">{firstName}</p>
        <p className="text-[11px] text-neutral-500">Free tier</p>
      </div>
    </div>
  );
}
