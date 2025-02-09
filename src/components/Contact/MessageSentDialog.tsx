import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface MessageSentDialogProps {
  onClose: () => void;
}

export function MessageSentDialog({ onClose }: MessageSentDialogProps) {
  return (
    <div className="fixed inset-0 -top-3 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 pl-6 border-b">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-condo-med" />
            <h2 className="text-lg font-semibold">Melding sendt</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 pt-4">
          <p className="text-gray-600 mb-6">
            Din melding er sendt. Du vil få svar i meldingssystemet så snart som mulig.
          </p>
          <Button onClick={onClose} className="w-full">
            Lukk
          </Button>
        </div>
      </div>
    </div>
  );
}