import axios from '../axios'

interface CreatePromptData {
  title: string
  prompt: string
  category_id: number
  image: string
  model_used?: string
  tags?: string[]
}

interface UpdatePromptData {
  title?: string
  prompt?: string
  category_id?: number
  tags?: string[]
}

export const promptApi = {
  getTrending: async (limit = 10) => {
    return axios.get('/api/v1/prompts/trending', { params: { limit } })
  },

  getAll: async (page = 1, limit = 12, category_id?: number) => {
    return axios.get('/api/v1/prompts', { params: { page, limit, category_id } })
  },

  getById: async (id: number) => {
    return axios.get(`/api/v1/prompts/${id}`)
  },

  create: async (data: CreatePromptData) => {
    return axios.post('/api/v1/prompt/create', data)
  },

  update: async (id: number, data: UpdatePromptData) => {
    return axios.put(`/api/v1/prompt/update/${id}`, data)
  },

  delete: async (id: number) => {
    return axios.delete(`/api/v1/prompt/delete/${id}`)
  },

  copy: async (id: number) => {
    return axios.post(`/api/v1/prompts/${id}/copy`)
  },

  like: async (id: number) => {
    return axios.post(`/api/v1/prompts/${id}/like`)
  },

  getByCategory: async (slug: string, page = 1, limit = 12) => {
    return axios.get(`/api/v1/prompts/category/${slug}`, { params: { page, limit } })
  },
}
