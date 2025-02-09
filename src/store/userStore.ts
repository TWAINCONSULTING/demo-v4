import { create } from 'zustand'
import { apiClient } from '../api/client'
import type { User } from '../types/user'

interface UserStore {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  addUser: (user: Omit<User, 'id'>) => Promise<void>
  updateUser: (id: string, data: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true })
    try {
      const users = await apiClient.get('users')
      set({ users, error: null })
    } catch (error) {
      set({ error: (error as Error).message })
    } finally {
      set({ loading: false })
    }
  },

  addUser: async (user) => {
    try {
      const newUser = await apiClient.post('users', user)
      set((state) => ({ users: [...state.users, newUser] }))
    } catch (error) {
      set({ error: (error as Error).message })
    }
  },

  updateUser: async (id, data) => {
    try {
      const updatedUser = await apiClient.put('users', id, data)
      set((state) => ({
        users: state.users.map((user) => 
          user.id === id ? { ...user, ...updatedUser } : user
        )
      }))
    } catch (error) {
      set({ error: (error as Error).message })
    }
  },

  deleteUser: async (id) => {
    try {
      await apiClient.delete('users', id)
      set((state) => ({
        users: state.users.filter((user) => user.id !== id)
      }))
    } catch (error) {
      set({ error: (error as Error).message })
    }
  }
}))