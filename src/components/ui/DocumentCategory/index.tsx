import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronRight, Bookmark, Pencil } from 'lucide-react';
import { useUserRole } from '../../../hooks/useUserRole';
import { useImportantDocuments } from '../../../stores/useImportantDocuments';
import { EditDocumentDialog } from '../EditDocumentDialog';
import type { Document as DocumentType } from '../../../types/documents';
import { cn } from '../../../utils/cn';

interface DocumentProps {
  document: {
    id: string;
    name: string;
    link: string;
    category?: string;
  };
  isImportant: boolean;
  showActions?: boolean;
  roleCheck?: (role: string) => boolean;
  categories?: Array<{ value: string; label: string; }>;
}

interface DocumentCategoryProps {
  title: string;
  documents: Array<{
    id: string;
    name: string;
    link: string;
    category?: string;
  }>;
  showActions?: boolean;
  roleCheck?: (role: string) => boolean;
  categories?: Array<{ value: string; label: string; }>;
}

// Document component
function Document({ document, isImportant, showActions, roleCheck, categories }: DocumentProps) {
  const { toggleImportant } = useImportantDocuments();
  const { role } = useUserRole();
  const hasAccess = roleCheck ? roleCheck(role) : false;
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleImportant(document.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditDialog(true);
  };

  const handleSave = (data: { name: string; category?: string }) => {
    console.log('Saving document:', data);
    setShowEditDialog(false);
  };

  const handleDelete = () => {
    console.log('Deleting document:', document.id);
    setShowEditDialog(false);
  };

  return (
    <>
      <div
        className={`
          flex items-center justify-between sm:p-2 p-1 rounded-lg border transition-all group
          ${isImportant 
            ? 'border-condo-dark bg-dark-1 hover:border-condo-med hover:bg-light-1' 
            : 'border-condo-med bg-base-white hover:border-condo-med hover:bg-light-1'
          }
        `}
      >
        <a
          href={document.link}
          className="flex items-center gap-3 flex-1"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <FileText className={cn(
            "sm:h-5 sm:w-5 h-4 w-4 ml-2",
            isImportant ? "text-condo-dark" : "text-condo-med group-hover:text-condo-med"
          )} />
          <span className={cn(
            "sm:text-base text-sm",
            "text-condo-dark group-hover:text-dark-3",
            isImportant && "sm:font-medium font-normal"
          )}>
            {document.name}
          </span>
        </a>
        {showActions && hasAccess && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={cn(
                "sm:p-2 rounded-lg transition-colors",
                isImportant 
                  ? "text-condo-dark" 
                  : "text-gray-400 hover:bg-condo-med hover:text-condo-dark"
              )}
            >
              <Bookmark className="h-4 w-4" fill={isImportant ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleEdit}
              className={cn(
                "sm:p-2 rounded-lg transition-colors",
                isImportant 
                  ? "text-condo-dark" 
                  : "text-gray-400 hover:bg-condo-med hover:text-condo-dark"
              )}
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {showEditDialog && (
        <EditDocumentDialog
          documentName={document.name}
          category={document.category}
          categories={categories}
          onClose={() => setShowEditDialog(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

// DocumentCategory component
export function DocumentCategory({ 
  title, 
  documents, 
  showActions, 
  roleCheck, 
  categories 
}: DocumentCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isImportant } = useImportantDocuments();

  // If no documents, don't render anything
  if (documents.length === 0) {
    return null;
  }

  // Separate important and regular documents
  const importantDocs = documents.filter(doc => isImportant(doc.id));
  const regularDocs = documents.filter(doc => !isImportant(doc.id));

  // Show only important docs when collapsed, all docs when expanded
  const visibleDocs = isExpanded ? documents : importantDocs;

  // Only show expand button if there are regular documents
  const showExpandButton = regularDocs.length > 0;

  return (
    <div className="space-y-2 sm:space-y-3" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 group w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2 flex-1">
          {showExpandButton && (
            isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )
          )}
          <h3 className="font-normal text-gray-900 sm:text-base text-sm">{title}</h3>
        </div>
        <span className="sm:text-sm text-xs text-gray-500">
          ({documents.length} {documents.length === 1 ? 'dokument' : 'dokumenter'})
        </span>
      </button>

      <div className={cn(
        "grid gap-2 sm:gap-3 transition-all duration-200 sm:pl-7",
        isExpanded ? "opacity-100" : "opacity-90"
      )}>
        {visibleDocs.map((doc) => (
          <Document
            key={doc.id}
            document={doc}
            isImportant={isImportant(doc.id)}
            showActions={showActions}
            roleCheck={roleCheck}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
}

// Add Document component to DocumentCategory namespace
DocumentCategory.Document = Document;

// Export both components
export default DocumentCategory;