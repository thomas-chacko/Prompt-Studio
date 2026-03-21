import { PrismaClient } from '@prisma/client'
import { NODE_ENV } from './env.js'

/**
 * Prisma client singleton.
 * Import this in all services — never instantiate PrismaClient directly.
 */
const prisma = new PrismaClient({
  log: NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

export default prisma
