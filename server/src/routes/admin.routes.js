import { Router } from 'express'
import auth from '../middleware/auth.js'
import adminOnly from '../middleware/adminOnly.js'
import * as adminController from '../controllers/admin.controller.js'

const router = Router()

// All admin routes require authentication + admin role
router.use(auth, adminOnly)

// ============================================================================
// PLATFORM STATS
// ============================================================================
router.get('/stats', adminController.getStats)

// ============================================================================
// USER MANAGEMENT
// ============================================================================
router.get('/users', adminController.getUsers)
router.put('/users/:id/role', adminController.updateUserRole)
router.delete('/users/:id', adminController.deleteUser)

// ============================================================================
// PROMPT MANAGEMENT
// ============================================================================
router.get('/prompts', adminController.getPrompts)
router.put('/prompts/:id', adminController.updatePrompt)
router.delete('/prompts/:id', adminController.deletePrompt)

// ============================================================================
// CATEGORY MANAGEMENT
// ============================================================================
router.get('/categories', adminController.getCategories)
router.post('/categories', adminController.createCategory)
router.put('/categories/:id', adminController.updateCategory)
router.delete('/categories/:id', adminController.deleteCategory)

// ============================================================================
// GENERATION MONITORING
// ============================================================================
router.get('/generations', adminController.getGenerations)

export default router
