import { useState, useMemo } from 'react'
import { useDebounce } from './useDebounce'

interface UseSearchOptions<T> {
  data: T[]
  searchableFields: (keyof T)[]
  debounceMs?: number
}

export function useSearch<T>({ 
  data, 
  searchableFields,
  debounceMs = 300 
}: UseSearchOptions<T>) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, debounceMs)

  const results = useMemo(() => {
    if (!debouncedQuery) return data

    const searchTerms = debouncedQuery.toLowerCase().split(' ')
    
    return data.filter(item => 
      searchTerms.every(term =>
        searchableFields.some(field => {
          const value = String(item[field]).toLowerCase()
          return value.includes(term)
        })
      )
    )
  }, [data, debouncedQuery, searchableFields])

  return {
    query,
    setQuery,
    results,
    isSearching: query !== debouncedQuery
  }
}