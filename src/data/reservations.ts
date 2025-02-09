import { Reservation } from '../types/booking';

export const reservations: Reservation[] = [
  // Upcoming reservations
  {
    id: '1',
    facilityId: 'guest-parking',
    facilityName: 'Gjesteparkering',
    startTime: '2025-02-25T14:00:00Z',
    endTime: '2025-02-25T16:00:00Z',
    duration: 2,
    status: 'upcoming'
  },
  {
    id: '2',
    facilityId: 'garden-table-1',
    facilityName: 'Hagebord',
    startTime: '2025-05-17T12:00:00Z',
    endTime: '2025-05-17T20:00:00Z',
    duration: 8,
    status: 'upcoming'
  },
  
  // Completed reservations
  {
    id: '3',
    facilityId: 'guest-parking',
    facilityName: 'Gjesteparkering',
    startTime: '2024-12-19T12:00:00Z',
    endTime: '2024-12-19T15:00:00Z',
    duration: 3,
    status: 'completed'
  },
  {
    id: '4',
    facilityId: 'washing-machine',
    facilityName: 'Vaskemaskin',
    startTime: '2024-12-18T09:00:00Z',
    endTime: '2024-12-18T12:00:00Z',
    duration: 3,
    status: 'completed'
  },
  {
    id: '5',
    facilityId: 'garden-table-1',
    facilityName: 'Hagebord',
    startTime: '2024-09-17T16:00:00Z',
    endTime: '2024-09-17T20:00:00Z',
    duration: 4,
    status: 'completed'
  },
  {
    id: '6',
    facilityId: 'washing-machine',
    facilityName: 'Vaskemaskin',
    startTime: '2024-09-16T13:00:00Z',
    endTime: '2024-09-16T16:00:00Z',
    duration: 3,
    status: 'completed'
  },
  {
    id: '7',
    facilityId: 'guest-parking',
    facilityName: 'Gjesteparkering',
    startTime: '2024-08-15T10:00:00Z',
    endTime: '2024-08-15T14:00:00Z',
    duration: 4,
    status: 'completed'
  },
  {
    id: '8',
    facilityId: 'garden-table-1',
    facilityName: 'Hagebord',
    startTime: '2024-07-14T17:00:00Z',
    endTime: '2024-07-14T21:00:00Z',
    duration: 4,
    status: 'completed'
  }
];