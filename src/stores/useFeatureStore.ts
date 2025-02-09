import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Feature } from '../types/features';
import { features as initialFeatures } from '../data/features';

interface FeatureStore {
  features: Feature[];
  votedFeatures: string[];
  voteFeature: (featureId: string) => void;
  hasVoted: (featureId: string) => boolean;
  getVoteCount: (featureId: string) => number;
}

export const useFeatureStore = create<FeatureStore>()(
  persist(
    (set, get) => ({
      features: initialFeatures, // Initialize with features from data
      votedFeatures: [],
      voteFeature: (featureId: string) => 
        set((state) => {
          const hasVoted = state.votedFeatures.includes(featureId);
          
          // Toggle vote
          const newVotedFeatures = hasVoted
            ? state.votedFeatures.filter(id => id !== featureId)
            : [...state.votedFeatures, featureId];
          
          // Update feature vote count immediately
          const newFeatures = state.features.map(feature => {
            if (feature.id === featureId) {
              return {
                ...feature,
                votes: feature.votes + (hasVoted ? -1 : 1),
                hasVoted: !hasVoted
              };
            }
            return feature;
          });

          return {
            votedFeatures: newVotedFeatures,
            features: newFeatures
          };
        }),
      hasVoted: (featureId: string) => 
        get().votedFeatures.includes(featureId),
      getVoteCount: (featureId: string) => {
        const feature = get().features.find(f => f.id === featureId);
        return feature?.votes || 0;
      }
    }),
    {
      name: 'feature-store',
      version: 1 // Add version for future migrations
    }
  )
);