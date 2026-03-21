import axios from '../axios'

interface AddApiKeyData {
  api_key: string
}

export const apiKeyApi = {
  add: async (data: AddApiKeyData) => {
    return axios.post('/user/api-key', data)
  },

  get: async () => {
    return axios.get('/user/api-key')
  },

  delete: async () => {
    return axios.delete('/user/api-key')
  },
}
