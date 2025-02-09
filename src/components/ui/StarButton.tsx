import React from 'react';
import { Bookmark } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StarButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function StarButton({ isActive, onClick, className }: StarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg transition-colors",
        isActive ? "text-purple-600 hover:bg-purple-50" : "text-gray-400 hover:bg-gray-100",
        className
      )}
    >
      <Bookmark className="h-4 w-4" fill={isActive ? "currentColor" : "none"} />
    </button>
  );
}