import React from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { ContactCard } from '../components/Bofellesskapet/ContactCard';
import { InfoGrid } from '../components/Bofellesskapet/InfoGrid';
import { FacilitySection } from '../components/Bofellesskapet/FacilitySection';
import { AllDocumentsSection } from '../components/Bofellesskapet/AllDocumentsSection';
import { sectionIntros } from '../data/sectionIntros';

export default function Bofellesskapet() {
  return (
    <PageWrapper intro={sectionIntros.bofellesskapet}>
      <div className="sm:space-y-4">
        <div className="grid lg:grid-cols-12 sm:gap-4">
          {/* Main content area */}
          <div className="lg:col-span-9 sm:space-y-4">
            <InfoGrid />
            <FacilitySection />
          </div>
          
          {/* Contact card that spans both rows */}
          <div className="lg:col-span-3 sm:inline hidden">
            <div className="lg:sticky lg:top-4">
              <ContactCard />
            </div>
          </div>
        </div>
        <AllDocumentsSection />
      </div>
    </PageWrapper>
  );
}