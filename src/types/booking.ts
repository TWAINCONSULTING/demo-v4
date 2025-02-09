export interface FacilityRule {
  label: string;
  value: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  maxDuration: number;
  availableUnits: number;
  rules: FacilityRule[];
}

export type ReservationStatus = 'ongoing' | 'upcoming' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  facilityId: string;
  facilityName: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: ReservationStatus;
}