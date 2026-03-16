"use client";

import { motion } from "framer-motion";
import AnimatedButton from "./animated-button";
import SearchBar from "./search-bar";
import { Copy } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Animated Background Gradients & Grid - Optimized for Performance */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Swapped heavy framer-motion loops for optimized CSS classes to save CPU on low-end devices */}
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-cyan/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[90px] md:blur-[150px] animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cyan mb-8 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-sm font-medium">PromptStudio v2.0 is live</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Discover the Best <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-purple">
              AI Prompts
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Supercharge your workflow with thousands of high-quality, curated prompts for ChatGPT, Claude, and Midjourney. Built for creators.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <AnimatedButton variant="primary" href="/explore" className="w-full sm:w-auto px-8 py-4 text-base">
            Explore Prompts
          </AnimatedButton>
          <AnimatedButton variant="outline" href="/submit" className="w-full sm:w-auto px-8 py-4 text-base">
            Submit Prompt
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Floating Prompt Cards Decoration */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
        <FloatingCard
          title="React Component Gen"
          category="Coding"
          delay={0}
          className="top-[20%] left-[5%]"
        />
        <FloatingCard
          title="Viral Twitter Thread"
          category="Social Media"
          delay={2}
          className="top-[60%] left-[10%]"
        />
        <FloatingCard
          title="SaaS Landing Page"
          category="Marketing"
          delay={1}
          className="top-[30%] right-[5%]"
        />
        <FloatingCard
          title="SEO Blog Outline"
          category="SEO"
          delay={3}
          className="top-[70%] right-[10%]"
        />
      </div>
    </section>
  );
}

function FloatingCard({ title, category, delay, className }: { title: string, category: string, delay: number, className: string }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute glass p-4 rounded-xl border border-white/10 w-48 shadow-2xl backdrop-blur-md opacity-40 ${className}`}
    >
      <div className="flex gap-2 items-center mb-2">
        <span className="w-2 h-2 rounded-full bg-brand-cyan" />
        <span className="text-xs text-brand-cyan font-medium">{category}</span>
      </div>
      <p className="text-sm font-semibold text-white truncate">{title}</p>
      <div className="mt-3 flex items-center justify-between text-gray-500">
        <div className="h-1.5 w-16 bg-white/10 rounded-full" />
        <Copy className="w-3 h-3" />
      </div>
    </motion.div>
  );
}
