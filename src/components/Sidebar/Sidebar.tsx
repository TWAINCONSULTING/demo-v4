import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { NavGroup } from './NavGroup';
import { Backdrop } from './Backdrop';
import { MobileMenuButton } from './MobileMenuButton';
import { mainNavigation, supportNavigation } from './navigation';
import { useUserRole } from '../../hooks/useUserRole';
import { useLocation } from 'react-router-dom';  

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useUserRole();
  const location = useLocation();  

  const handleClose = () => {
    setIsOpen(false);
  };

  const filteredSupportNavigation = supportNavigation.filter(item => {
    if (!item.roles || role === 'board') {
      return true;
    }
    return item.roles.includes(role);
  });

  return (
    <>
      <MobileMenuButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

      <Backdrop isOpen={isOpen} onClick={handleClose} />
      <nav
        className={`
          fixed inset-y-0 left-0 sm:w-64 w-full shadow-lg
          transform transition-transform duration-200 ease-in-out z-40 bg-white
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          top-8 sm:top-12
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 flex w-full flex-col items-center sm:pt-4 
          pt-8 pb-8">
            <Logo onClick={handleClose} />
          </div>

          <div className="flex-1 p-6 pt-2 overflow-y-auto">
            <div className="sm:space-y-3 space-y-1">
              {mainNavigation.map((item) => (
                <NavGroup 
                  key={item.to} 
                  item={item}
                  onClick={handleClose}
                />
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
            <div className="sm:space-y-3 space-y-1">
              {filteredSupportNavigation.map((item) => (
                <NavGroup 
                  key={item.to} 
                  item={item}
                  onClick={handleClose}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}