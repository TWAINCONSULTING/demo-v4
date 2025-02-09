import { 
  BookOpen, Wrench, Car, DollarSign, Trash2, 
  LogOut, Users, Laptop, Shield, MessageCircle,
  Building2, MessageSquare
} from 'lucide-react';
import type { HelpCategory } from '../types/help';

export const helpCategories: HelpCategory[] = [
  {
    id: 'condo',
    label: 'Condo',
    icon: Building2
  },
  {
    id: 'chatbot',
    label: 'Chatbot',
    icon: MessageSquare
  },
  {
    id: 'rules',
    label: 'Regler',
    icon: BookOpen
  },
  {
    id: 'maintenance',
    label: 'Vedlikehold',
    icon: Wrench
  },
  {
    id: 'parking',
    label: 'Parkering',
    icon: Car
  },
  {
    id: 'payments',
    label: 'Betalinger',
    icon: DollarSign
  },
  {
    id: 'waste',
    label: 'Søppelhåndtering',
    icon: Trash2
  },
  {
    id: 'moving',
    label: 'Flytting',
    icon: LogOut
  },
  {
    id: 'neighbors',
    label: 'Naboen',
    icon: Users
  },
  {
    id: 'digital',
    label: 'Digital tilgang',
    icon: Laptop
  },
  {
    id: 'security',
    label: 'Sikkerhet',
    icon: Shield
  },
  {
    id: 'contact',
    label: 'Kontakt',
    icon: MessageCircle
  }
];