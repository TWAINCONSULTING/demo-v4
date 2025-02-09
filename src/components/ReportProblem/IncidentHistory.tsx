import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';

const incidents = [
  {
    id: '1',
    type: 'Chatbot',
    description: 'Chatbot svarer ikke',
    status: 'Under behandling',
    date: '2025-01-15T15:30:00Z'
  },
  {
    id: '2',
    type: 'Nettside',
    description: 'Innloggingsproblemer',
    status: 'Løst',
    date: '2024-12-15T10:00:00Z'
  },
  {
    id: '3',
    type: 'Informasjon',
    description: 'Feil i kontaktinformasjon',
    status: 'Løst',
    date: '2024-12-15T09:15:00Z'
  },
  {
    id: '4',
    type: 'App',
    description: 'Problemer med pålogging i appen',
    status: 'Løst',
    date: '2024-10-25T14:20:00Z'
  },
  {
    id: '5',
    type: 'Nettside',
    description: 'Feil ved lasting av dokumenter',
    status: 'Løst',
    date: '2024-10-12T11:30:00Z'
  }
];

export function IncidentHistory() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleIncidents = isExpanded ? incidents : incidents.slice(0, 2);

  return (
    <Card>
      <div className="sm:p-6 p-3 sm:pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gray-50 rounded-lg sm:inline hidden">
            <History className="h-5 w-5 text-gray-600" />
          </div>
          <h2 className="sm:text-xl text-base font-semibold">Tidligere hendelser</h2>
        </div>

        <div className="sm:space-y-4 space-y-2">
          {visibleIncidents.map((incident) => (
            <div 
              key={incident.id}
              className="flex items-center justify-between sm:p-4 p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium">{incident.type}</div>
                <div className="text-sm text-gray-600">{incident.description}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  incident.status === 'Løst' 
                    ? 'text-condo-med'
                    : 'text-orange-10'
                }`}>
                  {incident.status}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(incident.date), {
                    addSuffix: true,
                    locale: nb
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {incidents.length > 4 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Vis mindre</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Vis mer</span>
              </>
            )}
          </button>
        )}
      </div>
    </Card>
  );
}