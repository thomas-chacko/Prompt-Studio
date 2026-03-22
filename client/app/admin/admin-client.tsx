"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import {
  Users,
  Image,
  FolderOpen,
  Sparkles,
  TrendingUp,
  UserPlus,
  FileImage,
  Zap,
} from "lucide-react";
import UsersTab from "./tabs/users-tab";
import PromptsTab from "./tabs/prompts-tab";
import CategoriesTab from "./tabs/categories-tab";
import GenerationsTab from "./tabs/generations-tab";

export default function AdminDashboardClient() {
  const { getStats, isLoading } = useAdmin();
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "prompts" | "categories" | "generations">("overview");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  if (isLoading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#03010a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03010a] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Manage your platform and monitor activity</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "users", label: "Users", icon: Users },
              { id: "prompts", label: "Prompts", icon: Image },
              { id: "categories", label: "Categories", icon: FolderOpen },
              { id: "generations", label: "Generations", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "border-brand-purple text-white"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === "overview" && stats && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={Users}
                label="Total Users"
                value={stats.overview.totalUsers}
                color="purple"
              />
              <StatCard
                icon={Image}
                label="Total Prompts"
                value={stats.overview.totalPrompts}
                color="cyan"
              />
              <StatCard
                icon={Sparkles}
                label="Total Generations"
                value={stats.overview.totalGenerations}
                color="purple"
              />
              <StatCard
                icon={FolderOpen}
                label="Categories"
                value={stats.overview.totalCategories}
                color="cyan"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-brand-purple" />
                Recent Activity (Last 7 Days)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActivityCard
                  icon={UserPlus}
                  label="New Users"
                  value={stats.recentActivity.newUsersThisWeek}
                />
                <ActivityCard
                  icon={FileImage}
                  label="New Prompts"
                  value={stats.recentActivity.newPromptsThisWeek}
                />
                <ActivityCard
                  icon={Zap}
                  label="Generations"
                  value={stats.recentActivity.generationsThisWeek}
                />
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Content Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Published Prompts</span>
                    <span className="text-green-400 font-semibold">{stats.overview.publishedPrompts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Unpublished Prompts</span>
                    <span className="text-yellow-400 font-semibold">{stats.overview.unpublishedPrompts}</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Admin Users</span>
                    <span className="text-brand-purple font-semibold">{stats.overview.adminUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Pro Users</span>
                    <span className="text-brand-cyan font-semibold">{stats.overview.proUsers}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && <UsersTab />}

        {activeTab === "prompts" && <PromptsTab />}

        {activeTab === "categories" && <CategoriesTab />}

        {activeTab === "generations" && <GenerationsTab />}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color === "purple" ? "text-brand-purple" : "text-brand-cyan"}`} />
      </div>
      <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

// Activity Card Component
function ActivityCard({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
      <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-brand-purple" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );
}
