import { create } from 'zustand'

interface GenerationQuota {
  free_used: number
  free_limit: number
  resets_at: string
}

interface GeneratedImage {
  url: string
  width: number
  height: number
}

interface Generation {
  id: string
  prompt_used: string
  aspect_ratio: string
  style?: string
  model: string
  api_key_source: 'own' | 'free'
  image_urls: string[]
  created_at: string
}

interface GenerationState {
  quota: GenerationQuota | null
  history: Generation[]
  isGenerating: boolean
  
  setQuota: (quota: GenerationQuota) => void
  setHistory: (history: Generation[]) => void
  addGeneration: (generation: Generation) => void
  removeGeneration: (id: string) => void
  setGenerating: (isGenerating: boolean) => void
}

export const useGenerationStore = create<GenerationState>((set) => ({
  quota: null,
  history: [],
  isGenerating: false,

  setQuota: (quota) => set({ quota }),
  
  setHistory: (history) => set({ history }),
  
  addGeneration: (generation) => 
    set((state) => ({ history: [generation, ...state.history] })),
  
  removeGeneration: (id) => 
    set((state) => ({ 
      history: state.history.filter((g) => g.id !== id) 
    })),
  
  setGenerating: (isGenerating) => set({ isGenerating }),
}))
