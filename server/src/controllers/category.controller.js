import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import * as categoryService from "../services/category.service.js";

/**
 * GET /api/categories
 */
export const getAll = asyncHandler(async (_req, res) => {
  const categories = await categoryService.findAll();
  sendSuccess(res, categories);
});

/**
 * GET /api/categories/:slug
 */
export const getBySlug = asyncHandler(async (req, res) => {
  const category = await categoryService.findBySlug(req.params.slug);
  sendSuccess(res, category);
});
