import axios from '../axios'

interface CreateCollectionData {
  name: string
  is_public?: boolean
}

export const collectionApi = {
  getAll: async () => {
    return axios.get('/api/v1/collections')
  },

  create: async (data: CreateCollectionData) => {
    return axios.post('/api/v1/collections', data)
  },

  addPrompt: async (collectionId: number, promptId: number) => {
    return axios.post(`/api/v1/collections/${collectionId}/prompts`, { prompt_id: promptId })
  },

  removePrompt: async (collectionId: number, promptId: number) => {
    return axios.delete(`/api/v1/collections/${collectionId}/prompts/${promptId}`)
  },

  delete: async (id: number) => {
    return axios.delete(`/api/v1/collections/${id}`)
  },
}
