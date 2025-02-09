```typescript
import React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../utils/cn'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  loading?: boolean
}

export function SearchInput({
  value,
  onChange,
  onClear,
  loading,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={cn(
          'w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'placeholder-gray-400',
          className
        )}
        {...props}
      />

      {value && !loading && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
```