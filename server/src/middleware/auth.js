import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import createError from '../utils/createError.js'
import { isTokenBlocklisted } from '../services/auth.service.js'

/**
 * Auth middleware — verifies JWT and attaches req.user
 * Throws 401 if token is missing, invalid, expired, or blocklisted
 */
const auth = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError(401, 'Authorization token required')
    }

    const token = authHeader.substring(7)

    // Verify token signature and expiry
    const decoded = jwt.verify(token, JWT_SECRET)

    // Check if token is blocklisted (logged out)
    const isBlocked = await isTokenBlocklisted(token)
    if (isBlocked) {
      throw createError(401, 'Token has been invalidated')
    }

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    }

    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid token'))
    }
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired'))
    }
    next(error)
  }
}

export default auth
