import React from 'react';

interface SectionIntroProps {
  title: string;
  description: string;
}

export function SectionIntro({ title, description }: SectionIntroProps) {
  return (
    <div className="text-center lg:text-left sm:max-w-3xl sm:mx-auto sm:mb-2 lg:pl-14 mt-5 mb-3">
      <h1 className="text-2xl font-bold font-logo lg:hidden">{title}</h1>
    </div>
  );
}