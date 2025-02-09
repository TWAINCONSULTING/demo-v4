import React, { useState } from 'react';
import { FileText, Plus, ChevronDown, ChevronUp, Info, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { documentCategories } from '../../data/bofellesskapetDocuments';
import { DocumentUploadDialog } from '../ui/DocumentUploadDialog';
import { DocumentCategory } from '../ui/DocumentCategory';
import { useUserRole } from '../../hooks/useUserRole';
import { useImportantDocuments } from '../../stores/useImportantDocuments';
import { cn } from '../../utils/cn';
import { Tooltip } from '../ui/Tooltip';
import { supabase } from '../../lib/supabase';

const isBoard = (role: string) => role === 'board';

const uploadCategories = [
  { value: 'arsrapporter', label: 'Årsrapporter og økonomi' },
  { value: 'vedlikehold', label: 'Vedlikehold og oppgraderinger' },
  { value: 'styredokumenter', label: 'Styredokumenter' }
];

export function AllDocumentsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { role } = useUserRole();
  const { importantDocuments } = useImportantDocuments();
  const isUserBoard = isBoard(role);

  const handleUpload = async (data: { 
    name: string; 
    category: string; 
    files: File[] 
  }) => {
    try {
      // Upload handling code...
      setShowUploadDialog(false);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

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

  return (
    <div className="space-y-3 mt-2">
      <Card id="myCondoDocDiv">
        <div className="sm:p-6 p-3 relative">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            {/* Left column: Title and tooltip */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-condo-dark rounded-lg hidden sm:block">
                <FileText className="h-5 w-5 text-condo-light" />
              </div>
              <h2 className="sm:text-xl text-base font-semibold">Dokumenter</h2>
              <Tooltip content="Klikk på bokmerket for å feste viktige dokumenter til forsiden.">
                <Info className="sm:h-5 sm:w-5 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
              </Tooltip>
            </div>

            {/* Right column: Search and Upload */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Søk i dokumenter..."
                  className="sm:px-8 sm:py-2 w-full pl-9 pr-3 py-1.5 sm:text-sm text-xs border rounded-lg sm:mt-0 mt-3"
                />
                <Search className="absolute left-3 sm:top-1/2 top-7 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </div>

              {isUserBoard && (
                <button
                  onClick={() => setShowUploadDialog(true)}
                  className="absolute sm:relative sm:top-0 sm:right-0 sm:px-8 sm:py-2 top-3 right-3 sm:self-start flex items-center justify-center gap-1 sm:px-3 px-2 py-1.5 text-sm bg-condo-dark text-condo-light rounded-lg hover:bg-condo-med transition-colors whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:flex">Last opp dokument</span>
                </button>
              )}
            </div>
          </div>

          {/* Document categories */}
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <DocumentCategory
                key={category.title}
                title={category.title}
                documents={category.documents}
                showActions={isUserBoard}
                roleCheck={isBoard}
                categories={uploadCategories}
              />
            ))}
          </div>
        </div>
      </Card>

      {showUploadDialog && (
        <DocumentUploadDialog
          onClose={() => setShowUploadDialog(false)}
          onUpload={handleUpload}
          categories={uploadCategories}
          title="Last opp dokument til arkivet"
          description="Last opp dokumenter til borettslagets dokumentarkiv. Dokumentene vil være tilgjengelige for alle beboere."
        />
      )}
    </div>
  );
}