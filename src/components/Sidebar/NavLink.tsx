import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItemProps } from './types';
import { scrollToSection } from '../../utils/scroll';

export function NavLink({ item, onClick }: NavItemProps) {
  const location = useLocation();
  const Icon = item.icon;
  const label = item.label;
  
  // Check if this is the current page
  const isActive = location.pathname === item.to || 
    location.pathname.startsWith(item.to + '/') ||
    (item.isScrollTarget && location.pathname + item.to.split('#')[1] === item.to);
  
  const handleClick = (e: React.MouseEvent) => {
    if (item.isScrollTarget) {
      const [path, section] = item.to.split('#');
      
      if (location.pathname === path) {
        e.preventDefault();
        scrollToSection(section);
      }
    }
    onClick?.();
  };

  // Determine background color based on highlight and active state
  const getBgColor = () => {
    if (item.highlight) {
      return isActive ? 'bg-condo-light' : 'hover:bg-light-3 bg-light-1'; 
    }
    return isActive ? 'bg-dark-1' : 'hover:bg-base-white';
  };

  // Determine the text color based on highlight and active state
  const getTextColor = () => {
    if (item.highlight) return isActive ? 'text-condo-dark' : 'text-condo-dark';
    return isActive ? 'text-base-dark2' : 'text-condo-dark hover:text-condo-dark';
  };
  
  return (
    <Link
      to={item.to}
      onClick={handleClick}
      className={`
        w-full flex items-center px-4 py-3 rounded-lg transition-all
        ${item.isScrollTarget ? 'pl-11 text-sm' : ''}
        ${getBgColor()}
        ${getTextColor()}
        text-shadow-glow
        lg:flex-row lg:gap-3
        flex-col gap-2
      `}
    >
      {/* Icon and Label Wrapper */}
      <span className={`
        flex items-center gap-2 
        ${getTextColor()}
        lg:w-auto w-full
        lg:justify-start justify-start
      `}>
        {item.img ? (
          <img src={item.img} alt="" className="lg:h-[18px] lg:w-[18px] h-5 w-5" />
        ) : Icon && (
          <Icon className="lg:h-[18px] lg:w-[18px] h-5 w-5" />
        )}
        <span className="lg:text-sm text-base sm:font-medium font-normal">{label}</span>
      </span>
    </Link>
  );
}