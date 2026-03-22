"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { FolderOpen, Plus, Edit2, Trash2, X } from "lucide-react";

export default function CategoriesTab() {
  const { getCategories, createCategory, updateCategory, deleteCategory, isLoading } = useAdmin();
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ category: "", slug: "", imageUrl: "" });
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const validateForm = () => {
    const errors: any = {};
    
    if (!formData.category.trim()) {
      errors.category = "Category name is required";
    }
    
    if (!formData.slug.trim()) {
      errors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
      } else {
        await createCategory(formData);
      }
      
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ category: "", slug: "", imageUrl: "" });
      setFormErrors({});
      await loadCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      category: category.category,
      slug: category.slug,
      imageUrl: category.imageUrl || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId: number, categoryName: string, promptCount: number) => {
    if (promptCount > 0) {
      alert(`Cannot delete category "${categoryName}" because it has ${promptCount} prompts. Please reassign or delete the prompts first.`);
      return;
    }
    
    if (!confirm(`Are you sure you want to delete category "${categoryName}"?`)) return;
    
    try {
      await deleteCategory(categoryId);
      await loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ category: "", slug: "", imageUrl: "" });
    setFormErrors({});
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Category Management</h2>
          <p className="text-gray-400">Manage prompt categories and organization</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple/80 rounded-xl font-semibold transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-black/40 border border-white/10 rounded-2xl">
          <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Image */}
              {category.imageUrl && (
                <div className="aspect-video">
                  <img
                    src={category.imageUrl}
                    alt={category.category}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{category.category}</h3>
                <p className="text-sm text-gray-400 mb-4">/{category.slug}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {category.totalPromptsCount} prompts
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brand-cyan/20 hover:bg-brand-cyan/30 rounded-xl text-brand-cyan font-medium text-sm transition-all cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id, category.category, category.totalPromptsCount)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 transition-all cursor-pointer"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0c0917] border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/5 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                    if (!editingCategory) {
                      setFormData({ ...formData, category: e.target.value, slug: generateSlug(e.target.value) });
                    }
                    setFormErrors({ ...formErrors, category: "" });
                  }}
                  placeholder="e.g., Cyberpunk"
                  className={`w-full bg-black/60 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    formErrors.category
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-brand-cyan"
                  }`}
                />
                {formErrors.category && (
                  <p className="mt-1.5 text-xs text-red-400">{formErrors.category}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setFormData({ ...formData, slug: e.target.value });
                    setFormErrors({ ...formErrors, slug: "" });
                  }}
                  placeholder="e.g., cyberpunk"
                  className={`w-full bg-black/60 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    formErrors.slug
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-brand-cyan"
                  }`}
                />
                {formErrors.slug && (
                  <p className="mt-1.5 text-xs text-red-400">{formErrors.slug}</p>
                )}
                <p className="mt-1.5 text-xs text-gray-500">
                  URL-safe identifier (lowercase, numbers, hyphens only)
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-brand-purple hover:bg-brand-purple/80 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? "Saving..." : editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
