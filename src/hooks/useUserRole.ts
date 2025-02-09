import { create } from 'zustand';
import { UserRole, USER_ROLES } from '../constants/roles';

interface UserRoleStore {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useUserRole = create<UserRoleStore>((set) => ({
  role: USER_ROLES.BOARD, // Changed from OWNER to BOARD
  setRole: (role) => set({ role })
}));