import axios from '../axios'

interface UpdateProfileData {
  username?: string
  bio?: string
}

interface UpdatePasswordData {
  current_password: string
  new_password: string
}

export const userApi = {
  getProfile: async () => {
    return axios.get('/api/v1/user/me')
  },

  updateProfile: async (data: UpdateProfileData) => {
    return axios.put('/api/v1/user/me', data)
  },

  uploadAvatar: async (imageData: string) => {
    return axios.post('/api/v1/user/me/avatar', { image: imageData })
  },

  updatePassword: async (data: UpdatePasswordData) => {
    return axios.put('/api/v1/user/me/password', data)
  },

  deleteAccount: async () => {
    return axios.delete('/api/v1/user/me')
  },

  getMyPrompts: async (page = 1, limit = 12) => {
    return axios.get('/api/v1/user/me/prompts', { params: { page, limit } })
  },
}
