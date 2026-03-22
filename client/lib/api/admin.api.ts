import axios from '../axios'

export const adminApi = {
  // Platform Stats
  getStats: async () => {
    return axios.get('/api/v1/admin/stats')
  },

  // User Management
  getUsers: async (params?: {
    page?: number
    limit?: number
    role?: 'user' | 'admin'
    plan?: 'free' | 'pro'
    search?: string
  }) => {
    return axios.get('/api/v1/admin/users', { params })
  },

  updateUserRole: async (userId: string, role: 'user' | 'admin') => {
    return axios.put(`/api/v1/admin/users/${userId}/role`, { role })
  },

  deleteUser: async (userId: string) => {
    return axios.delete(`/api/v1/admin/users/${userId}`)
  },

  // Prompt Management
  getPrompts: async (params?: {
    page?: number
    limit?: number
    isPublished?: boolean
    categoryId?: number
    search?: string
  }) => {
    return axios.get('/api/v1/admin/prompts', { params })
  },

  updatePrompt: async (promptId: number, data: {
    title?: string
    prompt?: string
    isPublished?: boolean
    categoryId?: number
    tags?: string[]
  }) => {
    return axios.put(`/api/v1/admin/prompts/${promptId}`, data)
  },

  deletePrompt: async (promptId: number) => {
    return axios.delete(`/api/v1/admin/prompts/${promptId}`)
  },

  // Category Management
  getCategories: async () => {
    return axios.get('/api/v1/admin/categories')
  },

  createCategory: async (data: {
    category: string
    slug: string
    imageUrl?: string
  }) => {
    return axios.post('/api/v1/admin/categories', data)
  },

  updateCategory: async (categoryId: number, data: {
    category?: string
    slug?: string
    imageUrl?: string
  }) => {
    return axios.put(`/api/v1/admin/categories/${categoryId}`, data)
  },

  deleteCategory: async (categoryId: number) => {
    return axios.delete(`/api/v1/admin/categories/${categoryId}`)
  },

  // Generation Monitoring
  getGenerations: async (params?: {
    page?: number
    limit?: number
    userId?: string
    apiKeySource?: 'own' | 'free'
  }) => {
    return axios.get('/api/v1/admin/generations', { params })
  },
}
