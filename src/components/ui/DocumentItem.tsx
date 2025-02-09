import React from 'react';
import { cn } from '../../utils/cn';
import { DocumentLink } from './documents/DocumentLink';

interface DocumentItemProps {
  id: string;
  name: string;
  link: string;
  className?: string;
  actions?: React.ReactNode;
}

export function DocumentItem({ id, name, link, className, actions }: DocumentItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full p-2 rounded-lg border border-base-light1 lg:hover:border-condo-med lg:hover:bg-gray-50 active:bg-gray-100 lg:active:bg-transparent transition-all group",
        className
      )}
    >
      <DocumentLink 
        name={name}
        link={link}
        isImportant={false}
      />
      {actions}
    </div>
  );
}