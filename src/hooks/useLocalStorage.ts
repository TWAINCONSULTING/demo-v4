import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get(key, initialValue)
  })

  useEffect(() => {
    storage.set(key, storedValue)
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}