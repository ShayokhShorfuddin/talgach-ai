import { BotIcon, Briefcase, Home, User2 } from 'lucide-react';
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
    name: 'Simulations And CV Scanner',
    href: '/dashboard/job-seeker/simulations-and-cv-scanner',
    icon: <User2 />,
  },
  {
    id: 4,
    name: 'AI Interview',
    href: '/dashboard/job-seeker/ai-interview',
    icon: <BotIcon />,
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
