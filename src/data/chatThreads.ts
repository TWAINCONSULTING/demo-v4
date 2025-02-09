import type { ChatThread } from '../types/chat';

export const chatThreads: ChatThread[] = [
  {
    id: '1',
    subject: 'Spørsmål om parkering',
    date: '19. januar 2025',
    status: 'Besvart',
    messages: [
      {
        id: '1-1',
        content: 'Hei! Jeg lurer på om det er mulig å få en ekstra parkeringsplass?',
        author: 'Erik Larsen',
        isUser: true,
        timestamp: '2025-01-19T10:00:00Z'
      },
      {
        id: '1-2',
        content: 'Hei Erik! For øyeblikket har vi dessverre ingen ledige parkeringsplasser. Vi kan sette deg på venteliste om du ønsker det.',
        author: 'Kari Nordmann',
        role: 'Styret',
        isUser: false,
        timestamp: '2025-01-19T10:30:00Z'
      },
      {
        id: '1-3',
        content: 'Ja takk, det hadde vært fint å stå på venteliste.',
        author: 'Erik Larsen',
        isUser: true,
        timestamp: '2025-01-19T11:00:00Z'
      },
      {
        id: '1-4',
        content: 'Notert! Du er nå nummer 3 på ventelisten. Vi tar kontakt når det blir ledig plass.',
        author: 'Kari Nordmann',
        role: 'Styret',
        isUser: false,
        timestamp: '2025-01-19T11:15:00Z'
      }
    ]
  },
  {
    id: '2',
    subject: 'Vedlikehold av bad',
    date: '15. januar 2025',
    status: 'Under behandling',
    messages: [
      {
        id: '2-1',
        content: 'Jeg planlegger å pusse opp badet mitt. Hvilke retningslinjer må jeg følge?',
        author: 'Erik Larsen',
        isUser: true,
        timestamp: '2025-01-15T14:00:00Z'
      },
      {
        id: '2-2',
        content: 'Hei! Takk for henvendelsen. For oppussing av bad kreves det godkjenning fra styret og bruk av sertifiserte håndverkere. Jeg sender deg retningslinjene våre.',
        author: 'Per Hansen',
        role: 'Styret',
        isUser: false,
        timestamp: '2025-01-15T14:30:00Z'
      },
      {
        id: '2-3',
        content: 'Her er retningslinjene for baderomsrehabilitering. Les gjennom disse og send inn søknad med valgt entreprenør før arbeidet starter.',
        author: 'Per Hansen',
        role: 'Styret',
        isUser: false,
        timestamp: '2025-01-15T14:32:00Z'
      }
    ]
  }
];