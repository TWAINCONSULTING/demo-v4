import React from 'react';
import { Users, Check, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEventStore } from '../../stores/useEventStore';

export function EventsSection() {
  const { events, toggleAttendance, isAttending } = useEventStore(state => ({
    events: state.events,
    toggleAttendance: state.toggleAttendance,
    isAttending: state.isAttending,
  }));

  // Sort events by date
  const allEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    date: new Date(event.date).getDate().toString().padStart(2, '0'),
    month: new Date(event.date).toLocaleString('no', { month: 'short' }).toUpperCase(),
    time: event.time,
    highlight: event.highlight,
    attendees: event.attendees || 0
  })).sort((a, b) => {
    const dateA = new Date(`${a.month} ${a.date}`);
    const dateB = new Date(`${b.month} ${b.date}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Only show first four events
  const visibleEvents = allEvents.slice(0, 4);

  const handleAttendance = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    toggleAttendance(eventId);
  };

  return (
    <div className="sm:rounded-xl sm:border-t sm:border sm:shadow-md">
      <div className="p-3 sm:p-6 pt-0 pb-0">
        <div className="flex items-center justify-between sm:p-0 p-2 pb-1 sm:pb-3">
          <h2 className="text-lg sm:text-xl font-semibold">Kommende hendelser</h2>
        </div>

        <div className="grid md:grid-cols-2 sm:gap-6">
          {visibleEvents.map((event, index) => (
            <div key={`${event.title}-${index}`} className="flex items-center gap-3 border-b last:border-0 sm:border-0 border-dark-1 py-1.5 sm:mx-0 mx-2 ">
              {/* Date box */}
              <div className={`
                flex-shrink-0 rounded-lg text-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] 
                flex flex-col items-center justify-center
                ${event.highlight 
                  ? 'bg-condo-light text-condo-dark' 
                  : 'bg-condo-dark text-condo-light'
                }
              `}>
                <div className="text-xs font-medium">{event.month}</div>
                <div className="text-base sm:text-2xl font-bold">{event.date}</div>
              </div>

              {/* Content and actions */}
              <div className="w-full flex flex-col min-w-0">
                {/* Mobile view */}
                <div className="sm:hidden flex flex-col gap-1 w-full">
                  {/* Title and attendees row */}
                  <div className="flex items-center justify-between mb-1">
                    <div className={`text-sm font-medium truncate flex-1 ${
                      event.highlight ? 'text-condo-med' : 'text-condo-dark'
                    }`}>
                      {event.title}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mr-2">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  {/* Time and action button row */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">{event.time}</div>
                    <button
                      onClick={(e) => handleAttendance(e, event.id)}
                      className={`
                        flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-colors text-xs
                        ${isAttending(event.id)
                          ? event.highlight
                            ? 'bg-condo-light text-condo-dark'
                            : 'bg-condo-dark text-condo-light'
                          : 'text-gray-500'
                        }
                      `}
                    >
                      {isAttending(event.id) ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Påmeldt</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          <span>Meld deg på</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Desktop view */}
                <div className="hidden sm:flex flex-col">
                  <div className={`text-base font-medium truncate ${
                    event.highlight ? 'text-condo-med' : 'text-gray-900'
                  }`}>
                    {event.title}
                  </div>
                  <div className="text-sm text-gray-500">{event.time}</div>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}</span>
                    </div>
                    <button
                      onClick={(e) => handleAttendance(e, event.id)}
                      className={`
                        flex items-center gap-1.5 text-xs transition-colors rounded-full px-2.5 py-1
                        ${isAttending(event.id)
                          ? 'text-condo-dark hover:text-condo-dark'
                          : 'text-condo-med hover:text-condo-dark'
                        }
                      `}
                    >
                      {isAttending(event.id) ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                      <span>{isAttending(event.id) ? 'Påmeldt' : 'Meld deg på'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-2 sm:mt-4">
          <Link 
            to="/naboen" 
            className="flex items-center gap-1 text-xs text-condo-dark hover:text-condo-med transition-colors"
          >
            <span>Finn flere arrangementer</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}