import axios from '../axios'

export const categoryApi = {
  getAll: async () => {
    return axios.get('/prompts/category')
  },
}
