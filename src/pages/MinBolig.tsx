import React from 'react';
import MinCondo from './MinCondo';
import { PageWrapper } from '../components/ui/PageWrapper';
import { sectionIntros } from '../data/sectionIntros';

export default function MinBolig() {
  return (
    <PageWrapper intro={sectionIntros.minCondo}>
      <MinCondo />
    </PageWrapper>
  );
}