'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
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
// import { authClient } from '@/lib/auth-client';
// import { useUserRolesStore } from '@/lib/stores/user-roles-store';
import { dashboardRoutesForRoles } from '@/shared/dashboard-routes';
import type { Type_UserRole } from '@/types/user-role';

// TODO: Server Actions are not designed for data fetching: They are intended for mutations (e.g., create, update, delete operations). Using them for reads can lead to poor performance and unexpected behavior. Migrate all "read" related server actions to API routes and use Tanstack Query with those.

const fetchUserRoles = async ({
  id,
}: {
  id: string;
}): Promise<Type_UserRole[]> => {
  const response = await fetch('/api/user-roles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'user-id': id,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user roles');
  }
  return response.json() as Promise<Type_UserRole[]>;
};

export function SidebarHeaderDropdown() {
  const { data: session } = authClient.useSession();
  const userID = session?.user?.id;

  const {
    data: userRoles,
    isLoading,
    error,
  } = useQuery<Type_UserRole[]>({
    queryKey: ['user_roles', userID],
    queryFn: () => fetchUserRoles({ id: userID! }),
    enabled: !!userID, // Only run the query if userID is available
    staleTime: 24 * 60 * 60 * 1000, // Cache user roles for 24 hours to avoid unnecessary refetches. If we allow users to add/remove roles in future, we can just invalidate this query.
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading user roles</p>;
  }

  if (!userRoles) {
    return <p>No roles found</p>;
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
