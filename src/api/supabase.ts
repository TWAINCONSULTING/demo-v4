import { createClient } from '@supabase/supabase-js'
import { handleError } from '../utils/errorHandling'
//import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 

// Realtime subscriptions helper
export const subscribeToChannel = <T>(
  channel: string,
  callback: (payload: T) => void
) => {
  const subscription = supabase
    .channel(channel)
    .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
      callback(payload as T)
    })
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

export const safeQuery = async <T>(
  query: Promise<{ data: T | null; error: any }>
): Promise<T> => {
  try {
    const { data, error } = await query
    if (error) throw error
    if (!data) throw new Error('No data returned')
    return data
  } catch (error) {
    throw handleError(error)
  }
}