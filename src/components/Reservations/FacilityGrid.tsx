import React from 'react';
import { Car, Waves, Bike, Utensils } from 'lucide-react';
import type { Facility } from '../../types/booking';

const facilityIcons = {
  'guest-parking': Car,
  'washing-machine': Waves,
  'e-bike': Bike,
  'garden-table-1': Utensils,
  'garden-table-2': Utensils,
} as const;

interface FacilityGridProps {
  facilities: Facility[];
  onSelect: (facilityId: string) => void;
  selectedFacilityId: string | null;
}

export function FacilityGrid({ facilities, onSelect, selectedFacilityId }: FacilityGridProps) {
  return (
    <>
      {facilities.map((facility) => {
        const Icon = facilityIcons[facility.id as keyof typeof facilityIcons];
        const isSelected = facility.id === selectedFacilityId;
        
        return (
          <button
            key={facility.id}
            onClick={() => onSelect(facility.id)}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-lg border transition-all text-left
              ${isSelected 
                ? 'border-condo-dark bg-base-white' 
                : 'bg-white border-gray-100 hover:border-condo-med hover:shadow-sm'
              }
            `}
          >
            <div className={`
              p-2 rounded-lg transition-colors
              ${isSelected
                ? 'bg-condo-dark text-light-2'
                : 'bg-gray-50 text-gray-600'
              }
            `}>
              {Icon && <Icon size={20} />}
            </div>
            <span className="sm:text-sm text-xs font-medium text-center text-gray-900">
              {facility.name}
            </span>
          </button>
        );
      })}
    </>
  );
}