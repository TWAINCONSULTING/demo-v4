// News items for the home page news feed
export const newsItems = [
  {
    title: 'Politiet etterforsker voldshendelse på Grønland',
    content: 'Politiet etterforsker en voldshendelse som skjedde på Grønland natt til søndag. En person er pågrepet og siktet for kroppsskade.',
    date: '08.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  },
  {
    title: 'Økt tilstedeværelse i Oslo sentrum',
    content: 'Politiet øker tilstedeværelsen i Oslo sentrum i forbindelse med påskeferien. Dette er et ledd i arbeidet med å forebygge kriminalitet og skape trygghet.',
    date: '07.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  },
  {
    title: 'Vellykket aksjon mot ulovlig scooterbruk',
    content: 'Politiet har gjennomført en større aksjon mot ulovlig bruk av elektriske sparkesykler i Oslo sentrum. Flere førere ble bøtelagt for brudd på trafikkreglene.',
    date: '06.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  },
  {
    title: 'Nye tiltak for å bekjempe ungdomskriminalitet',
    content: 'Oslo politidistrikt lanserer nye tiltak for å forebygge ungdomskriminalitet. Tiltakene inkluderer økt tilstedeværelse ved skoler og samarbeid med ungdomsklubber.',
    date: '06.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  },
  {
    title: 'Politiet advarer mot svindelforsøk',
    content: 'Det er observert en økning i svindelforsøk via telefon og SMS i Oslo-området. Politiet oppfordrer befolkningen til å være ekstra varsomme.',
    date: '05.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  },
  {
    title: 'Suksess med natteravnprosjekt',
    content: 'Politiet melder om positive resultater fra samarbeidet med natteravnene i Oslo sentrum. Antall ordensforstyrrelser har gått ned i områdene der natteravnene patruljerer.',
    date: '04.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  },
  {
    title: 'Nye politiposter i bydeler',
    content: 'Oslo politidistrikt åpner nye politiposter i flere bydeler for å styrke det lokale politiarbeidet og øke tilgjengeligheten for publikum.',
    date: '04.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  },
  {
    title: 'Vellykket innsats mot MC-kriminalitet',
    content: 'Politiet har gjennomført en større aksjon mot ulovlig MC-aktivitet i Oslo. Flere kjøretøy ble beslaglagt og flere personer er siktet.',
    date: '02.02.25',
    url: 'https://www.politiet.no/aktuelt-tall-og-fakta/nyhet/?utm_source=chatgpt.com'
  }
];

// Forum posts for the Naboen page
export const mockPosts = [
  {
    id: '1',
    title: 'Plantebytting i bakgården',
    content: 'Nå som våren er her, arrangerer vi plantebyttedag i bakgården. Ta med stiklinger og planter du vil bytte!',
    category: 'event',
    scope: 'building',
    authorId: 'board',
    authorName: 'Kari Nordmann',
    createdAt: '2025-02-02T10:00:00.000Z',
    likes: 12,
    comments: [],
    hasLiked: false,
    eventDate: '2025-03-23T00:00:00.000Z',
    eventTime: '11:00',
    images: []
  },
  {
    id: '2',
    title: 'Brukt sofa til salgs',
    content: 'Selger en 3-seter sofa i god stand. Pris kan diskuteres.',
    category: 'marketplace',
    scope: 'building',
    authorId: 'resident',
    authorName: 'Ole Hansen',
    createdAt: '2025-02-05T10:00:00.000Z',
    likes: 3,
    comments: [],
    hasLiked: false,
    marketplaceType: 'sell',
    images: []
  },
  {
    id: '3',
    title: 'Forslag til ny grillplass',
    content: 'Hva synes dere om å etablere en permanent grillplass i bakgården?',
    category: 'discussion',
    scope: 'building',
    authorId: 'resident',
    authorName: 'Per Jensen',
    createdAt: '2025-01-17T14:30:00.000Z',
    likes: 8,
    comments: [
      {
        id: '1',
        content: 'Veldig god idé! Jeg støtter dette.',
        authorName: 'Lisa Pedersen',
        createdAt: '2025-01-17T15:00:00.000Z',
        likes: 2,
        hasLiked: false
      }
    ],
    hasLiked: false,
    images: []
  }
];