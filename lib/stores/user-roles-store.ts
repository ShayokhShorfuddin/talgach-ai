import { create } from 'zustand';
import { getRolesOfUser } from '@/app/_actions/get-roles-of-user';
import type { Type_UserRole } from '@/types/user-role';

interface UserRolesState {
  userRoles: Type_UserRole[];
  isLoading: boolean;
  setUserRoles: (roles: Type_UserRole[]) => void;
  fetchUserRoles: (userId: string) => Promise<void>;
}

const useUserRolesStore = create<UserRolesState>((set, get) => ({
  userRoles: [],
  isLoading: false,
  setUserRoles: (roles) => set({ userRoles: roles }),
  fetchUserRoles: async (userId) => {
    // Avoid redundant fetches if roles are already loaded or a fetch is in progress
    if (get().userRoles.length > 0 || get().isLoading) return;

    set({ isLoading: true });
    try {
      const roles = await getRolesOfUser({ id: userId });
      set({ userRoles: roles, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));

export { useUserRolesStore };
