import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const allGroups = [
  { id: '1', name: 'Bokbytterne', members: 24 },
  { id: '2', name: 'Cageball-Nydalen', members: 18 },
  { id: '3', name: 'Søndagsyoga', members: 32 },
  { id: '4', name: 'Språkkafé', members: 15 },
  { id: '5', name: 'Nettverk for teknologientusiaster', members: 28 },
  { id: '6', name: 'Matlagingsentusiastene', members: 45 },
  { id: '7', name: 'Filmklubben', members: 22 },
  { id: '8', name: 'Stiklinger', members: 30 },
  { id: '9', name: 'Strikking og oppskrifter', members: 19 },
  { id: '10', name: 'Sykkelgruppa', members: 25 },
  { id: '11', name: 'Kunstverkstedet', members: 17 },
  { id: '12', name: 'Brettspillgjengen', members: 21 }
];

export function PopularGroups() {
  const [expanded, setExpanded] = useState(false);
  const displayedGroups = expanded ? allGroups : allGroups.slice(0, 7);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Populære grupper</h2>
        <div className="space-y-1">
          {displayedGroups.map(group => (
            <button
              key={group.id}
              className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-sm">{group.name}</span>
              <span className="text-xs text-gray-500 md:hidden lg:inline">
                {group.members}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-2 flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-gray-900"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Vis mindre
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Vis mer
            </>
          )}
        </button>
      </div>
    </div>
  );
}