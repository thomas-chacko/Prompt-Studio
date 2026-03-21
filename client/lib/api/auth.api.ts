import axios from '../axios'

interface SignupData {
  username: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

interface AuthResponse {
  success: boolean
  data: {
    user: {
      id: string
      username: string
      email: string
      role: 'user' | 'admin'
      avatar_url?: string
      bio?: string
      plan: 'free' | 'pro'
      is_verified: boolean
    }
    token: string
  }
}

export const authApi = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    return axios.post('/api/v1/auth/signup', data)
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    return axios.post('/api/v1/auth/login', data)
  },

  logout: async (): Promise<{ success: boolean }> => {
    return axios.post('/api/v1/auth/logout')
  },
}
