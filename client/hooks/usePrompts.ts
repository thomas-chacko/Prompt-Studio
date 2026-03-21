import { useState, useEffect } from 'react'
import { promptApi } from '@/lib/api'
import type { Prompt, PaginationMeta } from '@/types'

export const usePrompts = (page = 1, limit = 12, categoryId?: number) => {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true)
        const response: any = await promptApi.getAll(page, limit, categoryId)
        setPrompts(response.data)
        setMeta(response.meta || null)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch prompts')
      } finally {
        setLoading(false)
      }
    }

    fetchPrompts()
  }, [page, limit, categoryId])

  return { prompts, meta, loading, error }
}
