import asyncHandler from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/apiResponse.js'
import * as authService from '../services/auth.service.js'

/**
 * POST /api/v1/auth/signup
 * Create new user account
 */
export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  
  const result = await authService.signup({ username, email, password })
  
  sendSuccess(res, result, 201)
})

/**
 * POST /api/v1/auth/login
 * Authenticate user and return JWT
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  const result = await authService.login({ email, password })
  
  sendSuccess(res, result)
})

/**
 * POST /api/v1/auth/logout
 * Invalidate current JWT token
 */
export const logout = asyncHandler(async (req, res) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : null

  const result = await authService.logout(token)
  
  sendSuccess(res, result)
})
