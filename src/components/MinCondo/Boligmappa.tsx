import React, { useState } from 'react';
import { FileText, Plus, ChevronDown, Info, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { documentCategories } from '../../data/minCondoDocuments';
import { DocumentUploadDialog } from '../ui/DocumentUploadDialog';
import { DocumentCategory } from '../ui/DocumentCategory';
import { useUserRole } from '../../hooks/useUserRole';
import { useImportantDocuments } from '../../stores/useImportantDocuments';
import { cn } from '../../utils/cn';
import { BoligmappaIntegration } from './BoligmappaIntegration';
import { Tooltip } from '../ui/Tooltip';
import { supabase } from '../../lib/supabase';

const isOwner = (role: string) => role === 'owner';

const uploadCategories = [
  { value: 'documentation', label: 'Dokumentasjon og sertifikasjoner' },
  { value: 'maintenance', label: 'Vedlikehold og oppussing' }
];

export function Boligmappa() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { role } = useUserRole();
  const { importantDocuments } = useImportantDocuments();
  const isUserOwner = isOwner(role);

  // Filter documents based on search query
  const filterDocuments = (documents: typeof documentCategories) => {
    if (!searchQuery) return documents;

    const query = searchQuery.toLowerCase();
    return documents.map(category => ({
      ...category,
      documents: category.documents.filter(doc => 
        doc.name.toLowerCase().includes(query)
      )
    })).filter(category => category.documents.length > 0);
  };

  const filteredCategories = filterDocuments(documentCategories);

  // Get visible categories based on expanded state
  const visibleCategories = isExpanded 
    ? filteredCategories 
    : filteredCategories.slice(0, 2);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-3">
      <Card>
        <div className="sm:p-6 p-3">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            {/* Title and tooltip */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-condo-dark rounded-lg hidden sm:block">
                <FileText className="h-5 w-5 text-condo-light" />
              </div>
              <h2 className="sm:text-xl text-base font-semibold">Dokumenter</h2>
              <Tooltip content="Her finner du all dokumentasjon tilknyttet din bolig.">
                <Info 
                  className="sm:h-5 sm:w-5 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
                  onClick={(e) => e.stopPropagation()}
                />
              </Tooltip>
            </div>

            {/* Search and Upload */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Søk i dokumenter..."
                  className="sm:px-8 w-full pl-9 pr-3 py-1.5 sm:py-2 sm:text-sm text-xs border rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {isUserOwner && (
                <button
                  onClick={() => setShowUploadDialog(true)}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm bg-condo-dark text-condo-light rounded-lg hover:bg-condo-med transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Last opp dokument</span>
                </button>
              )}
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-2 sm:pt-2">
            {visibleCategories.map((category) => (
              <DocumentCategory
                key={category.title}
                title={category.title}
                documents={category.documents}
                showActions={isUserOwner}
                roleCheck={isOwner}
                categories={uploadCategories}
              />
            ))}
          </div>

          {/* Show more/less button */}
          {filteredCategories.length > 2 && (
            <div className="border-t border-gray-100 mt-6 pt-4">
              <button
                onClick={toggleExpand}
                className="w-full flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                {isExpanded ? (
                  <>
                    <ChevronDown className="h-4 w-4 rotate-180" />
                    <span>Vis mindre</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span>Vis flere dokumenter</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Upload Dialog */}
      {showUploadDialog && (
        <DocumentUploadDialog
          onClose={() => setShowUploadDialog(false)}
          onUpload={async (data) => {
            // Handle upload
            setShowUploadDialog(false);
          }}
          categories={uploadCategories}
          title="Last opp dokument"
          description="Last opp dokumenter relatert til din bolig. Dokumentene vil kun være tilgjengelige for deg."
        />
      )}

      {/* Boligmappa Integration */}
      <BoligmappaIntegration />
    </div>
  );
}