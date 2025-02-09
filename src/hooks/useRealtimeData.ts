import { useState, useEffect } from 'react'
import { subscribeToChannel, supabase } from '../api/supabase'
import { useNotificationStore } from '../store/notificationStore'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export function useRealtimeData<T extends { id: string }>(
  table: string,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(true)
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: result, error } = await supabase
          .from(table)
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setData(result || [])
      } catch (error) {
        addNotification({
          type: 'error',
          message: 'Kunne ikke hente data',
          duration: 5000
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    const unsubscribe = subscribeToChannel<RealtimePostgresChangesPayload<T>>(
      table,
      (payload) => {
        if (!payload.new || !payload.eventType) return

        setData((current) => {
          switch (payload.eventType) {
            case 'INSERT':
              return [payload.new, ...current]
            case 'UPDATE':
              return current.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            case 'DELETE':
              return current.filter((item) => item.id !== payload.old.id)
            default:
              return current
          }
        })
      }
    )

    return () => {
      unsubscribe()
    }
  }, [table])

  return { data, loading }
}