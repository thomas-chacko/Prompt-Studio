"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for admin-only routes
 * Redirects to home if user is not authenticated or not an admin
 */
export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only check auth after hydration is complete
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.role !== "admin") {
      router.push("/");
    }
  }, [isAuthenticated, user, router, isHydrated]);

  // Show loading while hydrating or checking auth
  if (!isHydrated || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#03010a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
