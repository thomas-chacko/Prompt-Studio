import axios from '../axios'

interface AddApiKeyData {
  api_key: string
}

export const apiKeyApi = {
  add: async (data: AddApiKeyData) => {
    return axios.post('/api/v1/user/api-key', data)
  },

  get: async () => {
    return axios.get('/api/v1/user/api-key')
  },

  delete: async () => {
    return axios.delete('/api/v1/user/api-key')
  },
}
