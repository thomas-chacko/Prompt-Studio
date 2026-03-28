import prisma from "../config/prisma.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import { uploadImage, deleteImage, getPublicId } from "../utils/cloudinary.js";

export const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      role: true,
      plan: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) throw createError(404, "User not found");
  return user;
};

export const updateProfile = async (userId, data) => {
  const { username, bio } = data;

  // Check if username is taken by another user
  if (username) {
    const existing = await prisma.user.findFirst({
      where: {
        username,
        NOT: { id: userId },
      },
    });
    if (existing) throw createError(409, "Username already taken");
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(username && { username }),
      ...(bio !== undefined && { bio }),
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      role: true,
      plan: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updated;
};

export const uploadAvatar = async (userId, imageSource) => {
  // Get current user to check for existing avatar
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { avatarUrl: true },
  });

  if (!user) throw createError(404, "User not found");

  // Delete old avatar from Cloudinary if exists
  if (user.avatarUrl) {
    try {
      const publicId = getPublicId(user.avatarUrl);
      await deleteImage(publicId);
    } catch (error) {
      // Continue even if deletion fails (old image might not exist)
      console.error("Failed to delete old avatar:", error.message);
    }
  }

  // Upload new avatar to Cloudinary
  const avatarUrl = await uploadImage(
    imageSource,
    `promptstudio/avatars/${userId}`
  );

  // Update user with new avatar URL
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl: avatarUrl },
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      role: true,
      plan: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updated;
};

export const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw createError(404, "User not found");

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) throw createError(400, "Current password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });

  return { message: "Password updated successfully" };
};

export const deleteAccount = async (userId) => {
  await prisma.user.delete({
    where: { id: userId },
  });

  return { message: "Account deleted successfully" };
};

export const getMyPrompts = async (userId, page = 1, limit = 12) => {
  const skip = (page - 1) * limit;

  const [prompts, total] = await Promise.all([
    prisma.prompt.findMany({
      where: { authorId: userId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        category: {
          select: {
            id: true,
            category: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.prompt.count({
      where: { authorId: userId },
    }),
  ]);

  return {
    prompts,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
