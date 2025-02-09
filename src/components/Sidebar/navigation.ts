import { 
  Building2, HomeIcon, Shield,
  Calendar, HelpCircle,
  MessageCircle, AlertTriangle, Lightbulb,
  Users
} from 'lucide-react';
import type { NavItem } from './types';
import { USER_ROLES } from '../../constants/roles';

export const mainNavigation: NavItem[] = [
  {
    to: '/',
    icon: HomeIcon,
    img: '/images/icon-base.png',
    label: 'Hjem'
  },
  {
    to: '/min-bolig',
    icon: HomeIcon,
    label: 'Boligen'
  },
  { 
    to: '/naboen',
    icon: Users,
    label: 'Naboen',
    highlight: true 
  },
  {
    to: '/bofellesskapet',
    icon: Building2,
    label: 'Bofellesskapet'
  },
  {
    to: '/reservasjoner',
    icon: Calendar,
    label: 'Reservasjoner'
  }
];

export const supportNavigation: NavItem[] = [
  { 
    to: '/kontakt', 
    icon: MessageCircle, 
    label: 'Meldinger' 
  },
  { 
    to: '/faq',
    icon: HelpCircle,
    label: 'Hjelpesenter'
  },
  { 
    to: '/rapporter', 
    icon: AlertTriangle, 
    label: 'Rapportering',
    roles: [USER_ROLES.BOARD]
  },
  { 
    to: '/produktutvikling', 
    icon: Lightbulb, 
    label: 'Produktutvikling', 
    roles: [USER_ROLES.BOARD]
  }
];