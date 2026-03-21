import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import auth from '../middleware/auth.js'

const router = Router()

// Public routes
router.post('/signup', authController.signup)
router.post('/login', authController.login)

// Protected routes
router.post('/logout', auth, authController.logout)

export default router
