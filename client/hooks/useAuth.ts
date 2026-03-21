import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/lib/api'
import { handleApiError } from '@/lib/error-handler'

export const useAuth = () => {
  const { user, token, isAuthenticated, setAuth, clearAuth, updateUser } = useAuthStore()

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await authApi.signup({ username, email, password })
      setAuth(response.data.user, response.data.token)
      return response
    } catch (err) {
      const error = handleApiError(err, 'Signup')
      throw new Error(error.message)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password })
      setAuth(response.data.user, response.data.token)
      return response
    } catch (err) {
      const error = handleApiError(err, 'Login')
      throw new Error(error.message)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      const error = handleApiError(err, 'Logout')
      throw new Error(error.message)
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
