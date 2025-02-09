import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

export function EnergyInfo() {
  return (
    <Card className="w-full">
      <div className="sm:p-6 p-3">
        {/* Header */}
        <div className="flex items-center gap-3 sm:mb-6 mb-3">
          <div className="p-2 bg-condo-dark rounded-lg sm:inline hidden">
            <Zap className="h-5 w-5 text-condo-light" />
          </div>
          <h2 className="sm:text-xl text-base font-semibold">Strømforbruk</h2>
        </div>

        {/* Grid container */}
        <div className="grid grid-cols-7 gap-4">
          {/* Consumption Card */}
          <div className="bg-condo-yellow rounded-lg p-4 col-span-4 flex flex-col justify-evenly min-h-[140px]">
            <div className="text-xs text-gray-800 font-medium flex justify-center">
              Forbruk siste 30 dager
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-black flex justify-center">
              458 kWh
            </div>
            <div className="text-xs text-gray-600 flex justify-center">
              Estimert kost. 687 kr
            </div>
          </div>

          {/* Price History Card */}
          <div className="bg-condo-yellow rounded-lg py-4 col-span-3 flex flex-col min-h-[140px]
            justify-evenly">
            <div className="text-xs text-gray-800 font-medium flex justify-center">
              Strømprishistorikk
            </div>
             <div className="flex items-center justify-center gap-3">
              <TrendingUp className="h-5 w-5 text-orange-9" />
              <span className="text-xl sm:text-2xl font-semibold text-black">
                -12%
              </span>
            </div>
            <div className="text-xs text-gray-600 flex justify-center">
              vs. forrige uke
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}