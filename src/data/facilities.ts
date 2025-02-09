import { Facility } from '../types/booking';

export const facilities: Facility[] = [
  {
    id: 'guest-parking',
    name: 'Gjesteparkering',
    description: 'For besøkende',
    maxDuration: 48,
    availableUnits: 5,
    rules: [
      { label: 'Gratis periode', value: 'Første 2 timer' },
      { label: 'Timespris', value: '25 kr' },
      { label: 'Maks varighet', value: '48 timer' }
    ]
  },
  {
    id: 'washing-machine',
    name: 'Vaskemaskin',
    description: 'Fellesvaskeri',
    maxDuration: 3,
    availableUnits: 3,
    rules: [
      { label: 'Pris per vask', value: '20 kr' },
      { label: 'Maks varighet', value: '3 timer' },
      { label: 'Åpningstid', value: '07:00-22:00' }
    ]
  },
  {
    id: 'garden-table-1',
    name: 'Hagebord',
    description: '8 personer',
    maxDuration: 12,
    availableUnits: 1,
    rules: [
      { label: 'Maks varighet', value: '12 timer' },
      { label: 'Grilling', value: 'Tillatt, engangsgrill er forbudt' },
      { label: 'Rydding', value: 'Må ryddes etter bruk' }
    ]
  }
];