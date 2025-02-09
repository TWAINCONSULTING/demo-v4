import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

interface CacheConfig {
  key: string
  ttl?: number // Time to live in milliseconds
  version?: string
}

export function useCache<T>({ key, ttl = 1000 * 60 * 5, version = '1' }: CacheConfig) {
  const cacheKey = `cache_${key}_${version}`
  
  const getCachedData = (): { data: T | null; timestamp: number } | null => {
    const cached = storage.get<{ data: T; timestamp: number }>(cacheKey, null)
    
    if (!cached) return null
    
    const isExpired = Date.now() - cached.timestamp > ttl
    if (isExpired) {
      storage.remove(cacheKey)
      return null
    }
    
    return cached
  }

  const [cache, setCache] = useState<T | null>(() => {
    const cached = getCachedData()
    return cached?.data ?? null
  })

  const updateCache = (data: T) => {
    const cacheData = {
      data,
      timestamp: Date.now()
    }
    storage.set(cacheKey, cacheData)
    setCache(data)
  }

  const clearCache = () => {
    storage.remove(cacheKey)
    setCache(null)
  }

  return { cache, updateCache, clearCache }
}