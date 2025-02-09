import type { Feature } from '../types/features';

export const features: Feature[] = [
  {
    id: '1',
    title: 'BankID og Vipps',
    description: 'Integrer BankID og Vipps for enklere innlogging og betaling av felleskostnader.',
    status: 'KOMMER',
    votes: 24,
    hasVoted: false,
    comments: [
      {
        id: '1-1',
        content: 'Dette vil gjøre betalingsprosessen mye enklere!',
        authorName: 'Ingrid Bakken',
        createdAt: '2024-03-19T15:30:00Z',
        likes: 8,
        hasLiked: false
      },
      {
        id: '1-2',
        content: 'Veldig bra forslag. Vipps er jo noe alle bruker.',
        authorName: 'Magnus Solberg',
        createdAt: '2024-03-19T16:00:00Z',
        likes: 5,
        hasLiked: true
      }
    ],
    createdAt: '2024-09-12T15:30:00Z',
    author: {
      name: 'Markus Mosand',
      role: 'Condo'
    }
  },
  {
    id: '2',
    title: 'Boligmappa integrasjon',
    description: 'Automatisk synkronisering av dokumentasjon med Boligmappa for enkel tilgang til all boligdokumentasjon.',
    status: 'UNDER_VURDERING',
    votes: 15,
    hasVoted: true,
    comments: [
      {
        id: '2-1',
        content: 'Smart løsning for å holde oversikt over dokumentasjonen.',
        authorName: 'Henrik Berntsen',
        createdAt: '2024-02-27T14:00:00Z',
        likes: 4,
        hasLiked: false
      }
    ],
    createdAt: '2024-11-19T14:00:00Z',
    author: {
      name: 'Erik Larsen',
      role: 'Bruker'
    }
  },
  {
    id: '3',
    title: 'Vedlikeholdspåminnelser',
    description: 'Automatiske påminnelser om vedlikehold basert på boligens alder og tidligere utført arbeid.',
    status: 'PRODUKSJON',
    votes: 18,
    hasVoted: false,
    comments: [],
    createdAt: '2025-01-18T13:00:00Z',
    author: {
      name: 'Mats Mosand',
      role: 'Condo'
    }
  }
];