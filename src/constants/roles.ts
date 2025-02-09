import { Building2, Home, Users } from 'lucide-react';

export const USER_ROLES = {
  BOARD: 'board',
  OWNER: 'owner',
  TENANT: 'tenant'
} as const;

export const ROLE_CONFIG = [
  {
    id: USER_ROLES.BOARD,
    label: 'Styret',
    icon: Building2
  },
  {
    id: USER_ROLES.OWNER,
    label: 'Eier',
    icon: Home
  },
  {
    id: USER_ROLES.TENANT,
    label: 'Leietaker',
    icon: Users
  }
] as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];