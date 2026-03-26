import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

// All user routes require authentication
router.use(auth);

// Profile management
router.get("/me", userController.getProfile);
router.put("/me", userController.updateProfile);
router.post("/me/avatar", userController.uploadAvatar);
router.put("/me/password", userController.updatePassword);
router.delete("/me", userController.deleteAccount);

// User's prompts
router.get("/me/prompts", userController.getMyPrompts);

export default router;
