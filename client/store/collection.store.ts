import { create } from 'zustand'

interface Collection {
  id: number
  user_id: string
  name: string
  is_public: boolean
  cover_image?: string
  created_at: string
  _count?: {
    items: number
  }
}

interface CollectionState {
  collections: Collection[]
  
  setCollections: (collections: Collection[]) => void
  addCollection: (collection: Collection) => void
  removeCollection: (id: number) => void
  updateCollection: (id: number, updates: Partial<Collection>) => void
}

export const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],

  setCollections: (collections) => set({ collections }),
  
  addCollection: (collection) => 
    set((state) => ({ collections: [...state.collections, collection] })),
  
  removeCollection: (id) => 
    set((state) => ({ 
      collections: state.collections.filter((c) => c.id !== id) 
    })),
  
  updateCollection: (id, updates) => 
    set((state) => ({
      collections: state.collections.map((c) => 
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
}))
