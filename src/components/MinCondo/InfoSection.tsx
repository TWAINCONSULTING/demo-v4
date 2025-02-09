import React from 'react';
import type { LucideIcon } from 'lucide-react';


//Not being used el - gammel side? - erst. av propertyInfo?

interface InfoItemProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

export function InfoItem({ icon: Icon, title, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 bg-black">
      <div className="p-2 bg-blue-50 rounded-lg sm:inine hidden">
        <Icon className="h-3 w-3 sm:h-5 sm:w-5 text-blue-600 bg-black" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}