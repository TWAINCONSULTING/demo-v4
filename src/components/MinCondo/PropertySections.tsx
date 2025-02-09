import React from 'react';
import { Home, Ruler, Calendar, DollarSign, Clock, Tag, Building2, Hash, Building } from 'lucide-react';

export const commonSections = [
  {
    icon: Home,
    title: 'Leilighet',
    value: '507'
  },
  {
    icon: Ruler,
    title: 'Areal',
    value: 'BRA: 85 m²'
  },
  {
    icon: DollarSign,
    title: 'Felleskostnader',
    value: '3 850 kr/mnd'
  }
];

export const propertyDetails = [
  {
    icon: Hash,
    title: 'Seksjonsnr.',
    value: '97'
  },
  {
    icon: Calendar,
    title: 'Byggeår',
    value: '1899'
  },
  {
    icon: Clock,
    title: 'Eiertid',
    value: 'Siden mars 2020'
  }
];

export const ownerSections = [
  {
    icon: Building2,
    title: 'Leilighetsnr.',
    value: '97'
  },
  {
    icon: Building,
    title: 'Bofellesskap',
    value: 'Mitt Bofellesskap'
  },
  {
    icon: Tag,
    title: 'Siste kjøpspris',
    value: '4 850 000 kr'
  }
];