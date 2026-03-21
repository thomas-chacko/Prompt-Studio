export interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
  avatar_url?: string
  bio?: string
  plan: 'free' | 'pro'
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Prompt {
  id: number
  author_id: string
  category_id: number
  title: string
  prompt: string
  image: string
  model_used?: string
  tags: string[]
  total_copied_count: number
  total_likes: number
  is_published: boolean
  created_at: string
  updated_at: string
  author?: {
    id: string
    username: string
    avatar_url?: string
  }
  category?: {
    id: number
    category: string
    slug: string
  }
  is_liked?: boolean
}

export interface Category {
  id: number
  category: string
  slug: string
  image_url?: string
  total_prompts_count: number
  created_at: string
}

export interface Generation {
  id: string
  user_id: string
  prompt_used: string
  aspect_ratio: string
  style?: string
  model: string
  api_key_source: 'own' | 'free'
  image_urls: string[]
  saved_as_prompt_id?: number
  created_at: string
}

export interface Collection {
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

export interface GenerationQuota {
  free_used: number
  free_limit: number
  resets_at: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  meta?: PaginationMeta
}

export interface ApiError {
  success: false
  message: string
}
