import type { DocumentGroup } from '../types/documents';

export const documentCategories: DocumentGroup[] = [
  {
    title: 'Dokumentasjon og sertifikasjoner',
    documents: [
      { id: 'samsvarserklaring', name: 'Samsvarserklæring elektrisk anlegg' },
      { id: 'brann', name: 'Brannsikkerhetsdokumentasjon' },
      { id: 'energi', name: 'Energimerking' },
      { id: 'fdv', name: 'FDV-dokumentasjon' }
    ]
  },
  {
    title: 'Vedlikehold og oppussing',
    documents: [
      { id: 'bad-rehab', name: 'Veileder for badoppussing' },
      { id: 'ventilasjon', name: 'Vedlikeholdsmanual ventilasjon' },
      { id: 'varme', name: 'Brukermanual varmeanlegg' }
    ]
  }
];

export const importantDocuments = [
  {
    title: 'Husordensregler',
    fileName: 'Husordensregler_for_Digitalgården.pdf'
  },
  {
    title: 'Vedtekter',
    fileName: 'Vedtekter_for_Digitalgården.pdf'
  },
  {
    title: 'Forsikringsavtale',
    fileName: 'Forsikringsavtale.pdf'
  }
];