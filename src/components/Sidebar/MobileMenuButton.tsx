import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function MobileMenuButton({ onClick, isOpen }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-8 sm:top-12 left-4 mt-2 z-50 p-2 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all"
    >
      {isOpen ? (
        <X className="h-7 w-7 sm:h-6 sm:w-6 text-condo-dark" />
      ) : (
        <Menu className="h-7 w-7 sm:h-6 sm:w-6 text-condo-dark" />
      )}
    </button>
  );
}
