import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReportConfirmationDialogProps {
  recipient: string;
  onClose: () => void;
}

export function ReportConfirmationDialog({ recipient, onClose }: ReportConfirmationDialogProps) {
  return (
    <div className="fixed -top-4 inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between sm:p-4 p-3 border-b">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-condo-med sm:inline hidden" />
            <h2 className="sm:text-xl text-base font-semibold">Problemet er meldt videre</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 sm:inline hidden" />
          </button>
        </div>
        <div className="sm:p-6 p-4">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="space-y-2">
              <p className="text-gray-600">
                Problemet er meldt videre til {recipient}. Du vil få en melding i appen når henvendelsen er behandlet.
              </p>
            </div>
            <Button onClick={onClose} className="mt-2 w-full">
              Lukk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}