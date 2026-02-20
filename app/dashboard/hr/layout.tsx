import { Briefcase, Home, Users2Icon } from 'lucide-react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/shared/sidebar/dashboard-sidebar';
import type { Type_SidebarMenuItems } from '@/types/sidebar-menu-items';

const sidebarMenuItems: Type_SidebarMenuItems = [
  {
    id: 1,
    name: 'Home',
    href: '/dashboard/hr',
    icon: <Home />,
  },

  {
    id: 2,
    name: 'Jobs',
    href: '/dashboard/hr/jobs',
    icon: <Briefcase />,
  },

  {
    id: 3,
    name: 'Candidates',
    href: '/dashboard/hr/candidates',
    icon: <Users2Icon />,
  },
];

export default function HRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar
        sidebarMenuItems={sidebarMenuItems}
        basePath="/dashboard/hr"
      />
      <SidebarInset>{<main>{children}</main>}</SidebarInset>
    </SidebarProvider>
  );
}
