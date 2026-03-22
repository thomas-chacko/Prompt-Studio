import { Router } from "express";

import authRoutes from "./auth.routes.js";
import promptRoutes from "./prompt.routes.js";
import categoryRoutes from "./category.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

// ─── Health Check ─────────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "PromptStudio API is healthy" });
});

// ─── Resource Routes ──────────────────────────────────────────────────────────
router.use("/auth", authRoutes);
router.use("/prompts", promptRoutes);
router.use("/categories", categoryRoutes);
router.use("/admin", adminRoutes);

export default router;
