import asyncHandler from '../utils/asyncHandler.js'
import { sendSuccess, sendPaginated } from '../utils/apiResponse.js'
import * as adminService from '../services/admin.service.js'

/**
 * GET /api/v1/admin/stats
 * Get platform statistics
 */
export const getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getPlatformStats()
  sendSuccess(res, stats)
})

/**
 * GET /api/v1/admin/users
 * Get all users with pagination and filtering
 */
export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, role, plan, search } = req.query
  const result = await adminService.getAllUsers({
    page: Number(page) || 1,
    limit: Number(limit) || 20,
    role,
    plan,
    search,
  })
  sendPaginated(res, result.users, result.pagination)
})

/**
 * PUT /api/v1/admin/users/:id/role
 * Update user role
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { role } = req.body

  if (!role) {
    return res.status(400).json({
      success: false,
      message: 'Role is required',
    })
  }

  const user = await adminService.updateUserRole(id, role)
  sendSuccess(res, user)
})

/**
 * DELETE /api/v1/admin/users/:id
 * Delete user (force delete)
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await adminService.deleteUser(id)
  sendSuccess(res, result)
})

/**
 * GET /api/v1/admin/prompts
 * Get all prompts with pagination and filtering
 */
export const getPrompts = asyncHandler(async (req, res) => {
  const { page, limit, isPublished, categoryId, search } = req.query
  const result = await adminService.getAllPrompts({
    page: Number(page) || 1,
    limit: Number(limit) || 20,
    isPublished: isPublished === 'true' ? true : isPublished === 'false' ? false : undefined,
    categoryId,
    search,
  })
  sendPaginated(res, result.prompts, result.pagination)
})

/**
 * PUT /api/v1/admin/prompts/:id
 * Update prompt
 */
export const updatePrompt = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  const prompt = await adminService.updatePrompt(Number(id), updateData)
  sendSuccess(res, prompt)
})

/**
 * DELETE /api/v1/admin/prompts/:id
 * Delete prompt (force delete)
 */
export const deletePrompt = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await adminService.deletePrompt(Number(id))
  sendSuccess(res, result)
})

/**
 * GET /api/v1/admin/categories
 * Get all categories
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await adminService.getAllCategories()
  sendSuccess(res, categories)
})

/**
 * POST /api/v1/admin/categories
 * Create category
 */
export const createCategory = asyncHandler(async (req, res) => {
  const category = await adminService.createCategory(req.body)
  res.status(201).json({
    success: true,
    data: category,
  })
})

/**
 * PUT /api/v1/admin/categories/:id
 * Update category
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const category = await adminService.updateCategory(Number(id), req.body)
  sendSuccess(res, category)
})

/**
 * DELETE /api/v1/admin/categories/:id
 * Delete category
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await adminService.deleteCategory(Number(id))
  sendSuccess(res, result)
})

/**
 * GET /api/v1/admin/generations
 * Get all generations
 */
export const getGenerations = asyncHandler(async (req, res) => {
  const { page, limit, userId, apiKeySource } = req.query
  const result = await adminService.getAllGenerations({
    page: Number(page) || 1,
    limit: Number(limit) || 20,
    userId,
    apiKeySource,
  })
  sendPaginated(res, result.generations, result.pagination)
})
