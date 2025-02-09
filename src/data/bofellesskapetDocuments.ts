import type { DocumentGroup } from '../types/documents';

export const documentCategories: DocumentGroup[] = [
  {
    title: 'Årsrapporter og økonomi',
    documents: [
      { id: 'arsrapport-2024', name: 'Årsrapport 2024' },
      { id: 'budsjett-2024', name: 'Budsjett 2024' },
      { id: 'regnskap-2023', name: 'Regnskap 2023' },
      { id: 'langsiktig-budsjett', name: 'Langsiktig budsjettplan 2024-2026' }
    ]
  },
  {
    title: 'Vedlikehold og oppgraderinger',
    documents: [
      { id: 'vedlikeholdsplan-2024', name: 'Vedlikeholdsplan 2024' },
      { id: 'tilstandsrapport-2023', name: 'Tilstandsrapport 2023' },
      { id: 'oppgraderingsplan', name: 'Oppgraderingsplan 2024-2025' }
    ]
  },
  {
    title: 'Styredokumenter',
    documents: [
      { id: 'styrevedtak-2024', name: 'Styrevedtak 2024' },
      { id: 'styreinstruks', name: 'Styreinstruks' },
      { id: 'fullmakter', name: 'Fullmaktsmatrise' }
    ]
  }
];