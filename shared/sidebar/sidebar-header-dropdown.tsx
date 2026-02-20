'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';
import { useUserRolesStore } from '@/lib/stores/user-roles-store';
import { dashboardRoutesForRoles } from '@/shared/dashboard-routes';

export function SidebarHeaderDropdown() {
  const userRoles = useUserRolesStore((state) => state.userRoles);
  const fetchUserRoles = useUserRolesStore((state) => state.fetchUserRoles);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.id && userRoles.length === 0) {
      fetchUserRoles(session.user.id);
    }
  }, [session?.user?.id, userRoles.length, fetchUserRoles]);

  if (isPending || !session) {
    return (
      <Button variant="outline" disabled>
        Loading…
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" className={'rounded'} />}
      >
        Switch Dashboard
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Dashboards</DropdownMenuLabel>
          {userRoles.map((role) => {
            return (
              <DropdownMenuItem
                key={role}
                render={
                  <Link
                    href={dashboardRoutesForRoles[role]}
                    className="cursor-pointer"
                  >
                    {roleNormalizer[role]}
                  </Link>
                }
              />
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const roleNormalizer: Record<string, string> = {
  student: 'Student',
  job_seeker: 'Job seeker',
  human_resource: 'Human resource',
  organization: 'Organization',
};
