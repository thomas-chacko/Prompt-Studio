"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * Wrapper component for protected routes
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only check auth after hydration is complete
    if (!isHydrated) return;
    
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, requireAuth, redirectTo, router, isHydrated]);

  // Show loading while hydrating or redirecting
  if (!isHydrated || (requireAuth && !isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
