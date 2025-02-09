import React, { useState } from 'react';
import { Clock, Tag, DollarSign, Clock3, Trash2, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DateTimePicker } from './DateTimePicker';
import { DurationSelect } from './DurationSelect';
import { FacilityGrid } from './FacilityGrid';
import { ReminderDialog } from './ReminderDialog';
import { Tooltip } from '../ui/Tooltip';
import type { Facility } from '../../types/booking';

interface ReservationFormProps {
  facility: Facility;
  facilities: Facility[];
  onFacilityChange: (facilityId: string) => void;
  showForm: boolean;
  onShowForm: () => void;
}

export function ReservationForm({ 
  facility, 
  facilities, 
  onFacilityChange,
  showForm,
  onShowForm
}: ReservationFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('12:00');
  const [duration, setDuration] = useState(1);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Calculate end time
  const startTime = `${date}T${time}`;
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + duration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReminderDialog(true);
  };

  const handleShowForm = () => {
    onShowForm();
    setTimeout(() => setIsFormVisible(true), 50);
  };

  const handleFacilityChange = (facilityId: string) => {
    setIsFormVisible(false);
    setTimeout(() => {
      onFacilityChange(facilityId);
      setIsFormVisible(false);
    }, 300);
  };

  return (
    <Card>
      <div className="sm:p-6 p-3">
        <div className="flex items-center justify-between sm:mb-6 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600 sm:inline hidden" />
            <h2 className="sm:text-xl text-base font-semibold">Reserver</h2>
          </div>
          <Tooltip content="Her kan styret velge hvilke fasiliteter som kan reserveres, og hvilke regler som gjelder for de ulike fasilitetene.">
            <Info className="sm:h-5 sm:w-5 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
          </Tooltip>
        </div>

        <div className="sm:space-y-8 space-y-3">
          {/* Facility selection */}
          <div className="grid grid-cols-3 gap-3">
            <FacilityGrid 
              facilities={facilities}
              onSelect={handleFacilityChange}
              selectedFacilityId={facility.id}
            />
          </div>

          {/* Facility rules */}
          <div className="sm:bg-gray-50 bg-dark-1 sm:rounded-xl sm:p-6 p-4 rounded-md">
            <h3 className="sm:text-base text-sm font-medium text-gray-900 sm:mb-4 mb-2">
              Regler for {facility.name.toLowerCase()}
            </h3>
            {facility.rules.map(({ label, value }) => {
              const Icon = {
                'Gratis periode': Tag,
                'Timespris': DollarSign,
                'Pris per vask': DollarSign,
                'Maks varighet': Clock,
                'Åpningstid': Clock3,
                'Grilling tillatt': Tag,
                'Rydding': Trash2
              }[label] || Tag;
              
              return (
                <div key={label} className="flex items-center justify-between sm:py-3 py-2 first:pt-0 last:pb-0 border-b last:border-0 border-dark-3 sm:text-base text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-700" />
                    <span className="text-gray-600">{label}</span>
                  </div>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              );
            })}
          </div>

          {/* Reserve button */}
          {!showForm && (
            <Button onClick={handleShowForm} className="w-full sm:text-base text-sm">
              Reserver en tid
            </Button>
          )}

          {/* Reservation form */}
          {showForm && (
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isFormVisible ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <form onSubmit={handleSubmit} className="sm:space-y-6 space-y-3 sm:text-base text-sm">
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

                <Button type="submit" className="w-full">
                  Reserver
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      {showReminderDialog && (
        <ReminderDialog
          reservation={{
            facilityName: facility.name,
            startTime: startTime,
            endTime: endTime.toISOString()
          }}
          onClose={() => setShowReminderDialog(false)}
          onSubmit={() => {}}
        />
      )}
    </Card>
  );
}