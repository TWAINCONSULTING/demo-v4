import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface LikeButtonProps {
  count: number;
  hasReacted: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
  variant?: 'forum' | 'product';
  label?: string;
}

export function LikeButton({ 
  count, 
  hasReacted, 
  onClick, 
  size = 'md',
  variant = 'forum',
  label = 'Likt'
}: LikeButtonProps) {
  const activeColor = variant === 'forum' ? 'text-condo-med' : 'text-condo-dark';
  const hoverColor = variant === 'forum' ? 'lg:hover:text-condo-dark' : 'lg:hover:text-condo-med';

  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center sm:gap-1.5 gap-1 active:scale-95 transition-all
        ${hasReacted ? activeColor : `text-gray-500 ${hoverColor}`}
        ${size === 'sm' ? 'text-xs' : 'text-sm'}
      `}
    >
      <ThumbsUp className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      <span>{count}</span>
      <span>{label}</span>
    </button>
  );
}