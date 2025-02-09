import React, { useEffect } from 'react';
import { ScrollSection } from '../ui/ScrollSection';
import MinCondo from '../../pages/MinCondo';
import { useLocation } from 'react-router-dom';

export function MinBoligScroll() {
  const location = useLocation();

  return (
    <div className="space-y-8">
      <ScrollSection id="min-condo">
        <MinCondo />
      </ScrollSection>
    </div>
  );
}