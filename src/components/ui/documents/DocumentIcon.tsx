import React from 'react';
import { FileText } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface DocumentIconProps {
  isImportant: boolean;
  className?: string;
}

export function DocumentIcon({ isImportant, className }: DocumentIconProps) {
  return (
    <FileText 
      className={cn(
        "h-5 w-5",
        isImportant ? "text-dark-3" : "text-condo-dark group-hover:text-condo-dark",
        className
      )} 
    />
  );
}