"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Wand2, ImageIcon, BookMarked } from "lucide-react";

export default function CTASectionNew() {
  return (
    <section
      aria-label="Start using PromptStudio — The #1 AI Prompt Marketplace. Browse, copy, and submit AI prompts."
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(124,58,237,0.12),transparent)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-purple/10 animate-[spin_30s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-brand-cyan/5 animate-[spin_20s_linear_infinite_reverse] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-cyan text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            Free to browse · No login needed
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-tight">
            Your Prompt Store
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink">
              Awaits
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 5,000+ creators who browse, copy, and submit AI prompts on PromptStudio — the world's largest community-driven prompt marketplace. Plus, generate stunning AI images for free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/explore"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold text-base hover:bg-gray-100 btn-shine transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <BookMarked className="w-5 h-5" />
              Browse Prompt Store
            </Link>
            <Link
              href="/submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/15 text-white font-semibold text-base hover:bg-white/10 hover:border-white/25 transition-all"
            >
              Submit Your Prompt
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Tool Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/generate-prompt"
              className="flex items-center gap-2 text-gray-500 hover:text-brand-cyan transition-colors"
            >
              <Wand2 className="w-4 h-4" /> Free AI Prompt Generator
            </Link>
            <span className="text-gray-700">·</span>
            <Link
              href="/generate-image"
              className="flex items-center gap-2 text-gray-500 hover:text-brand-purple transition-colors"
            >
              <ImageIcon className="w-4 h-4" /> Generate AI Images Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
