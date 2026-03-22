"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { Sparkles, ChevronLeft, ChevronRight, Key, Gift } from "lucide-react";

export default function GenerationsTab() {
  const { getGenerations, isLoading } = useAdmin();
  const [generations, setGenerations] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState<{ apiKeySource: "" | "own" | "free" }>({ apiKeySource: "" });

  useEffect(() => {
    loadGenerations();
  }, [pagination.page, filters.apiKeySource]);

  const loadGenerations = async () => {
    try {
      const response: any = await getGenerations({
        page: pagination.page,
        limit: pagination.limit,
        apiKeySource: filters.apiKeySource ? (filters.apiKeySource as "own" | "free") : undefined,
      });
      setGenerations(response.data);
      setPagination(response.meta);
    } catch (error) {
      console.error("Failed to load generations:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Generation Monitoring</h2>
        <p className="text-gray-400">Monitor all AI image generations on the platform</p>
      </div>

      {/* Filters */}
      <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">API Key Source</label>
            <select
              value={filters.apiKeySource}
              onChange={(e) => {
                setFilters({ ...filters, apiKeySource: e.target.value as "" | "own" | "free" });
                setPagination({ ...pagination, page: 1 });
              }}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan transition-all cursor-pointer"
            >
              <option value="">All Sources</option>
              <option value="own">User's Own Key</option>
              <option value="free">Platform Free Key</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generations List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading generations...</p>
        </div>
      ) : generations.length === 0 ? (
        <div className="text-center py-12 bg-black/40 border border-white/10 rounded-2xl">
          <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No generations found</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {generations.map((generation) => (
              <div
                key={generation.id}
                className="bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex gap-6">
                  {/* Images */}
                  <div className="flex gap-3">
                    {generation.imageUrls.map((url: string, idx: number) => (
                      <div key={idx} className="w-32 h-32 rounded-xl overflow-hidden">
                        <img
                          src={url}
                          alt={`Generation ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {generation.user.username}
                        </h3>
                        <p className="text-sm text-gray-400">{generation.user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            generation.apiKeySource === "own"
                              ? "bg-brand-cyan/20 text-brand-cyan"
                              : "bg-brand-purple/20 text-brand-purple"
                          }`}
                        >
                          {generation.apiKeySource === "own" ? (
                            <>
                              <Key className="w-3 h-3" />
                              Own Key
                            </>
                          ) : (
                            <>
                              <Gift className="w-3 h-3" />
                              Free
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-4 mb-3">
                      <p className="text-sm text-gray-300 line-clamp-3">{generation.promptUsed}</p>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>Model: {generation.model}</span>
                      <span>•</span>
                      <span>Ratio: {generation.aspectRatio}</span>
                      {generation.style && (
                        <>
                          <span>•</span>
                          <span>Style: {generation.style}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{new Date(generation.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} generations
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
