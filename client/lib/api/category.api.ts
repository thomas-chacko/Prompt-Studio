import axios from '../axios'

export const categoryApi = {
  getAll: async () => {
    return axios.get('/api/v1/prompts/category')
  },
}
