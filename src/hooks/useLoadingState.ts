import { useState, useCallback } from 'react'

interface LoadingState {
  isLoading: boolean
  error: Error | null
  setError: (error: Error | null) => void
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>
}

export const useLoadingState = (): LoadingState => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      startLoading()
      setError(null)
      const result = await fn()
      return result
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
      throw err
    } finally {
      stopLoading()
    }
  }, [])

  return { isLoading, error, setError, startLoading, stopLoading, withLoading }
}