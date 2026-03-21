import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/lib/api'

export const useAuth = () => {
  const { user, token, isAuthenticated, setAuth, clearAuth, updateUser } = useAuthStore()

  const signup = async (username: string, email: string, password: string) => {
    const response = await authApi.signup({ username, email, password })
    setAuth(response.data.user, response.data.token)
    return response
  }

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password })
    setAuth(response.data.user, response.data.token)
    return response
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      clearAuth()
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    signup,
    login,
    logout,
    updateUser,
  }
}
