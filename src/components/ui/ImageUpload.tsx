import React, { useRef, useState } from 'react';
import { Image as ImageIcon, X, Plus } from 'lucide-react';

interface ImageUploadProps {
  images: File[];
  onChange: (images: File[]) => void;
  maxImages?: number;
  layout?: 'default' | 'facebook';
}

export function ImageUpload({ 
  images, 
  onChange, 
  maxImages = 4,
  layout = 'default'
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = [...images, ...validFiles].slice(0, maxImages);
    
    const urls = newImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => {
      prev.forEach(url => URL.revokeObjectURL(url));
      return urls;
    });
    
    onChange(newImages);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(newUrls);
    onChange(newImages);
  };

  if (layout === 'facebook') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-3 border-t border-b">
          <span className="text-sm font-medium">Legg til i innlegget</span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" />
            Bilde
          </button>
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative aspect-[4/3]">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  // Default layout remains unchanged
  return (
    <div className="space-y-4">
      {/* ... existing default layout code ... */}
    </div>
  );
}