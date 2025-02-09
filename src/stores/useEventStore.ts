import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  highlight?: boolean;
  createdAt?: string;
  attendees?: number;
}

interface EventStore {
  events: Event[];
  attending: string[];
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  isEventAdded: (id: string) => boolean;
  toggleAttendance: (id: string) => void;
  isAttending: (id: string) => boolean;
}

// Initial events including both hardcoded and forum events
const initialEvents: Event[] = [
  {
    id: 'styremote-1',
    title: 'Styremøte',
    date: '2025-03-01',
    time: '18:00 - 20:00',
    attendees: 5,
    highlight: false
  },
  {
    id: 'generalforsamling-1',
    title: 'Generalforsamling',
    date: '2025-03-21',
    time: '19:00 - 21:00',
    attendees: 25,
    highlight: false
  },
  {
    id: 'dugnad-1',
    title: 'Dugnad',
    date: '2025-05-10',
    time: '19:00 - 21:00',
    attendees: 42,
    highlight: false
  },
  {
    id: '2', // ID matching the forum post
    title: 'Plantebytting i bakgården',
    date: '2025-03-23',
    time: '11:00',
    createdAt: '2025-02-02T10:00:00.000Z',
    highlight: true,
    attendees: 12
  }
];

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: initialEvents,
      attending: [],
      addEvent: (event) => 
        set((state) => ({
          events: [...state.events, event]
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id)
        })),
      isEventAdded: (id) => 
        get().events.some((event) => event.id === id),
      toggleAttendance: (id) =>
        set((state) => {
          const isCurrentlyAttending = state.attending.includes(id);
          const newAttending = isCurrentlyAttending
            ? state.attending.filter(eventId => eventId !== id)
            : [...state.attending, id];
          
          // Update attendees count in events
          const updatedEvents = state.events.map(event => {
            if (event.id === id) {
              return {
                ...event,
                attendees: (event.attendees || 0) + (isCurrentlyAttending ? -1 : 1)
              };
            }
            return event;
          });

          return {
            attending: newAttending,
            events: updatedEvents
          };
        }),
      isAttending: (id) =>
        get().attending.includes(id)
    }),
    {
      name: 'event-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return {
            ...persistedState,
            events: initialEvents, // Reset to initial events
            attending: [] // Reset attendance
          };
        }
        return persistedState;
      }
    }
  )
);