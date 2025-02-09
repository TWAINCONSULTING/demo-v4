import React, { useState } from 'react';
import { X, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { ModifyReservationForm } from './ModifyReservationForm';
import { ReportIssueForm } from './ReportIssueForm';
import type { Reservation, Facility } from '../../types/booking';

type ActionType = 'modify' | 'report' | null;

interface ReservationActionDialogProps {
  reservation: Reservation;
  facility: Facility;
  onClose: () => void;
  onModify: (id: string, data: { startTime: string; endTime: string }) => void;
  onReport: (id: string, data: { description: string; images: File[] }) => void;
}

export function ReservationActionDialog({
  reservation,
  facility,
  onClose,
  onModify,
  onReport
}: ReservationActionDialogProps) {
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);
  const canModify = ['ongoing', 'upcoming'].includes(reservation.status);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <div className="flex items-center justify-between sm:p-4 p-2 border-b">
          <h2 className="sm:text-lg text-base font-semibold">
            {selectedAction === 'modify' ? 'Endre reservasjon' :
             selectedAction === 'report' ? 'Rapporter problem' :
             'Velg handling'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="sm:p-6 p-3">
          {!selectedAction ? (
            <div className="space-y-3">
              {canModify && (
                <button
                  onClick={() => setSelectedAction('modify')}
                  className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-left"
                >
                  <div className="p-2 bg-condo-dark rounded-lg">
                    <Clock className="h-5 w-5 text-condo-light" />
                  </div>
                  <div>
                    <div className="font-medium">Endre reservasjon</div>
                    <div className="text-sm text-gray-500">Endre tidspunkt eller varighet</div>
                  </div>
                </button>
              )}
              
              <button
                onClick={() => setSelectedAction('report')}
                className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-left"
              >
                <div className="p-2 bg-yellow-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-10" />
                </div>
                <div>
                  <div className="font-medium">Rapporter problem</div>
                  <div className="text-sm text-gray-500">Meld fra om feil eller mangler</div>
                </div>
              </button>
            </div>
          ) : selectedAction === 'modify' ? (
            <ModifyReservationForm
              reservation={reservation}
              facility={facility}
              onSubmit={(data) => {
                onModify(reservation.id, data);
                onClose();
              }}
              onCancel={() => setSelectedAction(null)}
            />
          ) : (
            <ReportIssueForm
              onSubmit={(data) => {
                onReport(reservation.id, data);
                onClose();
              }}
              onCancel={() => setSelectedAction(null)}
            />
          )}
        </div>
      </Card>
    </div>
  );
}