import React from 'react';
import { X } from 'lucide-react';

interface AboutDialogProps {
  onClose: () => void;
}

export function AboutDialog({ onClose }: AboutDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Om Condo</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">
            Condo er en tjeneste utviklet av TWAIN AS. Vi ønsker å modernisere hvordan borettslag og sameier organiseres og administreres. Vår målsetning er å forenkle hverdagen for styremedlemmer og beboere gjennom digitale og effektive løsninger.
          </p>
        </div>
      </div>
    </div>
  );
}