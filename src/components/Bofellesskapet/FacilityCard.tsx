import React from 'react';
import { Card } from '../ui/Card';
import type { LucideIcon } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Pencil } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';


interface FacilityRule {
  label: string;
  value: string;
  link?: string;
  icon: LucideIcon;
  iconColor?: string;
}

interface FacilityCardProps {
  title: string;
  icon: LucideIcon;
  importantIcon?: LucideIcon;
  importantMessage?: string;
  rules: FacilityRule[];
  onImportantClick?: () => void;
  showMobileMessage?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  editValues?: Record<string, string>;
  onEditValueChange?: (label: string, value: string) => void;
}

export function FacilityCard({ 
  title, 
  icon: Icon, 
  importantIcon: ImportantIcon,
  importantMessage,
  rules,
  onImportantClick,
  showMobileMessage,
  isEditing,
  onEdit,
  editValues,
  onEditValueChange
}: FacilityCardProps) {
  const isSoppelhandtering = title === 'Søppelhåndtering';

  return (
    <Card>
      <div className="sm:p-6 p-3">
        <div className="flex items-center justify-between sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg sm:inline hidden">
              <Icon className="h-5 w-5 text-gray-600" />
            </div>
            <h2 className="sm:text-xl text-base font-semibold">{title}</h2>
          </div>
          <div className="flex items-center gap-2 ">
            {/* Edit button for non-Søppelhåndtering sections */}
            {!isSoppelhandtering && onEdit && (
              <button
                onClick={onEdit}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-condo-dark"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {ImportantIcon && importantMessage && (
              <>
                {/* Edit button for Søppelhåndtering - placed before important icon */}
                {isSoppelhandtering && onEdit && (
                  <button
                    onClick={onEdit}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-condo-dark"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
                {/* Desktop tooltip */}
                <div className="hidden lg:block">
                  <Tooltip content={importantMessage}>
                    <button className="p-2 hover:bg-condo-orange rounded-lg transition-colors group">
                      <ImportantIcon className="h-5 w-5 text-gray-600 group-hover:text-condo-yellow" />
                    </button>
                  </Tooltip>
                </div>
                {/* Mobile button */}
                <div className="lg:hidden">
                  <button 
                    onClick={onImportantClick}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <ImportantIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-600" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile message */}
        {showMobileMessage && importantMessage && (
          <div className="mb-4 p-3 bg-condo-orange text-black rounded-lg text-sm lg:hidden">
            {importantMessage}
          </div>
        )}

        {/* Rules list */}
        <div className="sm:space-y-3 space-y-2 px-4">
          {rules.map(({ label, value, link, icon: RuleIcon, iconColor }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b last:border-0 border-dark-1">
              <div className="flex items-center gap-2">
                <RuleIcon className={`h-4 w-4 ${iconColor || 'text-gray-400'}`} />
                <span className="text-gray-600 sm:text-base text-sm">{label}</span>
              </div>
              {isEditing && onEditValueChange ? (
                <input
                  type="text"
                  value={editValues?.[label] || value}
                  onChange={(e) => onEditValueChange(label, e.target.value)}
                  className="px-2 py-1 border rounded-md focus:ring-1 focus:outline-none focus:ring-condo-dark font-medium"
                />
              ) : link ? (
                  <Link to={link}>
                  <Button variant='condo' className="p-1 px-2">
                    {value}
                  </Button>
                </Link>
              ) : (
                <span className="font-medium sm:text-base text-sm">{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}