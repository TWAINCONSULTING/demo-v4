import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button'; // Add Button import
import { SelectionButtons } from './SelectionButtons';
import { ReportConfirmationDialog } from './ReportConfirmationDialog';
import { PROBLEM_TYPES } from '../../constants/reportTypes';

interface ReportFormProps {
  onTypeSelect: (type: string | null) => void;
  selectedType: string | null;
}

export function ReportForm({ onTypeSelect, selectedType }: ReportFormProps) {
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const TRANSITION_DURATION = 300;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      setShowConfirmation(true);
    }
  };

  const handleTypeChange = (type: string | null) => {
    if (type === selectedType) {
      // Collapse form
      setIsFormVisible(false);
      setTimeout(() => {
        onTypeSelect(null);
        setDescription('');
        setImages([]);
        setPreviews([]);
      }, TRANSITION_DURATION);
    } else {
      // Expand form
      onTypeSelect(type);
      setTimeout(() => setIsFormVisible(true), 50);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setIsFormVisible(false);
    setTimeout(() => {
      onTypeSelect(null);
      setDescription('');
      setImages([]);
      setPreviews([]);
    }, TRANSITION_DURATION);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);

    // Generate previews for new images
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <div className="sm:p-6 p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mt-1">
          <h2 className="sm:text-xl text-base font-semibold">Rapporter et problem</h2>
        </div>

        <form onSubmit={handleSubmit} className="sm:space-y-4 space-y-2">
          <SelectionButtons
            value={selectedType || ''}
            onChange={handleTypeChange}
            options={PROBLEM_TYPES}
            variant="problem"
          />

          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isFormVisible ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            {selectedType && (
              <>
                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-[172px] resize-none mt-2 sm:h-[249px]"
                    placeholder="Beskriv problemet i detalj..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  {previews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70"
                          >
                            <X className="h-3 w-3 text-white" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 sm:pt-2">
                    <Button
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="whitespace-nowrap flex flex-row items-center justify-center gap-2 px-4 rounded-md sm:text-base text-sm"
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span>Legg til bilde</span>
                    </Button>

                    <div className="flex w-full justify-end sm:text-base text-sm">
                      <Button type="submit" className="px-4">
                        Send rapport
                      </Button>
                    </div>
                  </div>
                </div>

                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
        </form>
      </div>

      {showConfirmation && (
        <ReportConfirmationDialog 
          recipient="Condo"
          onClose={handleClose}
        />
      )}
    </Card>
  );
}