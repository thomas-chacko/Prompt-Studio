import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess, sendPaginated } from "../utils/apiResponse.js";
import * as promptService from "../services/prompt.service.js";

/**
 * GET /api/prompts
 * Supports: ?page, ?limit, ?category, ?search, ?sort
 */
export const getAll = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, category, search, sort } = req.query;
  const { prompts, total } = await promptService.findAll({ page: +page, limit: +limit, category, search, sort });

  sendPaginated(res, prompts, {
    page: +page,
    limit: +limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

/**
 * GET /api/prompts/:id
 */
export const getById = asyncHandler(async (req, res) => {
  const prompt = await promptService.findById(req.params.id);
  sendSuccess(res, prompt);
});

/**
 * POST /api/prompts
 */
export const create = asyncHandler(async (req, res) => {
  const prompt = await promptService.create(req.body);
  sendSuccess(res, prompt, 201);
});
