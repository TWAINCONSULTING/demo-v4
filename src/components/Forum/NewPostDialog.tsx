import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FORUM_FEATURES, getFeatureByValue, type ForumFeature } from '../../types/forumFeatures';
import { MarketplaceForm } from './PostForms/MarketplaceForm';
import { DiscussionForm } from './PostForms/DiscussionForm';
import { RecommendationsForm } from './PostForms/RecommendationsForm';
import { EventForm } from './PostForms/EventForm';
import type { NewPost } from '../../types/forum';

interface NewPostDialogProps {
  type: ForumFeature['value'];
  onClose: () => void;
  onSubmit: (post: NewPost) => void;
}

export function NewPostDialog({ type: initialType, onClose, onSubmit }: NewPostDialogProps) {
  const [type, setType] = useState<ForumFeature['value']>(initialType);
  const selectedFeature = getFeatureByValue(type);

  if (!selectedFeature) {
    return null;
  }

  const handleSubmit = (post: NewPost) => {
    onSubmit(post);
    onClose();
  };

  const FormComponent = {
    discussion: DiscussionForm,
    marketplace: MarketplaceForm,
    event: EventForm,
    recommendations: RecommendationsForm
  }[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-0">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="sticky top-0 bg-white z-10 rounded-t-xl">
          <div className="p-4 sm:pb-2">
            <div className="flex items-center justify-between sm:mb-2 sm:flex hidden">
              <h2 className="text-lg font-semibold">
                {selectedFeature.label}
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-4 grid-cols-2 gap-2">
              {FORUM_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.value}
                    onClick={() => setType(feature.value)}
                    className={`
                      flex flex-col items-center gap-1.5 p-2 py-8 rounded-lg transition-colors
                      ${feature.value === type ? feature.introColor : `bg-white text-opacity-100`}
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{feature.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="hidden sm:flex mt-3 text-sm text-gray-600 text-center">
              {selectedFeature.description}
            </p>
          </div>
        </div>
        
        <div className="p-4 sm:pt-2 sm:mt-0 -mt-5 sm:border-t">
          <FormComponent 
            onSubmit={handleSubmit} 
            onCancel={onClose} 
            type={type}
          />
        </div>
      </div>
    </div>
  );
}
