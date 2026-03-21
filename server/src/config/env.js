/**
 * Centralised environment config.
 * All process.env access should go through here — never read process.env directly in feature code.
 */

// Server
export const PORT     = process.env.PORT     || 5000
export const NODE_ENV = process.env.NODE_ENV || 'development'

// Database — Neon PostgreSQL
export const DATABASE_URL = process.env.DATABASE_URL

// Auth
export const JWT_SECRET     = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// CORS — comma-separated origins supported
export const CORS_ORIGIN = process.env.CORS_ORIGIN

// Gemini AI
export const GEMINI_API_KEY    = process.env.GEMINI_API_KEY
export const GEMINI_FREE_LIMIT = Number(process.env.GEMINI_FREE_LIMIT) || 10

// Encryption — AES-256-GCM for user Gemini API keys at rest
export const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY    = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
