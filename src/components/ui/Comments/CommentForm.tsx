import React from 'react';

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  variant?: 'forum' | 'product';
}

export function CommentForm({ value, onChange, onSubmit, variant = 'forum' }: CommentFormProps) {
  const bgColor = variant === 'forum' ? 'bg-gray-50' : 'bg-dark-1';
  const focusRing = variant === 'forum' ? 'focus:ring-condo-light' : 'focus:ring-condo-dark';
  const buttonBg = variant === 'forum' ? 'bg-condo-light' : 'bg-condo-dark';
  const buttonText = variant === 'forum' ? 'text-condo-dark' : 'text-condo-light';
  const buttonHover = variant === 'forum' ? 'hover:bg-condo-med' : 'hover:bg-condo-med';

  return (
    <form 
      onSubmit={onSubmit}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-3"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Skriv en kommentar..."
        className={`flex-1 px-3 py-2 bg-base-white border border-dark-1 rounded-lg focus:ring-2
        focus:outline-none ${focusRing} text-sm`}
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className={`px-4 py-2 ${buttonBg} ${buttonText} rounded-lg text-sm font-medium ${buttonHover} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Publiser
      </button>
    </form>
  );
}