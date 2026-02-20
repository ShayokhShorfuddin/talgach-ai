import { Home } from 'lucide-react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/shared/sidebar/dashboard-sidebar';
import type { Type_SidebarMenuItems } from '@/types/sidebar-menu-items';

const sidebarMenuItems: Type_SidebarMenuItems = [
  {
    id: 1,
    name: 'Home',
    href: '/dashboard/organization',
    icon: <Home />,
  },
];

export default function OrganizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar
        sidebarMenuItems={sidebarMenuItems}
        basePath="/dashboard/organization"
      />
      <SidebarInset>{<main>{children}</main>}</SidebarInset>
    </SidebarProvider>
  );
}
