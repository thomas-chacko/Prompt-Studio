"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  User, Mail, Calendar, Shield, Sparkles, LogOut,
  Settings, ImageIcon, Wand2, Heart, Bookmark
} from "lucide-react";
import { useToast } from "@/components/toast";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  const stats = [
    { label: "Prompts Created", value: "0", icon: Wand2 },
    { label: "Images Generated", value: "0", icon: ImageIcon },
    { label: "Likes Received", value: "0", icon: Heart },
    { label: "Collections", value: "0", icon: Bookmark },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 rounded-3xl p-8 mb-8 overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(112,0,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,229,255,0.15),transparent_50%)]" />
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan p-1 shadow-[0_0_40px_rgba(112,0,255,0.5)]">
                <div className="w-full h-full rounded-full bg-[#0c0917] flex items-center justify-center">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full p-2">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{user?.username}</h1>
              <p className="text-gray-400 mb-4">{user?.bio || "No bio yet"}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span className="capitalize">{user?.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user?.plan === "pro"
                      ? "bg-gradient-to-r from-brand-purple to-brand-cyan text-white"
                      : "bg-white/10 text-gray-400"
                  }`}>
                    {user?.plan?.toUpperCase()} Plan
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all"
              >
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 hover:bg-red-500/20 backdrop-blur-xl border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-brand-purple/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 group-hover:from-brand-purple/30 group-hover:to-brand-cyan/30 transition-all">
                  <stat.icon className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
              Recent Activity
            </h2>
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No recent activity</p>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-cyan" />
              Account Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-gray-400">Account Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.is_verified
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {user?.is_verified ? "Verified" : "Unverified"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white">
                  {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">User ID</span>
                <span className="text-white font-mono text-sm">{user?.id?.slice(0, 8)}...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
