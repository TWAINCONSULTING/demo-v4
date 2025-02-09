import { cn } from '../../utils/cn'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ 
  label,
  error,
  className = '',
  ...props 
}: InputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="font-medium text-gray-700 text-sm">
          {label}
        </label>
      )}
      <input
        className={cn(
          'block w-full',
          error ? 'border-red' : '',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}