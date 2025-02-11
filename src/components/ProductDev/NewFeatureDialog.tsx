import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { NewFeature } from '../../types/features';

interface NewFeatureDialogProps {
  onClose: () => void;
  onSubmit: (feature: NewFeature) => void;
}

const categories = [
  { value: 'functionality', label: 'Funksjonalitet' },
  { value: 'ui', label: 'Brukergrensesnitt' },
  { value: 'integration', label: 'Integrasjon' },
  { value: 'other', label: 'Annet' }
];

export function NewFeatureDialog({ onClose, onSubmit }: NewFeatureDialogProps) {
  const [form, setForm] = useState<NewFeature>({
    title: '',
    description: '',
    category: 'functionality'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full ">
        <div className="items-center justify-between p-4 sm:border-b sm:flex hidden">
          <h2 className="text-lg font-semibold">Send inn forslag</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="sm:p-6 p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:outline-none focus:ring-condo-dark focus:border-condo-dark text-sm sm:text-base"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tittel
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Kort og beskrivende tittel"
              className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-1 focus:outline-none focus:ring-condo-dark focus:border-condo-dark"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beskrivelse
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:outline-none focus:ring-condo-dark focus:border-condo-dark min-h-[130px] text-sm sm:text-base"
              placeholder="Beskriv forslaget ditt i detalj..."
              required
            />
          </div>

          <div className="flex justify-between sm:pt-4 sm:text-base text-sm">
            <Button variant="outline" onClick={onClose}>Avbryt</Button>
            <Button type="submit">Send inn</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
