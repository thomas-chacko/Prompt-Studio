import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000'
  : 'https://prompt-studio-0egh.onrender.com'

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Helper to get token from Zustand persisted storage
const getToken = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      const parsed = JSON.parse(authStorage)
      return parsed.state?.token || null
    }
  } catch (error) {
    console.error('Error reading token from storage:', error)
  }
  return null
}

// Request interceptor — attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Only redirect to login if 401 AND it's an authentication issue (not validation)
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || ''
      const isAuthPage = typeof window !== 'undefined' && 
        (window.location.pathname === '/login' || window.location.pathname === '/signup')
      
      // Don't redirect if it's a validation error (like wrong password)
      // Only redirect if token is invalid/expired
      const isTokenInvalid = errorMessage.toLowerCase().includes('token') || 
                            errorMessage.toLowerCase().includes('unauthorized') ||
                            errorMessage.toLowerCase().includes('authentication') ||
                            errorMessage.toLowerCase().includes('authorization')
      
      if (!isAuthPage && isTokenInvalid) {
        // Clear Zustand persisted storage
        localStorage.removeItem('auth-storage')
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }
    
    const message = error.response?.data?.message || error.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export default axiosInstance
