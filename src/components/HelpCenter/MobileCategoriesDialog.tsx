
import React from 'react';
import { X } from 'lucide-react';
import { helpCategories } from '../../data/helpCategories';

interface MobileCategoriesDialogProps {
  selectedCategories: string[];
  onSelectCategory: (categoryId: string) => void;
  onClose: () => void;
}

export function MobileCategoriesDialog({ 
  selectedCategories, 
  onSelectCategory, 
  onClose 
}: MobileCategoriesDialogProps) {
  return (
    <div className="fixed -top-4 inset-0 bg-white z-50 flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Kategorier</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Categories list - centered vertically */}
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <div className="min-h-full w-full flex items-center">
          <div className="w-full py-0 pl-0 pr-4 max-w-md">
            {helpCategories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSelectCategory(id)}
                className={`
                  w-full flex items-center p-3 m-2 rounded-lg transition-colors text-left
                  ${selectedCategories.includes(id)
                    ? 'bg-dark-1 border border-condo-dark text-condo-dark' 
                    : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                  }
                `}
              > 
                <div className="w-full flex flex-row items-center gap-3">
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{label}</span>
                </div>
                {selectedCategories.includes(id) && (
                  <div>
                    <X className="h-4 w-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button 
        onClick={onClose}
        className="w-full flex flex-col sticky bg-condo-dark text-condo-light block p-6 items-center text-lg font-medium bottom-0">
        Velg
      </button>
    </div>
  );
}