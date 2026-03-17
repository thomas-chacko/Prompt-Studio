import { Router } from "express";

import promptRoutes from "./prompt.routes.js";
import categoryRoutes from "./category.routes.js";

const router = Router();

// ─── Health Check ─────────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "PromptStudio API is healthy" });
});

// ─── Resource Routes ──────────────────────────────────────────────────────────
router.use("/prompts", promptRoutes);
router.use("/categories", categoryRoutes);

export default router;
