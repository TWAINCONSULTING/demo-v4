import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { NewFeatureDialog } from '../components/ProductDev/NewFeatureDialog';
import { FeatureList } from '../components/ProductDev/FeatureList';
import { FilterBar } from '../components/ProductDev/FilterBar';
import { PageWrapper } from '../components/ui/PageWrapper';
import { sectionIntros } from '../data/sectionIntros';
import type { NewFeature } from '../types/features';
import { useFeatureStore } from '../stores/useFeatureStore';

export default function Produktutvikling() {
  const [showNewFeatureDialog, setShowNewFeatureDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleNewFeature = (feature: NewFeature) => {
    console.log('New feature:', feature);
    setShowNewFeatureDialog(false);
  };

  const handleComment = (featureId: string) => {
    console.log('New comment for:', featureId);
  };

  return (
    <PageWrapper intro={sectionIntros.produktutvikling}>
      <div className="sm:max-w-4xl sm:mx-auto sm:space-y-3 sm:p-4">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          onNewFeature={() => setShowNewFeatureDialog(true)}
        />

        <FeatureList 
          searchQuery={searchQuery}
          filter={selectedFilter}
          onComment={handleComment}
        />

        {showNewFeatureDialog && (
          <NewFeatureDialog 
            onClose={() => setShowNewFeatureDialog(false)}
            onSubmit={handleNewFeature}
          />
        )}
      </div>
    </PageWrapper>
  );
}