import { useState } from 'react'
import { apiClient } from '../client'
import type { ApiResponse, QueryParams } from '../types'
import { handleError } from '../../utils/errorHandling'

export function useApi<T>() {
  const [loading, setLoading] = useState(false)
  
  const fetchData = async (
    endpoint: string, 
    params?: QueryParams
  ): Promise<ApiResponse<T>> => {
    setLoading(true)
    try {
      const data = await apiClient.get(endpoint, params)
      return { data, error: null, status: 200 }
    } catch (error) {
      const message = handleError(error)
      return { data: null, error: message, status: 500 }
    } finally {
      setLoading(false) 
    }
  }

  const mutateData = async (
    method: 'post' | 'put' | 'delete',
    endpoint: string,
    payload?: any
  ): Promise<ApiResponse<T>> => {
    setLoading(true)
    try {
      const data = await apiClient[method](endpoint, payload)
      return { data, error: null, status: 200 }
    } catch (error) {
      const message = handleError(error)
      return { data: null, error: message, status: 500 }
    } finally {
      setLoading(false)
    }
  }

  return { 
    fetchData, 
    createData: (endpoint: string, payload: any) => mutateData('post', endpoint, payload),
    updateData: (endpoint: string, payload: any) => mutateData('put', endpoint, payload),
    deleteData: (endpoint: string) => mutateData('delete', endpoint),
    loading 
  }
}