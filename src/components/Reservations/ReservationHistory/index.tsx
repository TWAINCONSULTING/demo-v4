import React, { useState } from 'react';
import { ListChecks, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Card } from '../../ui/Card';
import { ReservationItem } from './ReservationItem';
import { ReservationActionDialog } from '../ReservationActionDialog';
import { reservations } from '../../../data/reservations';
import { facilities } from '../../../data/facilities';
import { Tooltip } from '../../ui/Tooltip';

interface ReservationHistoryProps {
  maxVisible?: number;
}

export function ReservationHistory({ maxVisible = 6 }: ReservationHistoryProps) {
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (id: string) => {
    setSelectedReservation(id);
  };

  const handleModify = (id: string, data: { startTime: string; endTime: string }) => {
    console.log('Save modification:', { id, ...data });
    setSelectedReservation(null);
  };

  const handleReport = (id: string, data: { description: string; images: File[] }) => {
    console.log('Report issue:', { id, ...data });
    setSelectedReservation(null);
  };

  // Sort reservations by date, newest first
  const sortedReservations = [...reservations].sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  const visibleReservations = isExpanded 
    ? sortedReservations 
    : sortedReservations.slice(0, maxVisible);

  const activeReservation = selectedReservation 
    ? reservations.find(r => r.id === selectedReservation)
    : null;
  
  const facility = activeReservation
    ? facilities.find(f => f.id === activeReservation.facilityId)
    : null;

  return (
    <Card>
      <div className="sm:p-6 p-3 flex flex-col">
        <div className="flex items-center justify-between sm:mb-6 mb-3">
          <div className="flex items-center gap-2">
            <ListChecks className="sm:h-5 sm:w-5 h-4 w-4 text-gray-600" />
            <h2 className="sm:text-lg text-base font-semibold">Mine reservasjoner</h2>
          </div>
          <Tooltip content="Her kan beboerne se sine kommende og tidligere reservasjoner. De kan også endre reservasjonene eller rapportere eventuelle problemer ved å klikke på dem.">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 cursor-help" />
          </Tooltip>
        </div>

        <div className="sm:space-y-4 space-y-2">
          {visibleReservations.map(reservation => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onClick={handleClick}
            />
          ))}
        </div>

        {sortedReservations.length > maxVisible && (
          <div className="sm:mt-6 mt-4 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 sm:text-sm text-xs text-gray-600 hover:text-gray-900"
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

      {activeReservation && facility && (
        <ReservationActionDialog
          reservation={activeReservation}
          facility={facility}
          onClose={() => setSelectedReservation(null)}
          onModify={handleModify}
          onReport={handleReport}
        />
      )}
    </Card>
  );
}