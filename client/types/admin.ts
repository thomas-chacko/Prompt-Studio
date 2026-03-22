// Admin-related TypeScript type definitions

export interface PlatformStats {
  overview: {
    totalUsers: number
    totalPrompts: number
    totalGenerations: number
    totalCategories: number
    publishedPrompts: number
    unpublishedPrompts: number
    adminUsers: number
    proUsers: number
  }
  recentActivity: {
    newUsersThisWeek: number
    newPromptsThisWeek: number
    generationsThisWeek: number
  }
}

export interface AdminUser {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
  plan: 'free' | 'pro'
  avatarUrl?: string
  isVerified: boolean
  createdAt: string
  _count: {
    prompts: number
    generations: number
    collections: number
  }
}

export interface AdminPrompt {
  id: number
  title: string
  prompt: string
  image: string
  modelUsed?: string
  tags: string[]
  totalCopiedCount: number
  totalLikes: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
  author: {
    id: string
    username: string
    email: string
  }
  category: {
    id: number
    category: string
    slug: string
  }
}

export interface AdminCategory {
  id: number
  category: string
  slug: string
  imageUrl?: string
  totalPromptsCount: number
  createdAt: string
  _count: {
    prompts: number
  }
}

export interface AdminGeneration {
  id: string
  promptUsed: string
  aspectRatio: string
  style?: string
  model: string
  apiKeySource: 'own' | 'free'
  imageUrls: string[]
  savedAsPromptId?: number
  createdAt: string
  user: {
    id: string
    username: string
    email: string
  }
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface AdminUsersResponse {
  success: boolean
  data: AdminUser[]
  meta: PaginationMeta
}

export interface AdminPromptsResponse {
  success: boolean
  data: AdminPrompt[]
  meta: PaginationMeta
}

export interface AdminGenerationsResponse {
  success: boolean
  data: AdminGeneration[]
  meta: PaginationMeta
}
