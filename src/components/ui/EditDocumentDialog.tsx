import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';

interface EditDocumentDialogProps {
  documentName: string;
  category?: string;
  categories?: Array<{ value: string; label: string }>;
  onClose: () => void;
  onDelete: () => void;
  onSave: (data: { name: string; category?: string }) => void;
}

export function EditDocumentDialog({ 
  documentName, 
  category,
  categories,
  onClose, 
  onDelete, 
  onSave 
}: EditDocumentDialogProps) {
  const [newName, setNewName] = useState(documentName);
  const [newCategory, setNewCategory] = useState(category || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onSave({ 
        name: newName.trim(),
        ...(categories && { category: newCategory })
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="hidden sm:flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Rediger dokument</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="sm:p-6 p-4 space-y-4">
          {!showDeleteConfirm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Document name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dokumentnavn
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:outline-none focus:ring-condo-dark border-condo-dark text-sm sm:text-base"
                  required
                />
              </div>
              
              {/* Category selection */}
              {categories && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:outline-none focus:ring-condo-dark border-condo-dark text-sm sm:text-base appearance-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-between gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 !text-orange-8 hover:!bg-condo-orange hover:!text-condo-yellow"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Slett</span>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Avbryt
                  </Button>
                  <Button type="submit">
                    Lagre
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Er du sikker på at du vil slette dette dokumentet?
                </h3>
                <p className="text-gray-600">
                  Dette kan ikke angres.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Avbryt
                </Button>
                <Button 
                  onClick={onDelete}
                  className="bg-orange-8 hover:bg-orange-9 text-white"
                >
                  Slett
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}