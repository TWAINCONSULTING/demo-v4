import React from 'react';
import { Card } from '../ui/Card';
import { Lightbulb } from 'lucide-react';

interface MovingPartnersProps {
  type: 'moveIn' | 'moveOut';
}

export function MovingPartners({ type }: MovingPartnersProps) {
  return (
    <Card>
      <div className="sm:p-6 p-3 flex flex-col h-full">
        <div className="flex items-center gap-3 sm:mb-6 mb-2">
          <div className="hidden sm:inline p-2 bg-condo-dark rounded-lg">
            <Lightbulb className="h-5 w-5 text-condo-light" />
          </div>
          <h2 className="sm:text-xl text-base font-semibold">Samarbeidspartnere</h2>
        </div>

        <div className="bg-dark-1 rounded-lg sm:p-6 p-3 mt-auto">
          <p className="text-condo-dark text-shadow-glow sm:text-base text-sm">
            Her vil du snart få tilgang til eksklusive rabatter og fordeler hos våre samarbeidspartnere.
          </p>
        </div>
      </div>
    </Card>
  );
}