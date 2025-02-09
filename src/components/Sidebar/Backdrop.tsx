import React from 'react';

interface BackdropProps {
  isOpen: boolean;
  onClick: () => void;
}

export function Backdrop({ isOpen, onClick }: BackdropProps) {
  return (
    <div 
      className={`
        fixed inset-0 bg-condo-dark/20 backdrop-blur-sm lg:hidden transition-opacity duration-200
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        z-40
      `}
      onClick={onClick}
    />
  );
}