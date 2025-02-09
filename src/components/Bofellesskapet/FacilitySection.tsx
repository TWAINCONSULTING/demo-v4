import React, { useState } from 'react';
import { 
  Trash2, Car, AlertTriangle, 
  Newspaper, Wine, Apple,
  Car as CarIcon, Clock, Tag, Coins,
  Pencil
} from 'lucide-react';
import { FacilityCard } from './FacilityCard';
import { HistoryCard } from './HistoryCard';
import { Tooltip } from '../ui/Tooltip';
import { useUserRole } from '../../hooks/useUserRole';

interface FacilityRule {
  label: string;
  value: string;
  icon: React.ElementType;
  iconColor?: string;
}

interface Facility {
  title: string;
  icon: React.ElementType;
  importantIcon?: React.ElementType;
  importantMessage?: string;
  rules: FacilityRule[];
}

const facilities: Facility[] = [
  {
    title: 'Søppelhåndtering',
    icon: Trash2,
    importantIcon: AlertTriangle,
    importantMessage: 'Her vil det bli presentert viktig informasjon om søppelhåndtering, tilpasset de ulike bofellesskapene.',
    rules: [
      { 
        label: 'Restavfall', 
        value: 'Grå container',
        icon: Trash2,
        iconColor: 'text-gray-600'
      },
      { 
        label: 'Papp/papir', 
        value: 'Blå container',
        icon: Newspaper,
        iconColor: 'text-blue-600'
      },
      { 
        label: 'Glass/metall', 
        value: 'Grønn container',
        icon: Wine,
        iconColor: 'text-green-600'
      },
      { 
        label: 'Matavfall', 
        value: 'Brun container',
        icon: Apple,
        iconColor: 'text-amber-600'
      }
    ]
  },
  {
    title: 'Parkering',
    icon: Car,
    rules: [
      { 
        label: 'Timespris', 
        value: '25 kr',
        icon: Coins
      },
      { 
        label: 'Gratis periode', 
        value: 'Første 2 timer',
        icon: Tag
      },
      { 
        label: 'Faste plasser', 
        value: 'Tildeles av styret',
        icon: CarIcon
      },
      { 
        label: 'Gjesteparkering', 
        value: 'Reserver', 
        link: '/reservasjoner',
        icon: Clock
      }
    ]
  }
];

export function FacilitySection() {
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const { role } = useUserRole();
  const isBoard = role === 'board';
  const [editingFacility, setEditingFacility] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  return (
    <div className="grid lg:grid-cols-2 sm:gap-4 gap-2">
      {facilities.map(facility => (
        <FacilityCard 
          key={facility.title} 
          {...facility} 
          onImportantClick={() => setShowMobileMessage(!showMobileMessage)}
          showMobileMessage={showMobileMessage}
          isEditing={editingFacility === facility.title}
          onEdit={isBoard ? () => {
            if (editingFacility === facility.title) {
              // Save changes
              console.log('Saving changes for:', facility.title, editValues);
              setEditingFacility(null);
              setEditValues({});
            } else {
              // Start editing
              const values: Record<string, string> = {};
              facility.rules.forEach(rule => {
                values[rule.label] = rule.value;
              });
              setEditValues(values);
              setEditingFacility(facility.title);
            }
          } : undefined}
          editValues={editValues}
          onEditValueChange={(label, value) => {
            setEditValues(prev => ({
              ...prev,
              [label]: value
            }));
          }}
        />
      ))}
    </div>
  );
}