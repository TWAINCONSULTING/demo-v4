import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConnectionStatus() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg shadow-lg border border-amber-200 flex items-center gap-2">
      <AlertTriangle className="h-5 w-5" />
      <div>
        <p className="font-medium">Supabase ikke tilkoblet</p>
        <p className="text-sm">Klikk "Connect to Supabase" for å sette opp tilkoblingen</p>
      </div>
    </div>
  );
}