import type { LucideIcon } from 'lucide-react';
import { Laptop, Smartphone, MessageSquare, FileText } from 'lucide-react';

interface ReportType {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const RECIPIENTS = [
  { value: 'condo', label: 'Condo' },
  { value: 'styret', label: 'Styret' }
] as const;

export const PROBLEM_TYPES: ReportType[] = [
  { value: 'website', label: 'Nettside', icon: Laptop },
  { value: 'app', label: 'App', icon: Smartphone },
  { value: 'chatbot', label: 'Chatbot', icon: MessageSquare },
  { value: 'information', label: 'Info', icon: FileText }
];

export type Recipient = typeof RECIPIENTS[number]['value'];
export type ProblemType = typeof PROBLEM_TYPES[number]['value'];