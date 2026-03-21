import { useState } from 'react'
import { useGenerationStore } from '@/store/generation.store'
import { generateApi } from '@/lib/api'

interface GenerateImageParams {
  prompt: string
  use_own_key: boolean
  aspect_ratio?: string
  style?: string
  number_of_images?: number
}

export const useGeneration = () => {
  const { quota, isGenerating, setQuota, setGenerating, addGeneration } = useGenerationStore()
  const [error, setError] = useState<string | null>(null)

  const generateImage = async (params: GenerateImageParams) => {
    try {
      setGenerating(true)
      setError(null)
      
      const response = await generateApi.generateImage(params)
      
      if (response.data.generation) {
        addGeneration(response.data.generation)
      }
      
      if (response.data.free_generations_remaining !== undefined) {
        setQuota({
          free_used: quota?.free_limit ? quota.free_limit - response.data.free_generations_remaining : 0,
          free_limit: quota?.free_limit || 10,
          resets_at: quota?.resets_at || new Date().toISOString(),
        })
      }
      
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate image'
      setError(message)
      throw err
    } finally {
      setGenerating(false)
    }
  }

  const enhancePrompt = async (raw_prompt: string, style_hint?: string) => {
    try {
      setError(null)
      return await generateApi.enhancePrompt({ raw_prompt, style_hint })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to enhance prompt'
      setError(message)
      throw err
    }
  }

  const fetchQuota = async () => {
    try {
      const response = await generateApi.getQuota()
      setQuota(response.data)
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quota')
      throw err
    }
  }

  return {
    quota,
    isGenerating,
    error,
    generateImage,
    enhancePrompt,
    fetchQuota,
  }
}
