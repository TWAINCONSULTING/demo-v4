import type { LucideIcon } from 'lucide-react';
import { MessageSquare, ShoppingBag, MapPin, Calendar } from 'lucide-react';

export interface ForumFeature {
  value: 'discussion' | 'marketplace' | 'recommendations' | 'event';
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const FORUM_FEATURES = [
  { 
    value: 'discussion', 
    label: 'Diskusjon',
    icon: MessageSquare,
    color: 'bg-condo-med sm:hover:bg-dark-3 text-shadow-soft text-light-2',
    introColor: 'border-3 border-condo-dark bg-dark-2 text-condo-dark hover:text-light-2',
    description: 'Start en diskusjon med naboene dine om alt fra vedlikehold til sosiale arrangementer.'
  },
  { 
    value: 'event', 
    label: 'Arrangement',
    icon: Calendar,
    color: 'text-condo-dark bg-condo-light sm:hover:bg-light-2 text-shadow-glow',
    introColor: 'border-3 border-condo-med bg-light-2 text-condo-dark',
    description: 'Del arrangementer og aktiviteter med naboene, fra dugnader til sosiale sammenkomster.'
  },
  { 
    value: 'marketplace', 
    label: 'Markedsplass',
    icon: ShoppingBag,
    color: 'text-orange-9 bg-yellow-3 hover:bg-amber-100 text-shadow-light',
    introColor: 'border-3 border-condo-yellow bg-yellow-1 text-condo-dark hover:text-orange-8',
    description: 'Kjøp, selg eller gi bort ting til naboene dine. En enkel måte å dele ressurser på.'
  },
  { 
    value: 'recommendations', 
    label: 'Anbefalinger',
    icon: MapPin,
    color: 'text-yellow-3 bg-condo-orange hover:bg-condo-orange text-shadow-soft',
    introColor: 'border-3 border-orange-8 bg-yellow-2 text-condo-dark hover:text-orange-8',
    description: 'Del dine beste tips om restauranter, butikker og tjenester i nærområdet.'
  }
] as const;

export const getFeatureByValue = (value: ForumFeature['value']) => {
  return FORUM_FEATURES.find(feature => feature.value === value);
};
