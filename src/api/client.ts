
import { supabase } from './supabase'

export const apiClient = {
  get: async (endpoint: string) => {
    const { data, error } = await supabase.from(endpoint).select('*')
    if (error) throw error
    return data
  },

  post: async (endpoint: string, payload: any) => {
    const { data, error } = await supabase.from(endpoint).insert(payload)
    if (error) throw error
    return data
  },

  put: async (endpoint: string, id: string, payload: any) => {
    const { data, error } = await supabase
      .from(endpoint)
      .update(payload)
      .match({ id })
    if (error) throw error
    return data
  },

  delete: async (endpoint: string, id: string) => {
    const { error } = await supabase
      .from(endpoint)
      .delete()
      .match({ id })
    if (error) throw error
  }
}
