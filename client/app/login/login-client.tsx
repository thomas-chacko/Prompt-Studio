"use client";

import { Mail, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API integration will be added later
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="/ai-generated-robot.avif"
          alt="AI Generated Art"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center z-10">
            <h2 className="text-5xl font-bold mb-4">Welcome Back</h2>
            <p className="text-xl text-gray-300">Continue your creative journey with AI</p>
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
            <h1 className="text-4xl font-bold mb-2">Login</h1>
            <p className="text-gray-400">Access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 rounded border-white/10 bg-black/40 text-brand-purple focus:ring-brand-purple focus:ring-offset-0"
                />
                Remember me
              </label>
              <Link href="#" className="text-brand-cyan hover:text-brand-cyan/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-purple/80 hover:to-brand-cyan/80 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(112,0,255,0.4)]"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-400 pt-4">
              Don't have an account?{" "}
              <Link href="/signup" className="text-brand-cyan hover:text-brand-cyan/80 transition-colors font-semibold">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
