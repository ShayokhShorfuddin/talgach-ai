import { Briefcase, File, Home, User2 } from 'lucide-react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/shared/sidebar/dashboard-sidebar';
import type { Type_SidebarMenuItems } from '@/types/sidebar-menu-items';

const sidebarMenuItems: Type_SidebarMenuItems = [
  {
    id: 1,
    name: 'Home',
    href: '/dashboard/job-seeker',
    icon: <Home />,
  },
  {
    id: 2,
    name: 'Jobs',
    href: '/dashboard/job-seeker/jobs',
    icon: <Briefcase />,
  },
  {
    id: 3,
    name: 'Simulations',
    href: '/dashboard/job-seeker/simulations',
    icon: <User2 />,
  },
  {
    id: 4,
    name: 'CV Scanner',
    href: '/dashboard/job-seeker/cv-scanner',
    icon: <File />,
  },
];

export default function JobSeekerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar
        sidebarMenuItems={sidebarMenuItems}
        basePath="/dashboard/job-seeker"
      />
      <SidebarInset>{<main>{children}</main>}</SidebarInset>
    </SidebarProvider>
  );
}
