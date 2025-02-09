import React from 'react';
import { Activity, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { PieChart } from './PieChart';
import { Tooltip } from '../ui/Tooltip';

const stats = [ 
  { type: 'Nettside', count: 5, color: 'rgba(0,200,145,255)' }, // condo-med
  { type: 'App', count: 2, color: '#FFCA73' }, // condo-orange
  { type: 'Informasjon', count: 1, color: '#005750' }, // condo-dark
  { type: 'Chatbot', count: 1, color: 'rgba(255,235,180,255)' } // condo-yellow
];

const total = stats.reduce((sum, stat) => sum + stat.count, 0);

export function IncidentStats() {
  return (
    <Card>
      <div className="sm:p-6 p-3">
        <div className="flex items-center justify-between sm:mb-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-condo-dark rounded-lg sm:inline hidden">
              <Activity className="h-5 w-5 text-condo-light" />
            </div>
            <h2 className="sm:text-xl text-base font-semibold">Statistikk</h2>
          </div>
          <Tooltip content="Dette er eksempeldata for å vise hvordan statistikken vil se ut. I en produksjonsversjon vil dette vise faktiske rapporterte problemer.">
            <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
          </Tooltip>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative">
            <div className="opacity-75">
              <PieChart data={stats}/>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{total}</div>
                <div className="text-sm text-gray-900">totalt</div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 mb-2">
            {stats.map((stat) => (
              <div key={stat.type} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{stat.type}</span>
                  <span className="font-medium">{stat.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    style={{ 
                      width: `${(stat.count / total) * 100}%`,
                      backgroundColor: stat.color
                    }}
                    className="h-full transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}