import React from 'react';

interface AvatarProps {
  name: string;
  className?: string;
}

export function Avatar({ name, className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    'bg-dark-1 text-condo-dark',
    'bg-yellow-2 text-orange-8',
    'bg-light-2 text-condo-med',
    'bg-orange-8 text-yellow-2',
    'bg-condo-dark text-condo-light'
  ];

  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${colors[colorIndex]} ${className}`}>
      {initials}
    </div>
  );
}