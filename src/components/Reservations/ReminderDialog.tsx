import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DateTimePicker } from './DateTimePicker';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

interface ReminderDialogProps {
  reservation: {
    facilityName: string;
    startTime: string;
    endTime: string;
  };
  onClose: () => void;
  onSubmit: (data: { 
    reminderTime: number; 
    channels: string[];
    customDate?: string;
    customTime?: string;
  }) => void;
}

const notificationChannels = [
  { id: 'push', label: 'Push-varsel' },
  { id: 'sms', label: 'SMS' },
  { id: 'email', label: 'E-post' }
];

export function ReminderDialog({ reservation, onClose, onSubmit }: ReminderDialogProps) {
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [reminderTime, setReminderTime] = useState(30);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['push']);
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');

  const handleNoReminder = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      reminderTime,
      channels: selectedChannels,
      ...(useCustomTime && customDate && customTime ? {
        customDate,
        customTime
      } : {})
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <div className="flex items-center justify-between sm:p-6 p-3 border-b">
          <div className="flex items-center sm:gap-3">
            <CheckCircle className="h-6 w-6 text-condo-med sm:inline hidden" />
            <h2 className="sm:text-xl text-base font-semibold">Reservasjonen din er bekreftet</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 sm:inline hidden" />
          </button>
        </div>

        <div className="sm:p-6 p-4 sm:space-y-6 space-y-3">
          <div className="bg-base-white rounded-xl p-4">
            <div className="font-medium mb-1">{reservation.facilityName}</div>
            <div className="text-sm text-gray-600">
              {format(new Date(reservation.startTime), 'd. MMMM yyyy', { locale: nb })}
              {' • '}
              {format(new Date(reservation.startTime), 'HH:mm')} - {format(new Date(reservation.endTime), 'HH:mm')}
            </div>
          </div>

          {!showReminderOptions ? (
            <div className="sm:space-y-6 space-y-3">
              <div className="bg-dark-1 rounded-xl p-4 text-center">
                <p className="text-condo-dark font-medium">
                  Ønsker du en påminnelse for reservasjonen?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleNoReminder}>
                  Nei takk
                </Button>
                <Button onClick={() => setShowReminderOptions(true)}>
                  Ja, gjerne
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  {[
                    { value: 10, label: '10 minutter' },
                    { value: 30, label: '30 minutter' },
                    { value: 60, label: '1 time' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setReminderTime(option.value);
                        setUseCustomTime(false);
                      }}
                      className={`
                        w-full px-3 py-2 text-sm rounded-lg border transition-colors text-center
                        ${!useCustomTime && reminderTime === option.value
                          ? 'border-condo-dark bg-dark-1 text-condo-dark font-medium'
                          : 'border-gray-200 hover:border-dark-1'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {[
                    { value: 1440, label: '24 timer' },
                    { value: 2880, label: '48 timer' },
                    { value: 'custom', label: 'Velg tidspunkt' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        if (option.value === 'custom') {
                          setUseCustomTime(true);
                        } else {
                          setReminderTime(option.value as number);
                          setUseCustomTime(false);
                        }
                      }}
                      className={`
                        w-full px-3 py-2 text-sm rounded-lg border transition-colors text-center
                        ${(option.value === 'custom' ? useCustomTime : !useCustomTime && reminderTime === option.value)
                          ? 'border-condo-dark bg-dark-1 text-condo-dark font-medium'
                          : 'border-gray-200 hover:border-condo-med'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {useCustomTime && (
                <DateTimePicker
                  date={customDate}
                  time={customTime}
                  onDateChange={setCustomDate}
                  onTimeChange={setCustomTime}
                />
              )}

              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">
                  Varsling via
                </div>
                <div className="grid grid-cols-3 w-full gap-2">
                  {notificationChannels.map(channel => (
                    <label
                      key={channel.id}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer w-full
                        ${selectedChannels.includes(channel.id)
                          ? 'border-condo-dark bg-dark-1 text-condo-dark'
                          : 'border-gray-200 hover:border-condo-med'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(channel.id)}
                        onChange={(e) => {
                          setSelectedChannels(prev =>
                            e.target.checked
                              ? [...prev, channel.id]
                              : prev.filter(id => id !== channel.id)
                          );
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-condo-dark focus:ring-0 focus:ring-0 focus:ring-condo-dark checked:bg-condo-dark checked:hover:bg-condo-dark checked:focus:bg-condo-dark"
                        style={{ backgroundColor: 'condo-dark !important' }}
                      />
                      <span className="text-xs">{channel.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Avbryt
                </Button>
                <Button type="submit" className="flex-1">
                  Lagre
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}