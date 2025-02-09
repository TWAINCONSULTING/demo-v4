import React from 'react';
import { SectionIntro } from './SectionIntro';

interface PageWrapperProps {
  intro?: {
    title: string;
    description: string;
  };
  children: React.ReactNode;
}

export function PageWrapper({ intro, children }: PageWrapperProps) {
  return (
    <div className="relative">
      {intro && (
        <div className="lg:hidden">
          <SectionIntro {...intro} />
        </div>
      )}
      {children}
    </div>
  );
}