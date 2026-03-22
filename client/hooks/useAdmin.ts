import { useState } from 'react'
import { adminApi } from '@/lib/api'
import { handleApiError } from '@/lib/error-handler'
import { useToast } from '@/components/toast'

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  // Platform Stats
  const getStats = async () => {
    setIsLoading(true)
    try {
      const response = await adminApi.getStats()
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'GetStats')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // User Management
  const getUsers = async (params?: {
    page?: number
    limit?: number
    role?: 'user' | 'admin'
    plan?: 'free' | 'pro'
    search?: string
  }) => {
    setIsLoading(true)
    try {
      const response = await adminApi.getUsers(params)
      return response
    } catch (err) {
      const error = handleApiError(err, 'GetUsers')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserRole = async (userId: string, role: 'user' | 'admin') => {
    setIsLoading(true)
    try {
      const response = await adminApi.updateUserRole(userId, role)
      toast.success(`User role updated to ${role}`)
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'UpdateUserRole')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async (userId: string) => {
    setIsLoading(true)
    try {
      const response = await adminApi.deleteUser(userId)
      toast.success('User deleted successfully')
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'DeleteUser')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Prompt Management
  const getPrompts = async (params?: {
    page?: number
    limit?: number
    isPublished?: boolean
    categoryId?: number
    search?: string
  }) => {
    setIsLoading(true)
    try {
      const response = await adminApi.getPrompts(params)
      return response
    } catch (err) {
      const error = handleApiError(err, 'GetPrompts')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updatePrompt = async (promptId: number, data: any) => {
    setIsLoading(true)
    try {
      const response = await adminApi.updatePrompt(promptId, data)
      toast.success('Prompt updated successfully')
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'UpdatePrompt')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deletePrompt = async (promptId: number) => {
    setIsLoading(true)
    try {
      const response = await adminApi.deletePrompt(promptId)
      toast.success('Prompt deleted successfully')
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'DeletePrompt')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Category Management
  const getCategories = async () => {
    setIsLoading(true)
    try {
      const response = await adminApi.getCategories()
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'GetCategories')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createCategory = async (data: {
    category: string
    slug: string
    imageUrl?: string
  }) => {
    setIsLoading(true)
    try {
      const response = await adminApi.createCategory(data)
      toast.success('Category created successfully')
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'CreateCategory')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateCategory = async (categoryId: number, data: any) => {
    setIsLoading(true)
    try {
      const response = await adminApi.updateCategory(categoryId, data)
      toast.success('Category updated successfully')
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'UpdateCategory')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCategory = async (categoryId: number) => {
    setIsLoading(true)
    try {
      const response = await adminApi.deleteCategory(categoryId)
      toast.success('Category deleted successfully')
      return response.data
    } catch (err) {
      const error = handleApiError(err, 'DeleteCategory')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Generation Monitoring
  const getGenerations = async (params?: {
    page?: number
    limit?: number
    userId?: string
    apiKeySource?: 'own' | 'free'
  }) => {
    setIsLoading(true)
    try {
      const response = await adminApi.getGenerations(params)
      return response
    } catch (err) {
      const error = handleApiError(err, 'GetGenerations')
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    getStats,
    getUsers,
    updateUserRole,
    deleteUser,
    getPrompts,
    updatePrompt,
    deletePrompt,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getGenerations,
  }
}
