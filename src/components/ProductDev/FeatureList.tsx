import React, { useMemo } from 'react';
import { FeatureCard } from './FeatureCard';
import { features } from '../../data/features';
import type { Feature } from '../../types/features';

interface FeatureListProps {
  searchQuery: string;
  filter: string;
  onVote: (id: string) => void;
  onComment: (id: string) => void;
}

export function FeatureList({ searchQuery, filter, onVote, onComment }: FeatureListProps) {
  const filteredFeatures = useMemo(() => {
    // First apply search filter
    let filtered = features.filter(feature => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          feature.title.toLowerCase().includes(searchLower) ||
          feature.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });

    // Then apply status/type filter and sort accordingly
    switch (filter) {
      case 'popular': {
        // Sort by votes in descending order
        return [...filtered].sort((a, b) => b.votes - a.votes);
      }
      case 'all': {
        // Sort by creation date in descending order (newest first)
        return [...filtered].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      case 'launched':
        return filtered.filter(feature => feature.status === 'PRODUKSJON');
      case 'coming':
        return filtered.filter(feature => feature.status === 'KOMMER');
      case 'review':
        return filtered.filter(feature => feature.status === 'UNDER_VURDERING');
      default:
        return filtered;
    }
  }, [searchQuery, filter]);

  return (
    <div className="sm:space-y-4 space-y-2">
      {filteredFeatures.map(feature => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          onVote={onVote}
          onComment={onComment}
        />
      ))}

      {filteredFeatures.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Ingen forslag funnet. Prøv å endre søket eller filteret.
        </div>
      )}
    </div>
  );
}