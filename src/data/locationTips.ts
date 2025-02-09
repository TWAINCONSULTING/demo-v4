export interface LocationTip {
  label: string;
  value: string;
}

export const locationTips: LocationTip[] = [
  {
    label: 'Nærmeste dagligvare',
    value: 'Rema 1000',
    min: '2'
  },
  {
    label: 'Kollektivtransport',
    value: 'T-bane Majorstuen',
    min: '5'
  },
  {
    label: 'Apotek',
    value: 'Boots Apotek',
    min: '5'
  },
  {
    label: 'Post',
    value: 'Post i Butikk - Joker',
    min: '4'
  },
  {
    label: 'Treningssenter',
    value: 'SATS Majorstuen',
    min: '6'
  }
];