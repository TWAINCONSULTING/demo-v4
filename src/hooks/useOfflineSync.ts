import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'
import { useNotificationStore } from '../store/notificationStore'

interface OfflineSyncOptions<T> {
  key: string
  onSync: (data: T[]) => Promise<void>
  validateData?: (data: T) => boolean
}

export function useOfflineSync<T>({
  key,
  onSync,
  validateData = () => true
}: OfflineSyncOptions<T>) {
  const [offlineData, setOfflineData] = useState<T[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const { addNotification } = useNotificationStore()

  // Load offline data from storage
  useEffect(() => {
    const stored = storage.get<T[]>(key, [])
    setOfflineData(stored)
  }, [key])

  // Save offline data
  const saveOfflineData = (data: T) => {
    if (!validateData(data)) {
      throw new Error('Invalid data')
    }

    const newData = [...offlineData, data]
    storage.set(key, newData)
    setOfflineData(newData)

    addNotification({
      type: 'info',
      message: 'Data lagret lokalt',
      duration: 3000
    })
  }

  // Sync offline data when online
  const syncOfflineData = async () => {
    if (offlineData.length === 0 || isSyncing) return

    setIsSyncing(true)
    try {
      await onSync(offlineData)
      storage.set(key, [])
      setOfflineData([])
      
      addNotification({
        type: 'success',
        message: 'Data synkronisert',
        duration: 3000
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Kunne ikke synkronisere data',
        duration: 5000
      })
    } finally {
      setIsSyncing(false)
    }
  }

  // Auto-sync when online
  useEffect(() => {
    const handleOnline = () => {
      syncOfflineData()
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [offlineData])

  return {
    offlineData,
    saveOfflineData,
    syncOfflineData,
    isSyncing
  }
}