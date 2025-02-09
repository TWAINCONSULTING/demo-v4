import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

export function BoardMessage({ pinnedMessage }: { pinnedMessage: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  if (!pinnedMessage) {
    return <div>Loading...</div>; // Show loading state if the pinned message is not yet available
  }

  return (
    <div className="bg-base-white border border-condo-dark/50 rounded-lg sm:rounded-xl shadow-md flex flex-col">
      <div className="p-4 sm:p-6 flex-1">
        <div className="flex items-start gap-3 mb-3 sm:mb-4">
          <div className="hidden sm:flex p-2 bg-condo-dark rounded-lg mt-2">
            <AlertCircle className="h-5 w-5 text-condo-light" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xs sm:text-lg font-medium text-gray-900">Melding fra styret</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs sm:text-sm font-medium bg-condo-dark text-condo-light rounded-full">
                  Viktig
                </span>
                <Tooltip content={
                  <div className="whitespace-pre-line">
                    Styret kan enkelt feste viktige beskjeder alle beboerne bør se.
                    {'\n\n'}
                    Meldingen velger du fra 'Sist Nytt' seksjonen under. Trykk pin-ikonet for å feste.
                  </div>
                }>
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
                </Tooltip>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span>{pinnedMessage.date}</span>
            </div>
          </div>
        </div>

        <div className={`relative ${!isExpanded && needsExpansion ? 'max-h-[7em] overflow-hidden' : ''}`}>
          <div className="text-sm sm:text-base text-gray-900">
            <strong className="block mb-2">{pinnedMessage.title}</strong>
            <div>{pinnedMessage.content}</div>
          </div>
          {!isExpanded && needsExpansion && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-base-white to-transparent" />
          )}
        </div>

        <div className="flex sm:hidden justify-end mt-2">
          <div className="text-[10px] text-gray-500">
            {pinnedMessage.date}
          </div>
        </div>
      </div>

      {needsExpansion && (
        <div className="p-2 border-t border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-gray-900"
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
        </div>
      )}
    </div>
  );
}
