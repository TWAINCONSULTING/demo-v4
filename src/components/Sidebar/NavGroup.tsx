import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from './NavLink';
import { NavItemProps } from './types';

export function NavGroup({ item, onClick }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === item.to || 
    item.children?.some(child => location.pathname === child.to);

  return (
    <div className="space-y-1">
      <NavLink item={item} onClick={onClick} />
      {item.children?.map((child) => (
        <NavLink 
          key={child.to} 
          item={child}
          onClick={onClick}
        />
      ))}
    </div>
  );
}