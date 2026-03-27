"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Image as ImageIcon, Video } from "lucide-react";

export default function CTASectionNew() {
  return (
    <section
      aria-label="Generate art on PromptStudio — The #1 Visual AI Prompt Gallery."
      className="py-32 relative overflow-hidden bg-[#03010a]"
    >
      {/* Immersive Deep Dark Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(124,58,237,0.1),transparent)] pointer-events-none" />
      
      {/* Sleek rotating rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-purple/5 animate-[spin_40s_linear_infinite] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-cyan/5 animate-[spin_25s_linear_infinite_reverse] pointer-events-none mix-blend-screen" />

      <div className="relative w-full mx-auto px-4 sm:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-bold mb-10 tracking-widest uppercase shadow-2xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            Build your portfolio
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-8 leading-[1.05]">
            Unleash Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan via-brand-purple to-brand-pink">
              Visual Imagination
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-14 w-full mx-auto leading-relaxed font-light">
            Join thousands of creators defining the bleeding edge of AI imagery. Browse the gallery, copy elite prompts, or render directly using the Gemini API entirely in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full mx-auto mb-16">
            <Link
              href="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] group hover:scale-[1.02] active:scale-[0.98]"
            >
              <ImageIcon className="w-5 h-5" />
              Explore Gallery
            </Link>
            <Link
              href="/generate"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-purple/10 border border-brand-purple/30 text-white font-bold text-base hover:bg-brand-purple/20 transition-all group hover:scale-[1.02] active:scale-[0.98]"
            >
              Generate with Gemini
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Supported tech */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400 font-mono tracking-wider">
              <ImageIcon className="w-4 h-4 text-brand-purple" /> Midjourney
            </div>
            <span className="text-gray-700">·</span>
            <div className="flex items-center gap-2 text-gray-400 font-mono tracking-wider">
               <Video className="w-4 h-4 text-brand-pink" /> Sora / Kling AI
            </div>
            <span className="text-gray-700">·</span>
            <div className="flex items-center gap-2 text-gray-400 font-mono tracking-wider">
               <Sparkles className="w-4 h-4 text-brand-cyan" /> Gemini Native Generation
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
