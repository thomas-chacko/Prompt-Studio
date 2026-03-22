"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { Image as ImageIcon, Search, Eye, EyeOff, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function PromptsTab() {
  const { getPrompts, updatePrompt, deletePrompt, isLoading } = useAdmin();
  const [prompts, setPrompts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({ isPublished: "", categoryId: "", search: "" });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    loadPrompts();
  }, [pagination.page, filters.isPublished, filters.categoryId, filters.search]);

  const loadPrompts = async () => {
    try {
      const response: any = await getPrompts({
        page: pagination.page,
        limit: pagination.limit,
        isPublished: filters.isPublished === "true" ? true : filters.isPublished === "false" ? false : undefined,
        categoryId: filters.categoryId ? Number(filters.categoryId) : undefined,
        search: filters.search || undefined,
      });
      setPrompts(response.data);
      setPagination(response.meta);
    } catch (error) {
      console.error("Failed to load prompts:", error);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, search: searchInput });
    setPagination({ ...pagination, page: 1 });
  };

  const handleTogglePublish = async (promptId: number, currentStatus: boolean) => {
    try {
      await updatePrompt(promptId, { isPublished: !currentStatus });
      await loadPrompts();
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };

  const handleDelete = async (promptId: number, title: string) => {
    if (!confirm(`Are you sure you want to delete prompt "${title}"? This action cannot be undone.`)) return;
    
    try {
      await deletePrompt(promptId);
      await loadPrompts();
    } catch (error) {
      console.error("Failed to delete prompt:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Prompt Management</h2>
        <p className="text-gray-400">Moderate and manage all prompts on the platform</p>
      </div>

      {/* Filters */}
      <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search by title or prompt text..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple/80 rounded-xl font-medium transition-all cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={filters.isPublished}
              onChange={(e) => {
                setFilters({ ...filters, isPublished: e.target.value });
                setPagination({ ...pagination, page: 1 });
              }}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan transition-all cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="true">Published</option>
              <option value="false">Unpublished</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading prompts...</p>
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-12 bg-black/40 border border-white/10 rounded-2xl">
          <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No prompts found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
              >
                {/* Image */}
                <div className="relative aspect-video">
                  <img
                    src={prompt.image}
                    alt={prompt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        prompt.isPublished
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {prompt.isPublished ? "Published" : "Unpublished"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-1">{prompt.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{prompt.prompt}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span>{prompt.author.username}</span>
                    <span>•</span>
                    <span>{prompt.category.category}</span>
                    <span>•</span>
                    <span>{prompt.totalLikes} likes</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePublish(prompt.id, prompt.isPublished)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                        prompt.isPublished
                          ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                    >
                      {prompt.isPublished ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Publish
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(prompt.id, prompt.title)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 transition-all cursor-pointer"
                      title="Delete prompt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} prompts
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
                className="p-2 bg-black/40 border border-white/10 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 bg-black/40 border border-white/10 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
