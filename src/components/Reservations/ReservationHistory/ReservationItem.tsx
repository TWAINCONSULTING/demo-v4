import React from 'react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { StatusBadge } from './StatusBadge';
import type { Reservation } from '../../../types/booking';

interface ReservationItemProps {
  reservation: Reservation;
  onClick: (id: string) => void;
}

export function ReservationItem({ reservation, onClick }: ReservationItemProps) {
  const startDate = new Date(reservation.startTime);
  const endDate = new Date(reservation.endTime);
  const isOngoing = reservation.status === 'ongoing';

  return (
    <button
      onClick={() => onClick(reservation.id)}
      className={`
        relative w-full sm:p-4 p-3 bg-white rounded-lg border transition-all text-left
        ${isOngoing ? 'border-condo-med bg-base-white shadow-md' : 'border-gray-200'}
        hover:border-condo-med
      `}
    >
      <div className="flex flex-col gap-1">
        {/* Top row with facility name and status */}
        <div className="flex items-center justify-between w-full">
          <div className="sm:text-base text-sm font-medium">{reservation.facilityName}</div>
          <StatusBadge status={reservation.status} />
        </div>

        {/* Bottom row with date and time */}
        <div className="flex items-center justify-between w-full text-gray-500 sm:text-sm">
          
          <div className="text-sm">
            {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
          </div>
          <div className="text-xs">
            {format(startDate, 'd. MMMM yyyy', { locale: nb })}
          </div>
        </div>
      </div>
    </button>
  );
}