import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js'
import { JWT_SECRET, JWT_EXPIRES_IN, GEMINI_FREE_LIMIT } from '../config/env.js'
import createError from '../utils/createError.js'

const BCRYPT_ROUNDS = 12

/**
 * Signup — create new user account
 */
export const signup = async ({ username, email, password }) => {
  // Validate input
  if (!username || !email || !password) {
    throw createError(400, 'Username, email, and password are required')
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim()

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: normalizedEmail },
        { username }
      ]
    }
  })

  if (existingUser) {
    if (existingUser.email === normalizedEmail) {
      throw createError(409, 'Email already registered')
    }
    throw createError(409, 'Username already taken')
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

  // Create user and generation quota in transaction
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        username,
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatarUrl: true,
        bio: true,
        plan: true,
        isVerified: true,
        createdAt: true,
      }
    })

    // Initialize generation quota
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setUTCHours(24, 0, 0, 0)

    await tx.generationQuota.create({
      data: {
        userId: newUser.id,
        freeUsed: 0,
        freeLimit: GEMINI_FREE_LIMIT,
        periodStart: now,
        resetsAt: tomorrow,
      }
    })

    return newUser
  })

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )

  return { user, token }
}

/**
 * Login — authenticate existing user
 */
export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw createError(400, 'Email and password are required')
  }

  const normalizedEmail = email.toLowerCase().trim()

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      username: true,
      email: true,
      passwordHash: true,
      role: true,
      avatarUrl: true,
      bio: true,
      plan: true,
      isVerified: true,
      createdAt: true,
    }
  })

  if (!user) {
    throw createError(401, 'Invalid email or password')
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
  if (!isPasswordValid) {
    throw createError(401, 'Invalid email or password')
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )

  // Remove password hash from response
  const { passwordHash, ...userWithoutPassword } = user

  return { user: userWithoutPassword, token }
}

/**
 * Logout — invalidate token by adding to blocklist
 */
export const logout = async (token) => {
  if (!token) {
    throw createError(400, 'Token is required')
  }

  try {
    // Decode token to get expiry
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Calculate when this token expires
    const expiresAt = new Date(decoded.exp * 1000)

    // Add to blocklist (create table if needed)
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS token_blocklist (
        id SERIAL PRIMARY KEY,
        token TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await prisma.$executeRaw`
      INSERT INTO token_blocklist (token, expires_at)
      VALUES (${token}, ${expiresAt})
      ON CONFLICT (token) DO NOTHING
    `

    // Cleanup expired tokens (optional optimization)
    await prisma.$executeRaw`
      DELETE FROM token_blocklist
      WHERE expires_at < NOW()
    `

    return { message: 'Logged out successfully' }
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw createError(401, 'Invalid token')
    }
    throw error
  }
}

/**
 * Check if token is blocklisted
 */
export const isTokenBlocklisted = async (token) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT EXISTS(
        SELECT 1 FROM token_blocklist 
        WHERE token = ${token} AND expires_at > NOW()
      ) as blocked
    `
    return result[0]?.blocked || false
  } catch (error) {
    // If table doesn't exist yet, token is not blocked
    return false
  }
}
