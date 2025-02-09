import React from 'react';
import { ROLE_CONFIG } from '../../constants/roles';
import { useUserRole } from '../../hooks/useUserRole';

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const { role } = useUserRole();

  return (
    <div className="grid grid-cols-3 gap-2 sm:mb-6 sm:mt-6">
      {ROLE_CONFIG.map(({ id, label, icon: Icon }) => {
        const isSelected = role === id;
        const isTenant = id === 'tenant';

        return (
          <button
            key={id}
            type="button"
            onClick={() => !isTenant && onRoleSelect(id)}
            disabled={isTenant}
            className={`
              group relative flex flex-col items-center justify-center gap-2 sm:p-3 rounded-lg border transition-all py-3
              ${isSelected
                ? 'border-condo-dark bg-dark-1'
                : isTenant
                  ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                  : 'border-gray-200 hover:border-condo-med hover:bg-base-white'
              }
            `}
          >
            <div
              className={`
                p-2 rounded-lg flex items-center justify-center transition-colors
                ${isSelected
                  ? 'bg-condo-dark'
                  : 'bg-gray-100'
                }
                ${!isTenant && !isSelected && 'group-hover:bg-dark-2'}
              `}
            >
              <Icon
                className={`
                  h-5 w-5 transition-colors
                  ${isSelected
                    ? 'text-condo-light'
                    : 'text-gray-600'
                  }
                  ${!isTenant && !isSelected && 'group-hover:text-light-2'}
                `}
              />
            </div>
            <span className="text-sm font-medium">
              {label}
            </span>
            {isTenant && (
              <div className="text-xs text-gray-500 sm:mt-1 -mt-1">
                Kommer i 2025
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}