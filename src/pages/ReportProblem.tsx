import React, { useState } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { SystemStatus } from '../components/ReportProblem/SystemStatus';
import { ReportForm } from '../components/ReportProblem/ReportForm';
import { IncidentHistory } from '../components/ReportProblem/IncidentHistory';
import { sectionIntros } from '../data/sectionIntros';

export default function ReportProblem() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <PageWrapper intro={sectionIntros.reportProblem}>
      <div className="sm:space-y-6 space-y-3">
        <div className="grid lg:grid-cols-2 sm:gap-8 gap-2">
          {/* Left column */}
          <div className="sm:space-y-6 space-y-3">
            <ReportForm 
              onTypeSelect={setSelectedType} 
              selectedType={selectedType}
            />
            <div className="hidden sm:inline-block w-full">
              {!selectedType && <IncidentHistory />}
            </div>
          </div>

          {/* Right column */}
          <SystemStatus />
        </div>

        {/* Full width incident history when type is selected */}
        <div className="hidden sm:inline">
           {selectedType && <IncidentHistory />}
        </div>
        <div className="sm:hidden" >
          <IncidentHistory />
        </div>
        
      </div>
    </PageWrapper>
  );
}