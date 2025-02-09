export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

export interface PaginationParams {
  page?: number
  limit?: number
  orderBy?: string
  order?: 'asc' | 'desc'
}

export interface QueryParams extends PaginationParams {
  filters?: Record<string, any>
}