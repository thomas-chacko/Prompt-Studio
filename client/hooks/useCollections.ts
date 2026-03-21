import { useState, useEffect } from 'react'
import { useCollectionStore } from '@/store/collection.store'
import { collectionApi } from '@/lib/api'

export const useCollections = () => {
  const { collections, setCollections, addCollection, removeCollection } = useCollectionStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCollections = async () => {
    try {
      setLoading(true)
      const response = await collectionApi.getAll()
      setCollections(response.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch collections')
    } finally {
      setLoading(false)
    }
  }

  const createCollection = async (name: string, is_public = false) => {
    try {
      const response = await collectionApi.create({ name, is_public })
      addCollection(response.data)
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create collection')
      throw err
    }
  }

  const deleteCollection = async (id: number) => {
    try {
      await collectionApi.delete(id)
      removeCollection(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete collection')
      throw err
    }
  }

  const addPromptToCollection = async (collectionId: number, promptId: number) => {
    try {
      await collectionApi.addPrompt(collectionId, promptId)
      await fetchCollections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add prompt to collection')
      throw err
    }
  }

  const removePromptFromCollection = async (collectionId: number, promptId: number) => {
    try {
      await collectionApi.removePrompt(collectionId, promptId)
      await fetchCollections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove prompt from collection')
      throw err
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  return {
    collections,
    loading,
    error,
    fetchCollections,
    createCollection,
    deleteCollection,
    addPromptToCollection,
    removePromptFromCollection,
  }
}
