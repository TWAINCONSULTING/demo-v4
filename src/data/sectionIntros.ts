export const sectionIntros = {
  mittBofellesskap: {
    title: 'Mitt Bofellesskap',
    description: ''
  },
  bofellesskapet: {
    title: 'Bofellesskapet',
    description: ''
  },
  naboen: {
    title: 'Naboen',
    description: ''
  },
  minCondo: {
    title: 'Boligen',
    description: ''
  },
  praktiskInfo: {
    title: 'Praktisk Informasjon',
    description: ''
  },
  reservasjoner: {
    title: 'Reservasjoner',
    description: ''
  },
  flytting: {
    title: 'Flytting',
    description: ''
  },
  hjelpesenter: {
    title: 'Hjelpesenter',
    description: ''
  },
  produktutvikling: {
    title: 'Produktutvikling',
    description: ''
  },
  kontakt: {
    title: 'Meldinger',
    description: ''
  },
  husordensregler: {
    title: 'Husordensregler',
    description: ''
  },
  reportProblem: {
    title: 'Rapporter et problem',
    description: ''
  }
} as const;

export type SectionIntro = typeof sectionIntros[keyof typeof sectionIntros];