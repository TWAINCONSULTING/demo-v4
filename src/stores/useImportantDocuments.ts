import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default important documents
const DEFAULT_IMPORTANT_DOCUMENTS = [
  'arsrapport-2024',  // Annual report
  'budsjett-2024',    // Budget
  'vedlikeholdsplan-2024', // Maintenance plan
  'styrevedtak-2024'  // Board decisions
];

interface ImportantDocumentsState {
  importantDocuments: string[];
  toggleImportant: (documentId: string) => void;
  isImportant: (documentId: string) => boolean;
}

export const useImportantDocuments = create<ImportantDocumentsState>()(
  persist(
    (set, get) => ({
      importantDocuments: DEFAULT_IMPORTANT_DOCUMENTS,
      toggleImportant: (documentId: string) => 
        set(state => ({
          importantDocuments: state.importantDocuments.includes(documentId)
            ? state.importantDocuments.filter(id => id !== documentId)
            : [...state.importantDocuments, documentId]
        })),
      isImportant: (documentId: string) => 
        get().importantDocuments.includes(documentId)
    }),
    {
      name: 'important-documents'
    }
  )
);