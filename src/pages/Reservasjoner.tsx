import React, { useState } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { ReservationForm } from '../components/Reservations/ReservationForm';
import { ReservationHistory } from '../components/Reservations/ReservationHistory';
import { facilities } from '../data/facilities';
import { sectionIntros } from '../data/sectionIntros';

export default function Reservasjoner() {
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0].id);
  const [showForm, setShowForm] = useState(false);
  const selectedFacility = facilities.find(f => f.id === selectedFacilityId);

  const handleFacilityChange = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
    setShowForm(false); // Close form when changing facility
  };

  return (
    <PageWrapper intro={sectionIntros.reservasjoner}>
      <div className="grid lg:grid-cols-12 sm:gap-8 gap-2">
        {/* Left column: Facility Selection and Form */}
        <div className="lg:col-span-7">
          {selectedFacility && (
            <ReservationForm 
              facility={selectedFacility}
              facilities={facilities}
              onFacilityChange={handleFacilityChange}
              showForm={showForm}
              onShowForm={() => setShowForm(true)}
            />
          )}
        </div>

        {/* Right column: Reservation History */}
        <div className="lg:col-span-5">
          <ReservationHistory maxVisible={showForm ? 6 : 4} />
        </div>
      </div>
    </PageWrapper>
  );
}