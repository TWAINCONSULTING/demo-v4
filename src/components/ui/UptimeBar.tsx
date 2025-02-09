import React, { useState } from 'react';

interface UptimeBarProps {
  days: number;
  uptime: number;
}

export function UptimeBar({ days, uptime }: UptimeBarProps) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Generate array of days for the bar
  const daysArray = Array.from({ length: days }, (_, i) => ({
    id: i,
    isUp: true, // In a real app, this would come from actual uptime data
    problem: i === 5 ? 'Nettside' : i === 15 ? 'App' : null // Example problems
  }));

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{days} dager siden</span>
        <span>{uptime.toFixed(0)}%</span>
        <span>I dag</span>
      </div>
      <div className="relative">
        <div className="flex gap-px h-8">
          {daysArray.map((day) => (
            <div
              key={day.id}
              className={`
                flex-1 relative
                ${day.isUp ? 'bg-condo-med' : 'bg-condo-orange'}
                first:rounded-l-md last:rounded-r-md
                transition-all duration-200
                scale-y-125 z-10
                group
              `}
              //touch skjerm
              onTouchStart={() => setHoveredDay(day.id)}  // Trigger on touch start
              onTouchEnd={() => setHoveredDay(null)}     // Reset on touch end
              //lg skjerm
              onMouseEnter={() => setHoveredDay(day.id)}
              onMouseLeave={() => setHoveredDay(null)}
            />
          ))}
        </div>
        {/* Text below the bar, positioned to the right */}
        {hoveredDay !== null && (
          <div className="absolute right-0 mt-2">
            <div className="bg-white px-3 py-1 rounded-lg text-sm shadow-sm">
              {daysArray[hoveredDay].isUp 
                ? 'Ingen rapporterte problemer' 
                : `Problem: ${daysArray[hoveredDay].problem}`
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}