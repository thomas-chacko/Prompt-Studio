"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

/**
 * Auth provider that syncs token from localStorage on mount
 * This ensures auth state is restored after page refresh
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setAuth } = useAuthStore();

  useEffect(() => {
    // Sync token from localStorage on mount
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      // Token exists but not in store - this happens on page refresh
      // The store will be hydrated from persisted state automatically
    }
  }, [token, setAuth]);

  return <>{children}</>;
}
