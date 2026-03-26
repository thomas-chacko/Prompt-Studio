import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess, sendPaginated } from "../utils/apiResponse.js";
import * as userService from "../services/user.service.js";
import createError from "../utils/createError.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  sendSuccess(res, user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { username, bio } = req.body;

  if (!username && bio === undefined) {
    throw createError(400, "At least one field (username, bio) is required");
  }

  const user = await userService.updateProfile(req.user.id, {
    username,
    bio,
  });

  sendSuccess(res, user);
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.body.image) {
    throw createError(400, "Image data is required");
  }

  // req.body.image should be a base64 data URI or file path
  const user = await userService.uploadAvatar(req.user.id, req.body.image);

  sendSuccess(res, user);
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    throw createError(400, "Both current_password and new_password are required");
  }

  if (new_password.length < 8) {
    throw createError(400, "New password must be at least 8 characters long");
  }

  const result = await userService.updatePassword(
    req.user.id,
    current_password,
    new_password
  );

  sendSuccess(res, result);
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const result = await userService.deleteAccount(req.user.id);
  sendSuccess(res, result);
});

export const getMyPrompts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;

  const { prompts, meta } = await userService.getMyPrompts(req.user.id, page, limit);

  sendPaginated(res, prompts, meta);
});
