import { Router } from "express";
import * as promptController from "../controllers/prompt.controller.js";

const router = Router();

router.get("/", promptController.getAll);
router.get("/:id", promptController.getById);
router.post("/", promptController.create);

export default router;
