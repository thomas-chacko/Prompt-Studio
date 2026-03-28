"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, MoveRight, Command } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import AnimatedButton from "./animated-button";

export default function EpicHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-24 min-h-[90vh] overflow-hidden bg-black">
      {/* Subtle ambient light */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(112,0,255,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08),transparent_50%)] pointer-events-none mix-blend-screen" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="mb-8"
        >
          <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors duration-200">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" style={{ willChange: 'transform, opacity' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            <span className="text-sm font-medium">PromptStudio 2.0 is now live</span>
            <MoveRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-200" />
            <div className="absolute inset-x-0 -bottom-px w-3/4 mx-auto h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ willChange: 'opacity' }} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="max-w-4xl"        >
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05] mb-6">
            The world's most powerful <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
               prompt engineering
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="max-w-2xl"
        >
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10">
            Stop guessing what the AI wants. Access the open registry of battle-tested prompts for ChatGPT, Claude, and Midjourney used by the top 1% of creators.
          </p>
        </motion.div>

        {/* Hero Interactive Input */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform, opacity' }}
           className="w-full max-w-2xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-opacity duration-500 group-hover:duration-200" style={{ willChange: 'opacity' }} />
          <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden focus-within:border-white/20 transition-all duration-200">
            <Search className="w-5 h-5 text-gray-500 ml-6" />
            <input 
              type="text" 
              placeholder="Search 'SaaS Landing Page' or 'React hook'..." 
              className="w-full bg-transparent text-white px-4 py-5 outline-none placeholder:text-gray-600 text-lg"
            />
            {mounted && (
              <div className="hidden sm:flex items-center gap-1 mr-6 text-xs text-gray-600 font-mono bg-white/5 px-2 py-1 rounded-md border border-white/5">
                <Command className="w-3 h-3" /> K
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500"
        >
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-brand-cyan" /> Free forever</span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-700" />
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-brand-purple" /> 10,000+ Prompts</span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-700" />
          <Link href="/generate-prompt" className="hover:text-white transition-colors duration-200 underline decoration-white/20 underline-offset-4">
            Try the AI Generator
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
