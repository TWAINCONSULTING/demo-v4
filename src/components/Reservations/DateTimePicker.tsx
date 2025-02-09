import React from 'react';

interface DateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  minDate?: string;
  maxDate?: string;
}

export function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate = new Date().toISOString().split('T')[0],
  maxDate
}: DateTimePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Dato
        </label>
        <input
          type="date"
          value={date}
          min={minDate}
          max={maxDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-condo-dark focus:ring-1 focus:ring-condo-med"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tidspunkt
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-condo-dark focus:ring-1 focus:ring-condo-med"
        />
      </div>
    </div>
  );
}