import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Card } from '../ui/Card';

export function BoligmappaIntegration() {
  return (
    <Card>
      <div className="sm:p-6 p-3">
        <div className="flex items-center gap-3 sm:mb-6 mb-3">
          <div className="sm:p-2 p-1 bg-condo-dark rounded-lg sm:order-1 order-2">
            <Lightbulb className="sm:h-5 sm:w-5 h-4 w-4 text-condo-light" />
          </div>
          <h2 className="sm:text-xl text-base font-semibold sm:order-2 order-1">Boligmappa</h2>
        </div>

        <div className="bg-dark-1 rounded-lg sm:p-6 p-3">
          <p className="text-condo-dark sm:text-base text-sm">
            Vi jobber med å koble opp mot Boligmappa for enkel tilgang til boligens dokumentasjon. 
            Dette vil gi deg:
          </p>
          <ul className="mt-4 space-y-2 text-condo-dark text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <span className="sm:w-1.5 sm:h-1.5 h-1 w-1 bg-dark-4 rounded-full" />
              Automatisk import av all boligdokumentasjon
            </li>
            <li className="flex items-center gap-2">
              <span className="sm:w-1.5 sm:h-1.5 h-1 w-1 bg-dark-4 rounded-full" />
              Oversikt over utført vedlikehold og oppgraderinger
            </li>
            <li className="flex items-center gap-2">
              <span className="sm:w-1.5 sm:h-1.5 h-1 w-1 bg-dark-4 rounded-full" />
              Sertifikater og kontrollrapporter samlet på ett sted
            </li>
          </ul>
          <p className="mt-4 text-sm text-condo-dark">
            Integrasjonen vil være tilgjengelig i løpet av kort tid.
          </p>
        </div>
      </div>
    </Card>
  );
}