import React from 'react';
import { FileText, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useImportantDocuments } from '../../stores/useImportantDocuments';
import { documentCategories } from '../../data/bofellesskapetDocuments';
import { DocumentItem } from '../ui/DocumentItem';
import { Tooltip } from '../ui/Tooltip';

export function DocumentsSection() {
  const { importantDocuments } = useImportantDocuments();

  // Flatten all documents and filter important ones
  const allDocuments = documentCategories.flatMap(category => 
    category.documents.filter(doc => importantDocuments.includes(doc.id))
  );

  if (allDocuments.length === 0) {
    return null;
  }

  return (
    <div className="bg-base-white border border-condo-dark rounded-lg sm:rounded-xl shadow-md flex sm:border-t sm:border-b sm:shadow-md">
      <div className="p-4 sm:p-6 w-full sm:pb-3">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-condo-dark rounded-lg hidden sm:inline">
              <FileText className="h-5 w-5 text-condo-light" />
            </div>
            <h2 className="text-black sm:text-xl font-semibold">Viktige dokumenter</h2>
          </div>
          <Tooltip content={
            <div className="whitespace-pre-line">
              Dokumenter markert som viktige i bofellesskapets dokumentarkiv.
              {'\n\n'}
              Endres ved å klikke bokmerke-ikonet i dokumenter på bofellesskapets side.
            </div>
          }>
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
          </Tooltip>
        </div>

        <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
          {allDocuments.map((doc) => (
            <DocumentItem key={doc.id} {...doc} />
          ))}
        </div>

        <div className="mt-4 sm:mt-2 flex justify-end">
          <Link 
            to="/bofellesskapet#documents" 
            className="text-xs sm:text-sm text-condo-dark hover:text-condo-med !font-semibold inline-flex items-center gap-1"
          >
            Se alle
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}