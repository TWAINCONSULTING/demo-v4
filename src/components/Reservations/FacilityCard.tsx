import React from 'react';
import { Car, Waves, Bike, Utensils, Info } from 'lucide-react';
import type { Facility } from '../../types/booking';
import { Tooltip } from '../ui/Tooltip';

//not used???

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
                ? 'border-blue-500 bg-blue-50' 
                : 'bg-white border-gray-100 hover:border-blue-500 hover:shadow-sm'
              }
            `}
          >
            <div className={`
              p-2 rounded-lg transition-colors
              ${isSelected
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-50 text-gray-600'
              }
            `}>
              {Icon && <Icon size={20} />}
            </div>
            <span className="text-sm font-medium text-center text-gray-900">
              {facility.name}
            </span>
          </button>
        );
      })}
    </>
  );
}