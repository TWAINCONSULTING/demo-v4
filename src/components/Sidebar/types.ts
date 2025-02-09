import { DivideIcon as LucideIcon } from 'lucide-react';
import { UserRole } from '../../constants/roles';

export interface NavItem {
  to: string;
  icon?: LucideIcon;
  img?: string;
  label: string;
  highlight?: boolean;
  isScrollTarget?: boolean;
  children?: NavItem[];
  roles?: UserRole[];
}

export interface NavItemProps {
  item: NavItem;
  onClick?: () => void;
}