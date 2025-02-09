```typescript
import React from 'react'
import { Filter as FilterIcon, X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../utils/cn'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  filters: Record<string, FilterOption[]>
  selectedFilters: Record<string, string[]>
  onFilterChange: (key: string, values: string[]) => void
  onReset: () => void
  className?: string
}

export function FilterBar({
  filters,
  selectedFilters,
  onFilterChange,
  onReset,
  className
}: FilterBarProps) {
  const hasActiveFilters = Object.values(selectedFilters).some(values => values.length > 0)

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-gray-400" />
          <span className="font-medium">Filtrer</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-gray-500"
          >
            <X className="h-4 w-4 mr-1" />
            Nullstill
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, options]) => (
          <div key={key} className="relative group">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const dropdown = document.getElementById(`dropdown-${key}`)
                if (dropdown) {
                  dropdown.classList.toggle('hidden')
                }
              }}
              className={cn(
                selectedFilters[key]?.length ? 'border-blue-500 text-blue-600' : ''
              )}
            >
              {key}
              {selectedFilters[key]?.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                  {selectedFilters[key].length}
                </span>
              )}
            </Button>

            <div
              id={`dropdown-${key}`}
              className="hidden absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
            >
              {options.map(option => (
                <label
                  key={option.value}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters[key]?.includes(option.value)}
                    onChange={(e) => {
                      const values = selectedFilters[key] || []
                      if (e.target.checked) {
                        onFilterChange(key, [...values, option.value])
                      } else {
                        onFilterChange(key, values.filter(v => v !== option.value))
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```