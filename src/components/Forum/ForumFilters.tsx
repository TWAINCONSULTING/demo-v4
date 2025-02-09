import React, { useState, useEffect } from 'react';
import { 
  Filter, Plus, Bell, X, 
  Hash, Building2,
  ArrowDownUp, ArrowDownUp as Sort
} from 'lucide-react';
import type { ForumFilter } from '../../types/forum';
import { Tooltip } from '../ui/Tooltip';
import { Button } from '../ui/Button';

interface ForumFiltersProps {
  filters: ForumFilter;
  onFilterChange: (filters: ForumFilter) => void;
  onNewPost: () => void;
}

export function ForumFilters({ filters, onFilterChange, onNewPost }: ForumFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Mobile Filters Dialog Component
  const MobileFiltersDialog = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header - Fixed at top */}
        <div className="sticky top-0 bg-white border-b px-4 py-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Sort className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Filtrer og sorter</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Categories */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="h-5 w-5 text-condo-dark" />
                <h3 className="font-medium">Kategorier</h3>
              </div>
              <div className="space-y-2">
                {[
                  { value: '', label: 'Alle kategorier' },
                  { value: 'marketplace', label: 'Markedsplass' },
                  { value: 'discussion', label: 'Diskusjon' },
                  { value: 'event', label: 'Arrangement' },
                  { value: 'recommendations', label: 'Anbefalinger' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      onFilterChange({ ...filters, category: value as any });
                    }}
                    className={`
                      w-full flex items-center gap-8 p-3 rounded-lg transition-colors text-left
                      ${filters.category === value || (value === '' && !filters.category)
                        ? 'bg-condo-light text-condo-dark' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-condo-dark" />
                <h3 className="font-medium">Område</h3>
              </div>
              <div className="space-y-2">
                {[
                  { value: '', label: 'Alle områder' },
                  { value: 'building', label: 'Digitalgården' },
                  { value: 'area', label: 'Området' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      onFilterChange({ ...filters, scope: value as any });
                    }}
                    className={`
                      w-full flex items-center gap-2 p-3 rounded-lg transition-colors text-left
                      ${filters.scope === value
                        ? 'bg-condo-light text-condo-dark' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Sort className="h-5 w-5 text-condo-dark" />
                <h3 className="font-medium">Sortering</h3>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'trending-desc', label: 'Trender nå' },
                  { value: 'date-desc', label: 'Nyeste først' },
                  { value: 'date-asc', label: 'Eldste først' },
                  { value: 'likes-desc', label: 'Mest likt' },
                  { value: 'likes-asc', label: 'Minst likt' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      const [sortBy, sortOrder] = value.split('-');
                      onFilterChange({ 
                        ...filters, 
                        sortBy: sortBy as any,
                        sortOrder: sortOrder as any
                      });
                    }}
                    className={`
                      w-full flex items-center gap-2 p-3 rounded-lg transition-colors text-left
                      ${`${filters.sortBy}-${filters.sortOrder}` === value
                        ? 'bg-condo-light text-condo-dark' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="sticky bottom-0 p-4 bg-white border-t">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-condo-light text-condo-dark rounded-lg font-medium"
          >
            Bruk filter
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex sm:items-center sm:justify-between flex-col sm:flex-row w-full p-2 py-2 sm:py-0">
      {/* Mobile view: All buttons in a grid */}
      <div className="grid grid-cols-3 gap-2 w-full sm:hidden">
        {/* New Post Button */}
        <Button
          onClick={onNewPost}
          className="flex items-center justify-center gap-1 px-4 py-1.5 bg-condo-light text-condo-dark hover:bg-condo-med rounded-lg 
          text-sm font-medium shadow-[0_1px_2px_0_rgba(0,87,80,0.05)] border border-condo-med"
        >
          <Plus className="h-4 w-4" />
          <span>Ny post</span>
        </Button>

        {/* Sort dropdown */}
        <div className="relative flex items-center">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <ArrowDownUp className="h-4 w-4 text-condo-dark" />
          </div>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            style={{ backgroundImage: 'none' }}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              onFilterChange({ 
                ...filters, 
                sortBy: sortBy as any,
                sortOrder: sortOrder as any
              });
            }}
            className="w-full h-full pl-7 py-2 appearance-none rounded-lg text-sm
              bg-condo-light border-none text-condo-dark text-center 
              flex items-center justify-center"
          >
            <option value="date-desc">Nyeste</option>
            <option value="date-asc">Eldste</option>
            <option value="likes-desc">Mest likt</option>
            <option value="likes-asc">Minst likt</option>
          </select>
        </div>

        {/* Filter button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg
            bg-condo-light border-none text-condo-dark"
        >            
          <Filter className="h-4 w-4" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex w-full items-center justify-between">
        {/* Left side: New Post Button */}
        <Button
          onClick={onNewPost}
          variant="forum"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium shadow-[0_1px_2px_0_rgba(0,87,80,0.05)]"
        >
          <Plus className="h-4 w-4" />
          <span>Ny post</span>
        </Button>

        {/* Right side: Filters and Sort */}
        <div className="flex items-center justify-center gap-3">
          {/* Categories */}
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              category: e.target.value as any
            })}
            className="min-w-[150px] appearance-none text-sm py-2 pl-3 pr-10 border-none rounded-lg bg-light-3 text-condo-dark text-left"
          >
            <option value="">Alle kategorier</option>
            <option value="marketplace">Markedsplass</option>
            <option value="discussion">Diskusjon</option>
            <option value="event">Arrangement</option>
            <option value="recommendations">Anbefalinger</option>
          </select>

          {/* Scope */}
          <select
            value={filters.scope || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              scope: e.target.value as any
            })}
            className="min-w-[140px] appearance-none text-sm py-2 pl-3 pr-10 rounded-lg border-none bg-light-3 text-condo-dark text-left"
          >
            <option value="">Alle områder</option>
            <option value="building">Digitalgården</option>
            <option value="area">Området</option>
          </select>

          {/* Sort */}
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              onFilterChange({ 
                ...filters, 
                sortBy: sortBy as any,
                sortOrder: sortOrder as any
              });
            }}
            className="min-w-[140px] appearance-none text-sm py-2 pl-3 pr-10 rounded-lg border-none bg-light-3 text-condo-dark text-left"
          >
            <option value="trending-desc">Trender nå</option>
            <option value="date-desc">Nyeste først</option>
            <option value="date-asc">Eldste først</option>
            <option value="likes-desc">Mest likt</option>
            <option value="likes-asc">Minst likt</option>
          </select>

          <Tooltip content="Muligheten for å opprette og redigere varsler vil bli tilgjengelig.">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-gray-400" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Filters Dialog */}
      {showMobileFilters && (
        <MobileFiltersDialog onClose={() => setShowMobileFilters(false)} />
      )}
    </div>
  );
}