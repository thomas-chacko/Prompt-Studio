import createError from "../utils/createError.js";

/** In-memory store — replace with DB queries when ready. */
const categories = [
  { slug: "seo", label: "SEO", icon: "🔍", promptCount: 48 },
  { slug: "copywriting", label: "Copywriting", icon: "✍️", promptCount: 62 },
  { slug: "coding", label: "Coding", icon: "💻", promptCount: 91 },
  { slug: "image", label: "Image Generation", icon: "🎨", promptCount: 37 },
  { slug: "business", label: "Business", icon: "📊", promptCount: 55 },
  { slug: "social-media", label: "Social Media", icon: "📱", promptCount: 44 },
];

export const findAll = async () => categories;

export const findBySlug = async (slug) => {
  const category = categories.find((c) => c.slug === slug);
  if (!category) throw createError(404, `Category "${slug}" not found`);
  return category;
};
