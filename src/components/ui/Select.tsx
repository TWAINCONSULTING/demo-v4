import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export function Select({ 
  label, 
  value, 
  onChange, 
  options, 
  className = '' 
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "dropdown-button w-full appearance-none",
            "pl-3 pr-10 py-2 bg-white",
            "border border-gray-300 rounded-lg",
            "focus:border-condo-dark focus:ring-1 focus:ring-condo-dark focus:outline-none",
            "cursor-pointer transition-colors text-sm",
            className
          )}
        >
          {options.map(option => (
            <option 
              key={option.value} 
              value={option.value}
              className="py-2 px-3 hover:bg-dark-1 hover:text-condo-dark"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}