```typescript
import { useState, useMemo } from 'react'

interface FilterConfig<T> {
  initialFilters: Partial<Record<keyof T, any>>
  data: T[]
}

export function useFilter<T extends Record<string, any>>({ 
  initialFilters,
  data
}: FilterConfig<T>) {
  const [filters, setFilters] = useState(initialFilters)

  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        
        const itemValue = item[key]
        if (Array.isArray(value)) {
          return value.length === 0 || value.includes(itemValue)
        }
        
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase())
        }
        
        return itemValue === value
      })
    )
  }, [data, filters])

  const updateFilter = (key: keyof T, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  return {
    filters,
    filteredData,
    updateFilter,
    resetFilters
  }
}
```