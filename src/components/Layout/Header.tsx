import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 sm:h-12 bg-condo-dark z-50">
      <div className="h-full flex items-center justify-center px-4">
        <div className="flex items-center gap-2 sm:gap-4 text-white">
          <span className="text-xs sm:text-sm font-medium truncate">
            Liker du også demoversjonen?
          </span>
          <button
            onClick={scrollToFooter}
            className="px-2 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-medium text-condo-dark bg-condo-light rounded-full hover:bg-condo-light transition-colors whitespace-nowrap"
          >
            Ta kontakt
          </button>
        </div>
      </div>
    </div>
  );
}