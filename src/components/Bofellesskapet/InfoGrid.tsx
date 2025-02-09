import React, { useState } from 'react';
import { Building2, Shield, FileText, Users, Pencil } from 'lucide-react';
import { Card } from '../ui/Card';
import { useUserRole } from '../../hooks/useUserRole';
import { ContactCard } from './ContactCard';

interface SectionItem {
  label: string;
  value: string;
}

interface Section {
  title: string;
  icon: React.ElementType;
  items: SectionItem[];
}

const sections: Section[] = [
  {
    title: 'Selskapet',
    icon: Building2,
    items: [
      { label: 'Gårdsnummer', value: '215' },
      { label: 'Selskapsform', value: 'Borettslag' },
      { label: 'Organisasjonsnuxrmmer', value: '123 456 789' },
      { label: 'Selskapsnummer', value: 'BRL 789' }
    ]
  },
  {
    title: 'Styret',
    icon: Users,
    items: [
      { label: 'Styreleder', value: 'Kari Nordmann' },
      { label: 'Nestleder', value: 'Per Hansen' },
      { label: 'Styremedlem', value: 'Ole Jensen' },
      { label: 'Varamedlem', value: 'Lisa Pedersen' }
    ]
  },
  {
    title: 'Forsikring',
    icon: Shield,
    items: [
      { label: 'Forsikringsselskap', value: 'Gjensidige' },
      { label: 'Polisenummer', value: '98765432-1' },
      { label: 'Egenandel', value: '10,000 kr' },
      { label: 'Hovedforfall', value: '1. januar' }
    ]
  }
];

export function InfoGrid() {
  const { role } = useUserRole();
  const isBoard = role === 'board';
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const handleEdit = (title: string, items: SectionItem[]) => {
    const values: Record<string, string> = {};
    items.forEach(item => {
      values[item.label] = item.value;
    });
    setEditValues(values);
    setEditingSection(title);
  };

  const handleSave = (title: string) => {
    // Here you would typically save to your backend
    console.log('Saving changes for:', title, editValues);
    setEditingSection(null);
    setEditValues({});
  };

  return (
    <div className="grid sm:grid-cols-3 sm:gap-4 p-2 gap-2 grid-cols-2">
      {sections.map(({ title, icon: Icon, items }) => {
        const isEditing = editingSection === title;
        const canEdit = isBoard && (title === 'Styret' || title === 'Forsikring');

        return (
          <Card key={title} className="h-full">
            <div className="p-4">
              <div className="flex items-center justify-between sm:mb-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg sm:inline hidden">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <h2 className="sm:text-lg text-sm font-semibold ">{title}</h2>
                </div>
                {canEdit && (
                  <button
                    onClick={() => isEditing ? handleSave(title) : handleEdit(title, items)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-condo-dark"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {items.map(({ label, value }) => (
                  <div key={label}>
                    <div className="sm:text-sm text-xs text-gray-600">{label}</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editValues[label] || value}
                        onChange={(e) => setEditValues(prev => ({
                          ...prev,
                          [label]: e.target.value
                        }))}
                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-condo-dark font-medium"
                      />
                    ) : (
                      <div className="font-medium sm:text-base text-sm">{value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
        );
      })}
      <div className="sm:hidden sm:col-span-1">
        <ContactCard />
      </div>
    </div>
  );
}