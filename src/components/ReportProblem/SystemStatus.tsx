import React from 'react';
import { CheckCircle, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { UptimeBar } from '../ui/UptimeBar';
import { IncidentStats } from './IncidentStats';

export function SystemStatus() {
  return (
    <div className="space-y-3 sm:space-y-6">
      {/* System Status Card */}
      <Card>
        <div className="sm:p-6 p-3 flex flex-col">
          <div className="flex flex-col sm:items-center sm:mb-6 mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:w-full gap-3">
              <div className="p-2 bg-green-50 rounded-lg hidden sm:inline">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex flex-row justify-between w-full mt-2">
                <h2 className="sm:text-xl text-base font-semibold mb-2 text-left">Systemstatus</h2>
                <p className="text-green-600 right-0 mr-0 text-end ml-auto text-sm sm:text-left">Ingen rapporterte problemer</p>
              </div>
            </div>
          </div>

          <div className="sm:space-y-6 space-y-3">
            <UptimeBar days={90} uptime={100} />
            <div className="text-sm text-gray-600">
              Sist oppdatert: {new Date().toLocaleTimeString('no')}
            </div>
          </div>
        </div>
      </Card>
      {/* Statistics Card */}
      <IncidentStats />
    </div>
  );
}