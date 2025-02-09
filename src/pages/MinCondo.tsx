import React from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { PropertyInfo } from '../components/MinCondo/PropertyInfo';
import { Boligmappa } from '../components/MinCondo/Boligmappa';
import { EnergyInfo } from '../components/MinCondo/EnergyInfo';
import { sectionIntros } from '../data/sectionIntros';
import { useUserRole } from '../hooks/useUserRole';
import { Moving } from '../components/MinCondo/Moving';


export default function MinCondo() {
  const { role } = useUserRole();
  const isOwnerOrBoard = role === 'owner' || role === 'board';

  return (
    <PageWrapper intro={sectionIntros.minCondo}>

      <div className="sm:space-y-5 space-y-3">
        <div className={`grid sm:gap-5 gap-2 ${
          isOwnerOrBoard ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
        }`}>
          <div className={isOwnerOrBoard ? 'lg:col-span-2' : undefined}>
            <PropertyInfo />
          </div>
          <EnergyInfo />
        </div>
        <Boligmappa />
        <Moving />
      </div>
    </PageWrapper>
  );
}