export const POST_CATEGORIES = {
  marketplace: [
    { value: 'furniture', label: 'Møbler og interiør' },
    { value: 'clothing', label: 'Klær og sko' },
    { value: 'art', label: 'Kunst og design' },
    { value: 'tech', label: 'Teknologi' },
    { value: 'hobby', label: 'Hobby og fritid' },
    { value: 'sports', label: 'Friluftsliv og sport' },
    { value: 'transport', label: 'Transport' },
    { value: 'other', label: 'Annet' }
  ],
  discussion: [
    { value: 'general', label: 'Generelt' },
    { value: 'maintenance', label: 'Vedlikehold' },
    { value: 'improvements', label: 'Oppgraderinger' },
    { value: 'security', label: 'Sikkerhet' },
    { value: 'environment', label: 'Miljø og energi' },
    { value: 'social', label: 'Sosialt' },
    { value: 'parking', label: 'Parkering' },
    { value: 'other', label: 'Annet' }
  ],
  event: [
    { value: 'social', label: 'Sosialt arrangement' },
    { value: 'dugnad', label: 'Dugnad' },
    { value: 'meeting', label: 'Møte' },
    { value: 'sports', label: 'Sport og aktivitet' },
    { value: 'culture', label: 'Kultur' },
    { value: 'children', label: 'Barn og familie' },
    { value: 'other', label: 'Annet' }
  ],
  recommendations: [
    { value: 'restaurants', label: 'Restauranter og kafeer' },
    { value: 'bars', label: 'Barer og uteliv' },
    { value: 'culture', label: 'Kultur og underholdning' },
    { value: 'shopping', label: 'Butikker og shopping' },
    { value: 'services', label: 'Tjenester og håndverkere' },
    { value: 'activities', label: 'Aktiviteter og trening' },
    { value: 'parks', label: 'Parker og friområder' },
    { value: 'transport', label: 'Transport og parkering' }
  ]
} as const;