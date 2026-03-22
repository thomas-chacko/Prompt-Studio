import createError from '../utils/createError.js'

/**
 * Admin-only middleware — checks if req.user.role is 'admin'
 * Must be used AFTER auth middleware
 * Throws 403 if user is not an admin
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return next(createError(401, 'Authentication required'))
  }

  if (req.user.role !== 'admin') {
    return next(createError(403, 'Admin access required'))
  }

  next()
}

export default adminOnly
