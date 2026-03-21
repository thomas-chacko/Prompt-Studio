import axios from '../axios'

interface SearchParams {
  query: string
  page?: number
  limit?: number
}

export const searchApi = {
  search: async ({ query, page = 1, limit = 12 }: SearchParams) => {
    return axios.post('/search', { query, page, limit })
  },
}
