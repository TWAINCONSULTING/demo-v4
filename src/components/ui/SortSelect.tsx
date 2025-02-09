```typescript
import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

interface SortOption {
  value: string
  label: string
}

interface SortSelectProps {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SortSelect({
  options,
  value,
  onChange,
  className
}: SortSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'text-sm bg-white cursor-pointer',
          className
        )}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  )
}
```