import React from 'react';
import { Home, Users, Calendar, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { 
    label: 'Min bolig', 
    href: '/min-bolig', 
    icon: Home 
  },
  { 
    label: 'Naboen', 
    href: '/naboen', 
    icon: Users,
    highlight: true 
  },
  { 
    label: 'Reservasjoner', 
    href: '/reservasjoner', 
    icon: Calendar 
  },
  { 
    label: 'Hjelpesenter', 
    href: '/faq', 
    icon: HelpCircle 
  },
  { 
    label: 'Meldinger', 
    href: '/kontakt', 
    icon: MessageCircle 
  }
];

export function QuickActions() {
  return (
    <div className="hidden sm:grid grid-cols-5 gap-4 mb-8 z-index-11">
      {actions.map(({ label, href, icon: Icon, highlight }) => (
        <Link
          key={label}
          to={href}
          className={`
            flex flex-col items-center gap-3 p-4 rounded-xl border transition-all group  
            ${highlight 
              ? 'bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100' 
              : 'bg-white border-gray-100 hover:border-blue-500 hover:shadow-md'
            }
          `}
        >
          <div className={`
            p-3 rounded-full transition-colors
            ${highlight 
              ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-200' 
              : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
            }
          `}>
            <Icon size={24} />
          </div>
          <span className={`
            text-sm font-medium text-center
            ${highlight ? 'text-purple-900' : 'text-gray-700'}
          `}>
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}