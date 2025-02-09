import type { LucideIcon } from 'lucide-react';

export interface HelpCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
}