import React, { useState } from 'react';
import { FORUM_FEATURES, type ForumFeature } from '../../types/forumFeatures';
import { NewPostDialog } from './NewPostDialog';

export function NaboIntro() {
  const [selectedType, setSelectedType] = useState<ForumFeature['value'] | null>(null);

  return (
    <div>
      <div className="p-2 pt-0 pb-0 grid grid-cols-2 lg:grid-cols-4 sm:gap-4 gap-2">
        {FORUM_FEATURES.map((feature) => {
          const Icon = feature.icon;
          
          return (

            //why is not responsibe?
            <button
              key={feature.value}
              onClick={() => setSelectedType(feature.value)}
              className="rounded-xl p-4 py-3 transition-all group text-left sm:w-full
              border border-condo-light shadow-sm hover:shadow-md hover:bg-condo-light
              border-2 border-gray-200 bg-light-2"
            >
              <div className="flex flex-col items-center sm:gap-3">
                <div className="p-2 rounded-lg 
                  text-condo-dark text-shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`font-medium sm:text-base text-sm text-condo-dark text-shadow-glow`}>{feature.label}</div>
              </div>
            </button>
            
            
          );
        })}
        
      </div>

      {selectedType && (
        <NewPostDialog
          type={selectedType}
          onClose={() => setSelectedType(null)} 
          onSubmit={(post) => console.log("New Post Submitted:", post)} 
        />
      )}
      
    </div>
    
  );
}
