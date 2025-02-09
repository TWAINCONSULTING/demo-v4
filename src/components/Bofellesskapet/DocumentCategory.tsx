import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronRight, Bookmark, Pencil } from 'lucide-react';
import { useUserRole } from '../../hooks/useUserRole';
import { useImportantDocuments } from '../../stores/useImportantDocuments';
import type { Document } from '../../types/documents';
import { cn } from '../../utils/cn';


// ikke brukt lenger, flyttet til ui

interface DocumentProps {
  document: {
    id: string;
    name: string;
    link: string;
  };
  isImportant: boolean;
  showActions?: boolean;
  roleCheck?: (role: string) => boolean;
}

interface DocumentCategoryProps {
  title: string;
  documents: Array<{
    id: string;
    name: string;
    link: string;
  }>;
  showActions?: boolean;
  roleCheck?: (role: string) => boolean;
}

// Separate Document component that can be used independently
function Document({ document, isImportant, showActions, roleCheck }: DocumentProps) {
  const { toggleImportant } = useImportantDocuments();
  const { role } = useUserRole();
  const hasAccess = roleCheck ? roleCheck(role) : false;
  const showImportantStyle = hasAccess && isImportant;

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleImportant(document.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add edit functionality here
  };

  return (
    <div
      className={`
        flex items-center justify-between sm:p-3 p-2 rounded-lg border transition-all group
        ${showImportantStyle 
          ? 'border-condo-med bg-base-white hover:border-condo-med hover:bg-light-1' 
          : 'border-condo-yellow bg-base-white hover:border-condo-orange hover:bg-light-1'
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
          showImportantStyle ? "text-condo-med" : "text-condo-orange group-hover:text-condo-orange"
        )} />
        <span className={cn(
          "sm:text-base text-sm font-normal",
          "text-gray-800 group-hover:text-black",
          showImportantStyle && "font-medium"
        )}>
          {document.name}
        </span>
      </a>
      {showActions && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={cn(
              "sm:p-2 rounded-lg transition-colors",
              isImportant 
                ? "text-condo-med" 
                : "text-gray-400 hover:bg-condo-light hover:text-condo-dark"
            )}
          >
            <Bookmark className="h-4 w-4" fill={isImportant ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleEdit}
            className={cn(
              "sm:p-2 rounded-lg transition-colors",
              isImportant 
                ? "text-condo-med" 
                : "text-gray-400 hover:bg-condo-light hover:text-condo-dark"
            )}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function DocumentCategory({ title, documents, showActions, roleCheck }: DocumentCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isImportant } = useImportantDocuments();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const visibleDocuments = isExpanded ? documents : documents.slice(0, 2);

  return (
    <div className="space-y-2 sm:space-y-3" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 group w-full text-left"
      >
        <div className="p-1 group-hover:bg-gray-100 rounded-lg transition-colors">
          {isExpanded ? (
            <ChevronDown className="sm:h-5 sm:w-5 h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="sm:h-5 sm:w-5 h-4 w-4 text-gray-400" />
          )}
        </div>
        <div className="flex flex-wrap w-full justify-between sm:items-center sm:gap-2">
          <h3 className="font-normal text-gray-900 sm:text-base text-sm">{title}</h3>
          <span className="sm:text-sm text-xs text-gray-500">
            ({documents.length} {documents.length === 1 ? 'dokument' : 'dokumenter'})
          </span>
        </div>
      </button>

      <div className="grid gap-2 sm:gap-3 transition-all duration-200">
        {visibleDocuments.map((doc) => (
          <Document
            key={doc.id}
            document={doc}
            isImportant={isImportant(doc.id)}
            showActions={showActions}
            roleCheck={roleCheck}
          />
        ))}
      </div>
    </div>
  );
}

// Add Document component to DocumentCategory exports
DocumentCategory.Document = Document;

export { DocumentCategory };