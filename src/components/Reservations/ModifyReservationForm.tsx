import React, { useState } from 'react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Button } from '../ui/Button';
import { DateTimePicker } from './DateTimePicker';
import { DurationSelect } from './DurationSelect';
import type { Reservation, Facility } from '../../types/booking';

interface ModifyReservationFormProps {
  reservation: Reservation;
  facility: Facility;
  onSubmit: (data: { startTime: string; endTime: string }) => void;
  onCancel: () => void;
}

export function ModifyReservationForm({
  reservation,
  facility,
  onSubmit,
  onCancel
}: ModifyReservationFormProps) {
  const [date, setDate] = useState(new Date(reservation.startTime).toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date(reservation.startTime).toLocaleTimeString('no', { hour: '2-digit', minute: '2-digit' }));
  const [duration, setDuration] = useState(reservation.duration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startTime = new Date(`${date}T${time}`).toISOString();
    const endTime = new Date(`${date}T${time}`);
    endTime.setHours(endTime.getHours() + duration);

    onSubmit({
      startTime,
      endTime: endTime.toISOString()
    });
  };

  // Calculate new end time for comparison
  const newStartTime = new Date(`${date}T${time}`);
  const newEndTime = new Date(newStartTime);
  newEndTime.setHours(newEndTime.getHours() + duration);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DateTimePicker
        date={date}
        time={time}
        onDateChange={setDate}
        onTimeChange={setTime}
      />

      <DurationSelect
        duration={duration}
        onDurationChange={setDuration}
        maxDuration={facility.maxDuration}
      />

      {/* Reservation comparison */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3 flex flex-col">
        <div>
          <div className="text-sm text-gray-500 mb-1">Opprinnelig reservasjon:</div>
          <div className="font-medium flex flex-row justify-between">
            <div>
              {format(new Date(reservation.startTime), 'd. MMMM yyyy', { locale: nb })}
            </div>
            <div>
              {format(new Date(reservation.startTime), 'HH:mm')} - {format(new Date(reservation.endTime), 'HH:mm')}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="text-sm text-gray-500 mb-1">Endret reservasjon:</div>
          <div className="font-medium text-condo-dark flex flex-row justify-between">
            <div>
               {format(newStartTime, 'd. MMMM yyyy', { locale: nb })}
            </div>
            <div>
              {format(newStartTime, 'HH:mm')} - {format(newEndTime, 'HH:mm')}

            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Avbryt
        </Button>
        <Button type="submit" className="flex-1">
          Lagre endringer
        </Button>
      </div>
    </form>
  );
}