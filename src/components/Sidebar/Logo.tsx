import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <Link 
      to="/"
      className="flex items-center gap-3 mt-5"
      onClick={onClick}
    >
      <img 
        src="/images/Condo-logo-dark green.png" 
        alt="Condo" 
        className="h-8"
      />
    </Link>
  );
}