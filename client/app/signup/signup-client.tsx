"use client";

import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePasswordMatch,
} from "@/lib/validation";
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/toast";

export default function SignupClient() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const router = useRouter();
  const { signup, isAuthenticated } = useAuth();
  const toast = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      errors.username = usernameValidation.error!;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error!;
    }

    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
    if (!passwordMatchValidation.isValid) {
      errors.confirmPassword = passwordMatchValidation.error!;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await signup(username, email, password);
      toast.success("Account created successfully!");
      router.push("/explore");
    } catch (err) {
      const appError = handleApiError(err, "Signup");
      setError(appError.message);
      toast.error(appError.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="/ai-generated-women.avif"
          alt="AI Generated Art"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center z-10">
            <h2 className="text-5xl font-bold mb-4">Join PromptStudio</h2>
            <p className="text-xl text-gray-300">Discover and create amazing AI prompts</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-400">Join the community</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, username: "" }));
                  }}
                  placeholder="johndoe"
                  className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    fieldErrors.username
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  }`}
                />
              </div>
              {fieldErrors.username && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="you@example.com"
                  className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    fieldErrors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="••••••••"
                  className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    fieldErrors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  }`}
                />
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.password}</p>
              )}
              <p className="mt-1.5 text-xs text-gray-500">
                At least 8 characters with letters and numbers
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  placeholder="••••••••"
                  className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    fieldErrors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  }`}
                />
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-sm text-gray-400 pt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-cyan hover:text-brand-cyan/80 transition-colors font-semibold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
