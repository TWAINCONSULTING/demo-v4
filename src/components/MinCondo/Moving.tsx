import React, { useState } from 'react';
import { MoveInContent } from '../Moving/MoveInContent';
import { MoveOutContent } from '../Moving/MoveOutContent';
import { Home, LogOut } from 'lucide-react';

export function Moving() {
  const [selectedSection, setSelectedSection] = useState<'in' | 'out' | null>(null);

  const handleBack = () => {
    setSelectedSection(null);
  };

  if (selectedSection) {
    return (
      <div intro={{
        title: selectedSection === 'in' ? 'Flytte inn' : 'Flytte ut',
        description: ''
      }}>
        <div className="w-full sm:space-y-8 space-y-3">
          {selectedSection === 'in' ? 
            <MoveInContent onBack={handleBack} /> : 
            <MoveOutContent onBack={handleBack} />
          }
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 sm:gap-8 sm:gap-4 gap-2 p-2 w-full">
        {/* Button: Jeg har flyttet inn */}
        <button
          onClick={() => setSelectedSection('in')}
          className="flex flex-col items-center sm:gap-6 sm:p-8 p-6 rounded-xl bg-white border border-gray-200 hover:border-condo-dark hover:shadow-lg transition-all text-center group"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 bg-condo-dark rounded-full sm:group-hover:bg-condo-med transition-colors">
              <Home className="sm:h-8 sm:w-8 h-6 w-6 text-condo-light" />
            </div>
            <h2 className="sm:text-xl text-sm font-semibold text-center">Jeg har flyttet inn</h2>
          </div>
        </button>
    
        {/* Button: Jeg skal flytte ut */}
        <button
          onClick={() => setSelectedSection('out')}
          className="flex flex-col items-center sm:gap-6 gap-4 sm:p-8 p-6 rounded-xl bg-white border border-gray-200 hover:border-condo-yellow hover:shadow-lg transition-all text-center group"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 bg-yellow-4 rounded-full sm:group-hover:bg-condo-orange transition-colors">
              <LogOut className="sm:h-8 sm:w-8 h-6 w-6 text-orange-9 sm:group-hover:text-condo-yellow" />
            </div>
            <h2 className="sm:text-xl text-sm font-semibold text-center">Jeg skal flytte ut</h2>
          </div>
        </button>
      </div>
    </div>
  );
}