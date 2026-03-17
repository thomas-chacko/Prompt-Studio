import { v4 as uuidv4 } from "uuid";
import createError from "../utils/createError.js";

/**
 * In-memory store — replace with DB queries (e.g. Mongoose/Prisma) when ready.
 * The interface of each method must NOT change when swapping the data layer.
 */
let prompts = [
  {
    id: "1",
    title: "SEO Blog Post Generator",
    description: "Generate a fully SEO-optimised blog post on any topic.",
    category: "seo",
    model: "ChatGPT",
    tags: ["seo", "blog", "content"],
    copyCount: 1240,
    createdAt: new Date("2025-01-10").toISOString(),
  },
];

export const findAll = async ({ page, limit, category, search, sort }) => {
  let result = [...prompts];

  if (category) result = result.filter((p) => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  if (sort === "popular") result.sort((a, b) => b.copyCount - a.copyCount);
  if (sort === "newest") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = result.length;
  const start = (page - 1) * limit;
  const data = result.slice(start, start + limit);

  return { prompts: data, total };
};

export const findById = async (id) => {
  const prompt = prompts.find((p) => p.id === id);
  if (!prompt) throw createError(404, `Prompt with id "${id}" not found`);
  return prompt;
};

export const create = async (body) => {
  const { title, description, category, model, tags } = body;

  if (!title || !description || !category) {
    throw createError(400, "title, description, and category are required");
  }

  const newPrompt = {
    id: uuidv4(),
    title,
    description,
    category,
    model: model || "ChatGPT",
    tags: tags || [],
    copyCount: 0,
    createdAt: new Date().toISOString(),
  };

  prompts.push(newPrompt);
  return newPrompt;
};
