import { File, Home, PenBoxIcon } from 'lucide-react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/shared/sidebar/dashboard-sidebar';
import type { Type_SidebarMenuItems } from '@/types/sidebar-menu-items';

const sidebarMenuItems: Type_SidebarMenuItems = [
  {
    id: 1,
    name: 'Home',
    href: '/dashboard/student',
    icon: <Home />,
  },
  {
    id: 2,
    name: 'Programs',
    href: '/dashboard/student/programs',
    icon: <File />,
  },
  {
    id: 3,
    name: 'Writing Assistant',
    href: '/dashboard/student/writing-assistant',
    icon: <PenBoxIcon />,
  },
];

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar
        sidebarMenuItems={sidebarMenuItems}
        basePath="/dashboard/student"
      />
      <SidebarInset>{<main>{children}</main>}</SidebarInset>
    </SidebarProvider>
  );
}
