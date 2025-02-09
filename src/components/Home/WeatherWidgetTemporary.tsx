import React from 'react';
import { Sun, Wind, Cloud } from 'lucide-react';

export function WeatherWidget() {
  return (
    <div className="bg-white rounded-xl border-t border-b border shadow-md mx-4 sm:mx-0">
      <div className="p-4 sm:p-6 bg-gradient-to-br from-condo-med to-condo-light text-black rounded-xl">
        <h2 className="text-condo-dark sm:text-xl font-semibold mb-4 text-shadow-glow">Været i bakgården</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-condo-dark">
            <Sun className="h-10 w-10 sm:h-12 sm:w-12" />
            <div>
              <div className="text-lg text-condo-dark sm:text-3xl font-bold text-shadow-glow">-6°</div>
              <div className="text-condo-dark text-sm text-shadow-glow">Delvis skyet</div>
            </div>
          </div>
          <div className="text-right text-sm text-condo-dark px-2 text-shadow-glow">
            <div className="flex items-center gap-1 mb-1">
              <Wind className="h-4 w-4" /> 3 m/s
            </div>
            <div className="flex items-center gap-1">
              <Cloud className="h-4 w-4" /> 40%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}