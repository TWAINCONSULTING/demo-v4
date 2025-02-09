import React from 'react';
import { X, Bell } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { Link } from 'react-router-dom';

interface LoginDialogProps {
  onClose: () => void;
}

export function LoginDialog({ onClose }: LoginDialogProps) {
  const [showKommer, setShowKommer] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowKommer(true);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center 
      p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="relative sm:p-6 p-3">
          <button
            onClick={onClose}
            className="absolute right-4 top-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 hidden sm:inline" />
          </button>
          <LoginForm onSuccess={onClose} />
          
          <Link
            to=""
            className="mt-4 flex items-center gap-2 text-xs text-gray-500 hover:text-condo-med transition-colors"
            onClick={handleClick}
          >
            <Bell className="h-3 w-3" />
            <span>Administrer varslingsinnstillinger</span>
            {showKommer && <span className="text-dark-600 font-medium">Kommer!</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}