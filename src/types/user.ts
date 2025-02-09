export interface User {
  id: string
  email: string
  name: string
  apartment: string
  role: 'resident' | 'board' | 'admin'
  created_at: string
  updated_at: string
}

export interface UserRole {
  BOARD: 'board'
  OWNER: 'owner'
  TENANT: 'tenant'
}