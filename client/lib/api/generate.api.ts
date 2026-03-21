import axios from '../axios'

interface GenerateImageData {
  prompt: string
  use_own_key: boolean
  aspect_ratio?: string
  style?: string
  number_of_images?: number
}

interface EnhancePromptData {
  raw_prompt: string
  style_hint?: string
}

interface SaveToGalleryData {
  generation_id: string
  title: string
  category_id: number
  tags?: string[]
}

export const generateApi = {
  generateImage: async (data: GenerateImageData) => {
    return axios.post('/generate/image', data)
  },

  enhancePrompt: async (data: EnhancePromptData) => {
    return axios.post('/generate/image/enhance-prompt', data)
  },

  getHistory: async (page = 1, limit = 20) => {
    return axios.get('/generate/history', { params: { page, limit } })
  },

  deleteHistory: async (id: string) => {
    return axios.delete(`/generate/history/${id}`)
  },

  saveToGallery: async (data: SaveToGalleryData) => {
    return axios.post('/generate/save-to-gallery', data)
  },

  getQuota: async () => {
    return axios.get('/generate/quota')
  },
}
