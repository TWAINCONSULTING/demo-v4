import React from 'react';
import { History } from 'lucide-react';
import { Card } from '../ui/Card';

export function HistoryCard() {
  return (
    <Card className="h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <History className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Historie</h2>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-blue-700">
            Her vil det komme en spesialtilpasset seksjon for historien til hvert respektive bofellesskap.
          </p>
        </div>
      </div>
    </Card>
  );
}