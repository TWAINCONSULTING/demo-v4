import React, { useState } from 'react';
import { Users, Filter, X } from 'lucide-react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { HelpCenterSearch } from '../components/HelpCenter/HelpCenterSearch';
import { CategoryList } from '../components/HelpCenter/CategoryList';
import { HelpCenterArticles } from '../components/HelpCenter/HelpCenterArticles';
import { MobileCategoriesDialog } from '../components/HelpCenter/MobileCategoriesDialog';
import { sectionIntros } from '../data/sectionIntros';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  // Single category for desktop view
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Array of categories for mobile view
  const [mobileCategories, setMobileCategories] = useState<string[]>([]);
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  // Handle desktop category selection
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  // Handle mobile category selection
  const handleMobileCategorySelect = (categoryId: string) => {
    setMobileCategories(prev => {
      const isSelected = prev.includes(categoryId);
      if (isSelected) {
        return prev.filter(id => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  // Clear all mobile categories
  const handleClearMobileCategories = () => {
    setMobileCategories([]);
  };

  // Close mobile dialog and apply selected categories
  const handleMobileClose = () => {
    setShowMobileCategories(false);
    // If only one category is selected in mobile, sync it with desktop view
    if (mobileCategories.length === 1) {
      setSelectedCategory(mobileCategories[0]);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <PageWrapper intro={sectionIntros.hjelpesenter}>
      <div className="max-w-5xl mx-auto sm:space-y-4 space-y-2">
        {/* Search bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <HelpCenterSearch value={searchQuery} onChange={setSearchQuery} />
          
          {/* Mobile categories button */}
          <div className="mt-4 lg:hidden">
            <div 
              onClick={() => setShowMobileCategories(true)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors
              border border-condo-dark bg-dark-1"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="font-medium">
                  {mobileCategories.length ? 
                    `${mobileCategories.length} valgt${mobileCategories.length === 1 ? '' : 'e'}` : 
                    'Velg kategorier'
                  }
                </span>
              </div>
              {mobileCategories.length > 0 && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearMobileCategories();
                  }}
                  className="p-1 hover:bg-dark-2 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-condo-dark" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Categories sidebar - desktop only */}
          <div className="hidden lg:block col-span-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-4">
              <h2 className="font-medium px-2 mb-3">Kategorier</h2>
              <CategoryList 
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>
          
          {/* Articles section */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-xl sm:p-4 p-3 shadow-sm border border-gray-100">
              <HelpCenterArticles 
                searchQuery={searchQuery}
                selectedCategory={window.innerWidth >= 1024 ? selectedCategory : mobileCategories[0]}
              />
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-dark-1 rounded-xl p-6 sm:m-0 m-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Fant du ikke svaret du trengte?</h2>
          <p className="text-gray-600 mb-4 sm:text-base text-sm">
            Du kan kontakte styret direkte for ytterligere hjelp eller spørsmål.
          </p>
          <a
            href="/kontakt?recipient=board"
            className="inline-flex items-center gap-2 px-4 py-2 bg-condo-dark text-condo-light rounded-lg hover:bg-condo-med transition-colors"
          >
            <Users className="h-4 w-4" />
            Kontakt styret
          </a>
        </div>

        {/* Mobile categories dialog */}
        {showMobileCategories && (
          <MobileCategoriesDialog
            selectedCategories={mobileCategories}
            onSelectCategory={handleMobileCategorySelect}
            onClose={handleMobileClose}
          />
        )}
      </div>
    </PageWrapper>
  );
}