import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronRight, Pencil } from 'lucide-react';
import { useUserRole } from '../../hooks/useUserRole';
import type { Document } from '../../types/documents';

interface DocumentGroupProps {
  title: string;
  documents: Array<{
    id: string;
    name: string;
    link: string;
  }>;
  onEdit?: (doc: Document) => void;
}

//Not used or????

export function DocumentGroup({ title, documents, onEdit }: DocumentGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { role } = useUserRole();
  const isOwner = role === 'owner';

  const visibleDocuments = isExpanded ? documents : documents.slice(0, 2);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 group w-full text-left"
      >
        <div className="p-1 group-hover:bg-gray-100 rounded-lg transition-colors">
          {isExpanded ? (
            <ChevronDown className="h-7 w-7 text-gray-400" />
          ) : (
            <ChevronRight className="h-7 w-7 text-gray-400" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">
            ({documents.length} {documents.length === 1 ? 'dokument' : 'dokumenter'})
          </span>
        </div>
      </button>

      <div className="grid gap-3">
        <h3>HALO BRUKES DENNE ELLØØØ</h3>
        {visibleDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-gray-50 transition-all group"
          >
            <a
              href={doc.link}
              className="flex items-center gap-3 flex-1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText className="h-5 w-5 text-gray-400 group-hover:text-condo-dark" />
              <span className="text-gray-600 group-hover:text-gray-900">
                {doc.name}
              </span>
            </a>
            {isOwner && onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(doc);
                }}
                className="p-2 text-gray-400 hover:text-condo-dark hover:bg-condo-med rounded-lg transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}