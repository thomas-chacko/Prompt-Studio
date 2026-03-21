import axios from '../axios'

interface UpdateUserRoleData {
  role: 'user' | 'admin'
}

interface UpdatePromptData {
  is_published?: boolean
}

interface UpdateCategoryData {
  category?: string
  slug?: string
  image_url?: string
}

export const adminApi = {
  // Stats
  getStats: async () => {
    return axios.get('/admin/stats')
  },

  // Users
  getUsers: async (page = 1, limit = 20) => {
    return axios.get('/admin/users', { params: { page, limit } })
  },

  updateUserRole: async (userId: string, data: UpdateUserRoleData) => {
    return axios.put(`/admin/users/${userId}/role`, data)
  },

  deleteUser: async (userId: string) => {
    return axios.delete(`/admin/users/${userId}`)
  },

  // Prompts
  getPrompts: async (page = 1, limit = 20) => {
    return axios.get('/admin/prompts', { params: { page, limit } })
  },

  updatePrompt: async (promptId: number, data: UpdatePromptData) => {
    return axios.put(`/admin/prompts/${promptId}`, data)
  },

  deletePrompt: async (promptId: number) => {
    return axios.delete(`/admin/prompts/${promptId}`)
  },

  // Categories
  getCategories: async () => {
    return axios.get('/admin/categories')
  },

  updateCategory: async (categoryId: number, data: UpdateCategoryData) => {
    return axios.put(`/admin/categories/${categoryId}`, data)
  },

  deleteCategory: async (categoryId: number) => {
    return axios.delete(`/admin/categories/${categoryId}`)
  },

  // Generations
  getGenerations: async (page = 1, limit = 20) => {
    return axios.get('/admin/generations', { params: { page, limit } })
  },
}
