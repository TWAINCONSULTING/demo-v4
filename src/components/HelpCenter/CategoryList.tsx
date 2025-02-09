import React from 'react';
import { helpCategories } from '../../data/helpCategories';
import { X } from 'lucide-react';

interface CategoryListProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryList({ selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="space-y-1">
      {helpCategories.map(({ id, label, icon: Icon }) => {
        const isSelected = selectedCategory === id;
        
        return (
          <button
            key={id}
            onClick={() => onSelectCategory(isSelected ? null : id)}
            className={`
              w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-left group
              ${isSelected
                ? 'bg-dark-1 text-condo-dark border border-condo-dark'
                : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{label}</span>
            </div>
            {isSelected && (
              <X 
                className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCategory(null);
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}