import { useState } from 'react'
import { userApi } from '@/lib/api/user.api'
import { useAuth } from './useAuth'
import { handleApiError } from '@/lib/error-handler'

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { updateUser } = useAuth()

  const updateProfile = async (data: {
    username?: string
    bio?: string
  }) => {
    setIsLoading(true)
    try {
      const response: any = await userApi.updateProfile(data)
      // Transform camelCase to snake_case for frontend
      const transformedUser = {
        ...response,
        avatar_url: response.avatarUrl,
        is_verified: response.isVerified,
        created_at: response.createdAt,
        updated_at: response.updatedAt,
      }
      updateUser(transformedUser)
      return transformedUser
    } catch (error) {
      handleApiError(error, 'UpdateProfile')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const uploadAvatar = async (imageData: string) => {
    setIsLoading(true)
    try {
      const response: any = await userApi.uploadAvatar(imageData)
      console.log('Upload avatar response:', response)
      // Transform camelCase to snake_case for frontend
      const transformedUser = {
        ...response,
        avatar_url: response.avatarUrl,
        is_verified: response.isVerified,
        created_at: response.createdAt,
        updated_at: response.updatedAt,
      }
      console.log('Transformed user:', transformedUser)
      updateUser(transformedUser)
      return transformedUser
    } catch (error) {
      handleApiError(error, 'UploadAvatar')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async (data: {
    current_password: string
    new_password: string
  }) => {
    setIsLoading(true)
    try {
      const response = await userApi.updatePassword(data)
      return response
    } catch (error) {
      handleApiError(error, 'UpdatePassword')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAccount = async () => {
    setIsLoading(true)
    try {
      const response = await userApi.deleteAccount()
      return response
    } catch (error) {
      handleApiError(error, 'DeleteAccount')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getMyPrompts = async (page = 1, limit = 12) => {
    setIsLoading(true)
    try {
      const response = await userApi.getMyPrompts(page, limit)
      return response
    } catch (error) {
      handleApiError(error, 'GetMyPrompts')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    updateProfile,
    uploadAvatar,
    updatePassword,
    deleteAccount,
    getMyPrompts,
  }
}
