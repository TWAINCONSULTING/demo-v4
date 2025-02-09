import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DurationSelectProps {
  duration: number;
  onDurationChange: (duration: number) => void;
  maxDuration: number;
}

export function DurationSelect({ duration, onDurationChange, maxDuration }: DurationSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Varighet (timer)
      </label>
      <div className="relative">
        <select
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="dropdown-button w-full appearance-none pl-3 pr-10 py-2 text-sm sm:text-base "
        >
          {Array.from({ length: maxDuration }, (_, i) => i + 1).map((hours) => (
            <option key={hours} value={hours} className="py-2 px-3">
              {hours} {hours === 1 ? 'time' : 'timer'}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}