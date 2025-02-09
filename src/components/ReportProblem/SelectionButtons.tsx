import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Building2, Users } from 'lucide-react';

interface SelectionButtonsProps {
  label: string;
  options: Array<{
    value: string;
    label: string;
    icon?: LucideIcon;
  }>;
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'problem';
}

const recipientIcons: Record<string, LucideIcon> = {
  'condo': Building2
};

export function SelectionButtons({ 
  label, 
  options, 
  value, 
  onChange,
  variant = 'default'
}: SelectionButtonsProps) {
  return (
    <div className="sm:space-y-2 space-y-1">
      <label className="block sm:text-sm text-xs font-medium text-gray-700">
        {label}
      </label>
      <div className={`grid ${variant === 'problem' ? 'grid-cols-4' : 'grid-cols-2'} sm:gap-3 gap-2`}>
        {options.map((option) => {
          const Icon = option.icon || recipientIcons[option.value];
          const isSelected = value === option.value;
          const isRecipient = option.value === 'condo';
          
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                flex flex-col items-center gap-3 sm:p-4 py-2 rounded-lg border transition-all text-left sm:text-base text-sm
                ${isSelected 
                  ? 'border-condo-dark bg-base-white text-condo-dark' 
                  : 'border-gray-200 hover:border-condo-med hover:bg-gray-50'
                }
              `}
            >
            <div
              className={`
                p-2 rounded-lg
                ${isSelected
                  ? 'bg-condo-dark' // chosenIconBgColor
                  : 'bg-dark-1' // notChosenIcon-bgColor
                }
              `}
            >
              <Icon
                className={`
                  h-5 w-5 
                  ${isSelected
                    ? 'text-condo-light' // chosenIcon
                    : 'text-condo-dark' // notChosenIcon
                  }
                `}
              />
            </div>
              <span className="font-medium text-center">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}