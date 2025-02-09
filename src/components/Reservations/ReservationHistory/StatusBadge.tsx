import React from 'react';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import type { ReservationStatus } from '../../../types/booking';

interface StatusBadgeProps {
  status: ReservationStatus;
}

const statusConfig = {
  ongoing: {
    icon: Clock,
    label: 'Pågående',
    className: 'bg-orange-8 text-condo-yellow-1'
  },
  upcoming: {
    icon: Calendar,
    label: 'Kommende',
    className: 'bg-yellow-2 text-orange-9 text-shadow-xs'
  },
  completed: {
    icon: CheckCircle,
    label: 'Avsluttet',
    className: 'bg-light-1 text-condo-med text-shadow-xs'
  },
  cancelled: {
    icon: XCircle,
    label: 'Kansellert',
    className: 'bg-yellow-2 text-orange-8'
  }
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full sm:text-sm text-xs ${config.className}`}>
      <Icon className="h-4 w-4" />
      <span className="font-medium">{config.label}</span>
    </div>
  );
}