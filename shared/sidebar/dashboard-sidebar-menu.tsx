'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { Type_SidebarMenuItems } from '@/types/sidebar-menu-items';

export function DashboardSidebarMenu({
  sidebarMenuItems,
}: {
  sidebarMenuItems: Type_SidebarMenuItems;
}) {
  const pathName = usePathname();

  return (
    <SidebarMenu>
      {sidebarMenuItems.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            className="rounded-none hover:bg-talgach-green/5 transition-colors duration-150"
            render={
              <Link
                href={item.href}
                className={`py-5 ${pathName === item.href ? 'border border-talgach-green' : ''}`}
              >
                {item.icon}
                <p className="font-medium">{item.name}</p>
              </Link>
            }
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
