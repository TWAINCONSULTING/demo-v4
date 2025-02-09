import React from 'react';
import { Building2, Wrench, Users } from 'lucide-react';

export type RecipientType = 'board' | 'maintenance' | 'resident';

interface RecipientSelectProps {
  value: string | null;
  onChange: (value: RecipientType | null) => void;
}

const recipients = [
  {
    value: 'board',
    label: 'Styret',
    icon: Building2
  },
  {
    value: 'maintenance',
    label: 'Vaktmester',
    icon: Wrench
  },
  {
    value: 'resident',
    label: 'Nabo',
    icon: Users
  }
] as const;

export function RecipientSelect({ value, onChange }: RecipientSelectProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 grid-cols-3 gap-4">
        {recipients.map((recipient) => {
          const Icon = recipient.icon;
          const isSelected = value === recipient.value;
          
          return (
            <button
              key={recipient.value}
              type="button"
              onClick={() => onChange(isSelected ? null : recipient.value)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-lg border transition-all text-left
                ${isSelected 
                  ? 'border-condo-dark bg-base-white' 
                  : 'border-gray-200 hover:border-condo-med hover:bg-gray-50'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg
                ${isSelected ? 'bg-condo-dark' : 'bg-gray-100'}
              `}>
                <Icon className={`
                  h-5 w-5
                  ${isSelected ? 'text-condo-light' : 'text-gray-600'}
                `} />
              </div>
              <span className="sm:font-medium text-sm">{recipient.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}