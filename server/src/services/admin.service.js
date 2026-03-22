import prisma from '../config/prisma.js'
import createError from '../utils/createError.js'
import { deleteImage } from '../utils/cloudinary.js'

/**
 * Get platform statistics for admin dashboard
 */
export const getPlatformStats = async () => {
  const [
    totalUsers,
    totalPrompts,
    totalGenerations,
    totalCategories,
    publishedPrompts,
    unpublishedPrompts,
    adminUsers,
    proUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.prompt.count(),
    prisma.generation.count(),
    prisma.category.count(),
    prisma.prompt.count({ where: { isPublished: true } }),
    prisma.prompt.count({ where: { isPublished: false } }),
    prisma.user.count({ where: { role: 'admin' } }),
    prisma.user.count({ where: { plan: 'pro' } }),
  ])

  // Get recent activity (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const [newUsersThisWeek, newPromptsThisWeek, generationsThisWeek] =
    await Promise.all([
      prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.prompt.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.generation.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    ])

  return {
    overview: {
      totalUsers,
      totalPrompts,
      totalGenerations,
      totalCategories,
      publishedPrompts,
      unpublishedPrompts,
      adminUsers,
      proUsers,
    },
    recentActivity: {
      newUsersThisWeek,
      newPromptsThisWeek,
      generationsThisWeek,
    },
  }
}

/**
 * Get all users with pagination and filtering
 */
export const getAllUsers = async ({ page = 1, limit = 20, role, plan, search }) => {
  const skip = (page - 1) * limit
  const where = {}

  if (role) where.role = role
  if (plan) where.plan = plan
  if (search) {
    where.OR = [
      { username: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        plan: true,
        avatarUrl: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: {
            prompts: true,
            generations: true,
            collections: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ])

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

/**
 * Update user role (admin only)
 */
export const updateUserRole = async (userId, newRole) => {
  if (!['user', 'admin'].includes(newRole)) {
    throw createError(400, 'Invalid role. Must be "user" or "admin"')
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw createError(404, `User with id "${userId}" not found`)
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      plan: true,
      createdAt: true,
    },
  })

  return updatedUser
}

/**
 * Delete user (admin force delete)
 */
export const deleteUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      prompts: { select: { image: true } },
      apiKey: true,
    },
  })

  if (!user) {
    throw createError(404, `User with id "${userId}" not found`)
  }

  // Delete all user's prompt images from Cloudinary
  for (const prompt of user.prompts) {
    try {
      const publicId = extractPublicId(prompt.image)
      await deleteImage(publicId)
    } catch (error) {
      console.error(`Failed to delete image for prompt: ${error.message}`)
    }
  }

  // Delete user (cascades to all related records)
  await prisma.user.delete({ where: { id: userId } })

  return { message: 'User deleted successfully' }
}

/**
 * Get all prompts with pagination and filtering (admin view)
 */
export const getAllPrompts = async ({
  page = 1,
  limit = 20,
  isPublished,
  categoryId,
  search,
}) => {
  const skip = (page - 1) * limit
  const where = {}

  if (typeof isPublished === 'boolean') where.isPublished = isPublished
  if (categoryId) where.categoryId = Number(categoryId)
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { prompt: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [prompts, total] = await Promise.all([
    prisma.prompt.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            category: true,
            slug: true,
          },
        },
      },
    }),
    prisma.prompt.count({ where }),
  ])

  return {
    prompts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

/**
 * Update prompt (admin can edit any prompt)
 */
export const updatePrompt = async (promptId, updateData) => {
  const prompt = await prisma.prompt.findUnique({ where: { id: promptId } })
  if (!prompt) {
    throw createError(404, `Prompt with id "${promptId}" not found`)
  }

  const updatedPrompt = await prisma.prompt.update({
    where: { id: promptId },
    data: updateData,
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      category: {
        select: {
          id: true,
          category: true,
          slug: true,
        },
      },
    },
  })

  return updatedPrompt
}

/**
 * Delete prompt (admin force delete)
 */
export const deletePrompt = async (promptId) => {
  const prompt = await prisma.prompt.findUnique({
    where: { id: promptId },
  })

  if (!prompt) {
    throw createError(404, `Prompt with id "${promptId}" not found`)
  }

  // Delete image from Cloudinary
  try {
    const publicId = extractPublicId(prompt.image)
    await deleteImage(publicId)
  } catch (error) {
    console.error(`Failed to delete image: ${error.message}`)
  }

  // Update category prompt count
  await prisma.category.update({
    where: { id: prompt.categoryId },
    data: { totalPromptsCount: { decrement: 1 } },
  })

  // Delete prompt
  await prisma.prompt.delete({ where: { id: promptId } })

  return { message: 'Prompt deleted successfully' }
}

/**
 * Get all categories (admin view with full details)
 */
export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { totalPromptsCount: 'desc' },
    include: {
      _count: {
        select: {
          prompts: true,
        },
      },
    },
  })

  return categories
}

/**
 * Create category (admin only)
 */
export const createCategory = async (categoryData) => {
  const { category, slug, imageUrl } = categoryData

  // Check if category or slug already exists
  const existing = await prisma.category.findFirst({
    where: {
      OR: [{ category }, { slug }],
    },
  })

  if (existing) {
    throw createError(409, 'Category or slug already exists')
  }

  const newCategory = await prisma.category.create({
    data: {
      category,
      slug,
      imageUrl,
    },
  })

  return newCategory
}

/**
 * Update category (admin only)
 */
export const updateCategory = async (categoryId, updateData) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  })

  if (!category) {
    throw createError(404, `Category with id "${categoryId}" not found`)
  }

  // Check for duplicate category name or slug
  if (updateData.category || updateData.slug) {
    const existing = await prisma.category.findFirst({
      where: {
        AND: [
          { id: { not: categoryId } },
          {
            OR: [
              updateData.category ? { category: updateData.category } : {},
              updateData.slug ? { slug: updateData.slug } : {},
            ],
          },
        ],
      },
    })

    if (existing) {
      throw createError(409, 'Category name or slug already exists')
    }
  }

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: updateData,
  })

  return updatedCategory
}

/**
 * Delete category (admin only)
 */
export const deleteCategory = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      _count: {
        select: {
          prompts: true,
        },
      },
    },
  })

  if (!category) {
    throw createError(404, `Category with id "${categoryId}" not found`)
  }

  if (category._count.prompts > 0) {
    throw createError(
      400,
      `Cannot delete category with ${category._count.prompts} prompts. Reassign or delete prompts first.`
    )
  }

  await prisma.category.delete({ where: { id: categoryId } })

  return { message: 'Category deleted successfully' }
}

/**
 * Get all generations (admin view)
 */
export const getAllGenerations = async ({ page = 1, limit = 20, userId, apiKeySource }) => {
  const skip = (page - 1) * limit
  const where = {}

  if (userId) where.userId = userId
  if (apiKeySource) where.apiKeySource = apiKeySource

  const [generations, total] = await Promise.all([
    prisma.generation.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    }),
    prisma.generation.count({ where }),
  ])

  return {
    generations,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

/**
 * Helper: Extract Cloudinary public ID from URL
 */
const extractPublicId = (url) => {
  // e.g. https://res.cloudinary.com/demo/image/upload/v123/promptstudio/prompts/abc.jpg
  // → promptstudio/prompts/abc
  const parts = url.split('/')
  const filename = parts[parts.length - 1].split('.')[0]
  const folder = parts.slice(-3, -1).join('/')
  return `${folder}/${filename}`
}
