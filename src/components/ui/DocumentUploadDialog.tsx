import React, { useCallback, useState } from 'react';
import { X, Upload, Loader2, Plus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from './Button';
import { Select } from './Select';

interface Category {
  value: string;
  label: string;
}

interface DocumentUploadDialogProps {
  onClose: () => void;
  onUpload: (data: { 
    name: string;
    category: string;
    files: File[];
  }) => void;
  categories: Category[];
  maxFiles?: number;
  title?: string;
  description?: string;
}

export function DocumentUploadDialog({ 
  onClose, 
  onUpload,
  categories,
  maxFiles = 10,
  title = 'Last opp dokument',
  description
}: DocumentUploadDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0].value);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
    setFiles(newFiles);

    // Generate previews for PDF files
    const newPreviews = acceptedFiles.map(() => '/document-preview.png');
    setPreviews(prev => [...prev, ...newPreviews]);
  }, [files, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10485760, // 10MB
    maxFiles
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0 || !name.trim()) return;

    setUploading(true);
    try {
      await onUpload({
        name: name.trim(),
        category,
        files
      });
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="hidden sm:flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="sm:p-6 sm:pt-2 sm:space-y-4 
          space-y-3 p-4 pt-0">
          {description && (
            <p className="text-sm text-gray-600 hidden sm:inline ">{description}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dokumentnavn
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="sm:text-base text-sm w-full px-3 py-2 rounded-lg focus:ring-1 focus:outline-none border border-condo-dark focus:ring-condo-med"
              required
            />
          </div>

          <Select
            label="Kategori"
            value={category}
            onChange={setCategory}
            options={categories}
            className="border border-condo-dark 
            focus:ring-1 focus:outline-none focus:ring-condo-med
            sm:text-base text-sm"
          />

          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors sm:text-base text-sm
              ${isDragActive 
                ? 'border-condo-dark bg-dark-1' 
                : 'border-gray-300 hover:border-condo-med'}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 mx-auto mb-4 sm:mb-0 text-gray-400" />
            <p className="text-gray-600">
              {isDragActive
                ? 'Slipp filen her ...'
                : 'Dra og slipp filer her, eller klikk for å velge filer'}
            </p>
            <p className="text-sm text-gray-500 mt-2 sm:mt-4">
              Maks filstørrelse: 10MB. Støttede formater: PDF, DOC, DOCX
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between gap-3 pt-4 sm:pt-0">
            <Button variant="outline" onClick={onClose}>
              Avbryt
            </Button>
            <Button 
              type="submit" 
              disabled={uploading || files.length === 0 || !name.trim()}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Laster opp...
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Last opp</span>
                  <span className="sm:hidden">Last opp dokument</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}