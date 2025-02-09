import type { LucideIcon } from 'lucide-react';

export interface ContainerItem {
  type: string;
  color: string;
  description: string;
}

export interface SplitItem {
  label: string;
  value: string;
}

export interface ContentSection {
  title: string;
  items: Array<ContainerItem | SplitItem | string>;
  type?: 'container' | 'split' | 'list';
  note?: string;
}

export interface Section {
  title: string;
  icon: LucideIcon;
  importantIcon?: LucideIcon;
  content: ContentSection[];
}