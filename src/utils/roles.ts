import { UserRole, USER_ROLES } from '../constants/roles';

export const isOwnerOrBoard = (role: UserRole): boolean => {
  return role === USER_ROLES.OWNER || role === USER_ROLES.BOARD;
};

export const hasExtendedAccess = (role: UserRole): boolean => {
  return isOwnerOrBoard(role);
};