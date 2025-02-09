import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center justify-center gap-1 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          {item.to ? (
            <Link
              to={item.to}
              className="text-base font-logo text-gray-900 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-base font-logo text-gray-900 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-base font-logo text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}