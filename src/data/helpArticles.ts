export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
}

export const helpArticles: HelpArticle[] = [
  // Condo articles
  {
    id: 'condo-what',
    title: 'Hva er Condo?',
    content: 'Condo er en digital plattform for borettslag og sameier som forenkler kommunikasjon, dokumenthåndtering og daglig drift. Plattformen er skreddersydd for ditt bofellesskap.',
    category: 'condo'
  },
  {
    id: 'condo-features',
    title: 'Hvilke funksjoner har Condo?',
    content: 'Condo tilbyr en rekke funksjoner som dokumentarkiv, booking av fellesarealer, meldingssystem, digital oppslagstavle, og chatbot for rask hjelp. Alt er samlet på ett sted for enkel tilgang.',
    category: 'condo'
  },

  // Chatbot articles
  {
    id: 'chatbot-how',
    title: 'Hvordan fungerer chatboten deres?',
    content: 'Chatboten vår heter Styris, og er trent på dokumenter og regler som er spesifikke for ditt bofellesskap. I tillegg er den utstyrt med kunnskap om typiske utfordringer og problemstillinger som oppstår i bofellesskap, som for eksempel vedlikehold, felleskostnader og håndtering av nabokonflikter. Dette gjør den i stand til å gi raske og relevante svar basert på oppdatert informasjon.',
    category: 'chatbot'
  },
  {
    id: 'chatbot-documents',
    title: 'Kan chatboten hjelpe meg med å finne informasjon i dokumentene våre?',
    content: 'Ja, chatboten kan hjelpe deg med å finne informasjon i bofellesskapets dokumenter. Du kan stille konkrete spørsmål som: "Hva er reglene for å leie ut en leilighet?", eller "Hvordan fordeles vedlikeholdskostnadene?" Chatboten vil søke i dokumentene for å gi deg det mest relevante svaret. Dersom spørsmålet ditt krever manuell oppfølging, kan chatboten også henvise deg til riktig kontaktperson.',
    category: 'chatbot'
  },

  // Rules articles
  {
    id: 'rules-noise',
    title: 'Hva er reglene for støy?',
    content: 'Det skal være ro mellom kl. 23:00 og 07:00 på hverdager, og mellom kl. 23:00 og 09:00 i helger. Oppussing og støyende arbeid er tillatt mellom kl. 08:00 og 20:00 på hverdager, og mellom kl. 10:00 og 18:00 på lørdager.',
    category: 'rules'
  },
  {
    id: 'rules-pets',
    title: 'Er det lov å ha kjæledyr?',
    content: 'Ja, det er tillatt å ha kjæledyr så lenge de ikke er til sjenanse for andre beboere. Eiere er ansvarlige for å plukke opp etter dyrene sine og holde dem i bånd på fellesområdene.',
    category: 'rules'
  },

  // Maintenance articles
  {
    id: 'maintenance-report',
    title: 'Hvordan melder jeg fra om vedlikeholdsbehov?',
    content: 'Vedlikeholdsbehov meldes inn via "Rapporter et problem" i menyen. Beskriv problemet så detaljert som mulig. Ved akutte problemer, kontakt vaktmester direkte.',
    category: 'maintenance'
  },
  {
    id: 'maintenance-responsibility',
    title: 'Hva er mitt ansvar som beboer?',
    content: 'Som beboer er du ansvarlig for innvendig vedlikehold av egen leilighet, inkludert rør, kraner, og elektriske kontakter. Fellesarealer og bygningens ytre vedlikeholdes av borettslaget.',
    category: 'maintenance'
  },

  // Parking articles
  {
    id: 'parking-guest',
    title: 'Hvordan fungerer gjesteparkering?',
    content: 'Gjesteparkering registreres via appen. De første 2 timene er gratis, deretter koster det 25 kr per time. Maksimal parkeringstid er 48 timer.',
    category: 'parking'
  },
  {
    id: 'parking-electric',
    title: 'Finnes det lademuligheter for elbil?',
    content: 'Ja, det er installert ladestasjoner i garasjen. Kontakt styret for å få tildelt ladeplass. Lading betales per kWh via app.',
    category: 'parking'
  },

  // Payments articles
  {
    id: 'payments-monthly',
    title: 'Når forfaller felleskostnadene?',
    content: 'Felleskostnader forfaller den 1. i hver måned. Det anbefales å opprette AvtaleGiro for automatisk betaling.',
    category: 'payments'
  },
  {
    id: 'payments-increase',
    title: 'Hvordan varsles endringer i felleskostnader?',
    content: 'Endringer i felleskostnader varsles minst én måned før endringen trer i kraft. Varsel sendes via e-post og legges ut i Condo.',
    category: 'payments'
  },

  // Waste articles
  {
    id: 'waste-sorting',
    title: 'Hvordan skal søppel sorteres?',
    content: 'Vi har fire containere: Grå for restavfall, blå for papp/papir, grønn for glass/metall, og brun for matavfall. Alt avfall må sorteres korrekt.',
    category: 'waste'
  },
  {
    id: 'waste-large',
    title: 'Hvor kan jeg kaste større gjenstander?',
    content: 'Større gjenstander må leveres til nærmeste gjenvinningsstasjon. Det er ikke tillatt å sette fra seg møbler eller andre store gjenstander i søppelrommet.',
    category: 'waste'
  },

  // Moving articles
  {
    id: 'moving-checklist',
    title: 'Hva må jeg huske på når jeg flytter ut?',
    content: 'Ved utflytting må du: 1) Bestille flyttevask, 2) Levere alle nøkler til styret, 3) Melde adresseendring, 4) Lese av strøm, 5) Overlevere parkeringsbrikke/portåpner.',
    category: 'moving'
  },
  {
    id: 'moving-cleaning',
    title: 'Hvilke krav stilles til flyttevask?',
    content: 'Leiligheten skal være grundig rengjort ved utflytting. Dette inkluderer vinduspuss, rengjøring av bad/kjøkken, og vask av alle overflater. Det anbefales å bruke profesjonelt flyttebyrå.',
    category: 'moving'
  },

  // Neighbors articles
  {
    id: 'neighbors-groups',
    title: 'Hvilke beboergrupper finnes?',
    content: 'Vi har flere aktive beboergrupper som hagegruppen, treningsgruppen og hobbygruppen. Du kan se alle grupper og melde deg inn via "Naboen" i menyen.',
    category: 'neighbors'
  },
  {
    id: 'neighbors-events',
    title: 'Hvordan arrangeres sosiale sammenkomster?',
    content: 'Sosiale arrangementer kan foreslås og organiseres via "Naboen". Her kan du også se kommende arrangementer og melde deg på.',
    category: 'neighbors'
  },

  // Digital access articles
  {
    id: 'digital-login',
    title: 'Hvordan logger jeg inn første gang?',
    content: 'Du vil motta en e-post med innloggingsinformasjon når du registreres som ny beboer. Følg lenken i e-posten for å aktivere kontoen din.',
    category: 'digital'
  },
  {
    id: 'digital-app',
    title: 'Hvor finner jeg appen?',
    content: 'Appen kan lastes ned gratis fra App Store eller Google Play. Søk etter "Condo" og logg inn med samme bruker som på nettsiden.',
    category: 'digital'
  },

  // Security articles
  {
    id: 'security-camera',
    title: 'Har vi kameraovervåking?',
    content: 'Det er installert kameraer ved hovedinngang, i garasjen og ved søppelrom. Opptakene lagres i 7 dager og er kun tilgjengelig for styret ved hendelser.',
    category: 'security'
  },
  {
    id: 'security-doors',
    title: 'Hvordan fungerer adgangskontroll?',
    content: 'Alle dører er utstyrt med elektronisk adgangskontroll. Brikker programmeres av styret og kan enkelt sperres ved tap. Meld fra umiddelbart hvis du mister brikken din.',
    category: 'security'
  },

  // Contact articles
  {
    id: 'contact-board',
    title: 'Hvordan kontakter jeg styret?',
    content: 'Styret kan kontaktes via meldingsfunksjonen i Condo, eller på e-post: styret@digitalgarden.no. For akutte henvendelser, ring vakttelefon: 987 65 432.',
    category: 'contact'
  },
  {
    id: 'contact-caretaker',
    title: 'Når er vaktmester tilgjengelig?',
    content: 'Vaktmester er tilgjengelig mandag til fredag kl. 08:00-16:00. For akutte hendelser utenom arbeidstid, ring vakttelefonen.',
    category: 'contact'
  }
];