import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface NewNewsDialogProps {
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
}

export function NewNewsDialog({ onClose, onSubmit }: NewNewsDialogProps) {
  const [form, setForm] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim() && form.content.trim()) {
      onSubmit(form);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl sm:w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b sm:flex hidden ">
          <h2 className="text-lg font-semibold">Legg til nyhet</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="sm:p-6 p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tittel
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Skriv en beskrivende tittel"
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-condo-dark focus:border-condo-med focus:outline-none min-h-[20px] border-gray-200 sm:text-base text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Innhold
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-condo-med focus:border-condo-dark focus:outline-none min-h-[200px] border-gray-200 sm:text-base text-sm"
              placeholder="Skriv nyhetens innhold..."
              required
            />
          </div>

          <div className="flex justify-between gap-3 sm:pt-4 sm:border-t border-gray-200 
            sm:text-base text-sm">
            <Button variant="outline" onClick={onClose}>Avbryt</Button>
            <Button type="submit">Publiser</Button>
          </div>
        </form>
      </div>
    </div>
  );
}