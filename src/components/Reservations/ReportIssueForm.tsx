import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReportIssueFormProps {
  onSubmit: (data: { description: string; images: File[] }) => void;
  onCancel: () => void;
}

export function ReportIssueForm({ onSubmit, onCancel }: ReportIssueFormProps) {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

    // Generate previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit({ description, images });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sm:space-y-3 space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Beskrivelse av problemet
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 pt-2 border rounded-lg 
          focus:ring-1 focus:outline-none focus:ring-condo-dark min-h-[100px] sm:text-base text-sm"
          placeholder="Beskriv hva som er feil..."
          required
        />
      </div>
      <div>
        
          <label
            htmlFor="image-upload"
            className="flex flex-row items-center justify-center
            gap-2 px-3 py-1.5 
            text-sm bg-gray-100 text-condo-dark 
            border border-dark-2
            rounded-lg hover:bg-dark-1 cursor-pointer"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Legg til bilder</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:border-t sm:pt-4 gap-2
        w-full">
        
        
        <div className="flex w-full justify-between items-center sm:gap-3 ">
          <Button variant="outline" onClick={onCancel} size="sm">
            Avbryt
          </Button>
          <Button type="submit" size="sm">
            Send rapport
          </Button>
        </div>
      </div>
    </form>
  );
}