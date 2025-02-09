import type { PostType } from '../types/forum';

interface CategoryInfo {
  label: string;
  classes: string;
}

export const categoryLabels: Record<PostType, CategoryInfo> = {
  'discussion': { 
    label: 'Diskusjon', 
    classes: 'text-condo-light bg-dark-4 hover:bg-light-2 text-shadow-light' 
  },
  'marketplace': { 
    label: 'Markedsplass', 
    classes: 'text-condo-orange bg-yellow-2 hover:bg-amber-100 text-shadow-light'
  },
  'event': { 
    label: 'Arrangement', 
    classes: 'text-condo-dark bg-condo-light sm:hover:bg-light-2 text-shadow-glow'
  },
  'recommendations': { 
    label: 'Anbefaling', 
    classes: 'text-yellow-1 bg-condo-orange hover:bg-condo-orange text-shadow-light'
  }
};

export const scopeLabels = {
  'building': 'Digitalgården',
  'area': 'Området'
} as const;

export const sortOptions = [
  { value: 'date-desc', label: 'Nyeste først' },
  { value: 'date-asc', label: 'Eldste først' },
  { value: 'likes-desc', label: 'Mest likt' },
  { value: 'trending-desc', label: 'Trender nå' }
] as const;