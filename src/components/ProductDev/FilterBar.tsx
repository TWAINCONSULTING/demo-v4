import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onNewFeature: () => void;
}

const filters = [
  { value: 'all', label: 'Alle' },
  { value: 'popular', label: 'Populære' },
  { value: 'launched', label: 'Lansert' },
  { value: 'coming', label: 'Kommer' }
];

export function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  selectedFilter, 
  onFilterChange,
  onNewFeature 
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full p-3 pt-0 sm:p-0 pb-1">
      <div className="flex flex-col sm:flex-row gap-2 flex-1">
        {/* Search input - wider on sm screens */}
        <div className="relative h-full flex-1 mb-1 sm:mb-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Søk etter forslag..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-sm border border-gray-300"
          />
        </div>

        {/* Filter buttons - adjusted for sm screens */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
          {filters.map(filter => (
            <Button
              key={filter.value}
              variant="filter"
              onClick={() => onFilterChange(filter.value)}
              className={`
                flex-1 sm:flex-none whitespace-nowrap px-3 py-1.5 text-sm
                ${selectedFilter === filter.value 
                  ? 'bg-condo-dark border-condo-med text-condo-light ' 
                  : ''
                }
                sm:min-w-[90px]
              `}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <div className="my-2 sm:my-0">
          <Button 
            onClick={onNewFeature}
            variant="primary"
            className="flex items-center gap-2 text-sm w-full sm:w-auto whitespace-nowrap border hover:!border-condo-dark hover:!text-condo-dark hover:!bg-dark-3 "
          >
          <Plus className="h-4 w-4" />
          Send inn forslag
        </Button>
      </div>
      </div>
    </div>
  );
}