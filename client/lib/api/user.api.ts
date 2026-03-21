import axios from '../axios'

interface UpdateProfileData {
  username?: string
  bio?: string
  avatar_url?: string
}

interface UpdatePasswordData {
  current_password: string
  new_password: string
}

export const userApi = {
  getProfile: async () => {
    return axios.get('/user/me')
  },

  updateProfile: async (data: UpdateProfileData) => {
    return axios.put('/user/me', data)
  },

  updatePassword: async (data: UpdatePasswordData) => {
    return axios.put('/user/me/password', data)
  },

  deleteAccount: async () => {
    return axios.delete('/user/me')
  },

  getMyPrompts: async (page = 1, limit = 12) => {
    return axios.get('/user/me/prompts', { params: { page, limit } })
  },
}
