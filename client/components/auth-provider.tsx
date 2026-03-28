"use client";

/**
 * Auth provider wrapper component
 * Zustand persist middleware automatically handles storage sync
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
