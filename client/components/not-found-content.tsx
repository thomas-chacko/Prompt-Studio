"use client";

import Link from "next/link";
import AnimatedButton from "@/components/animated-button";
import { Home, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto scrollbar-hide bg-[#03010a] px-4 md:px-8 py-20"
    >
      {/* Background Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/10 blur-[150px] rounded-full -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-cyan/10 blur-[150px] rounded-full -z-10"
      />

      {/* Dot Grid Background */}
      <div className="absolute inset-0 dot-grid opacity-20 -z-20" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12">
        {/* Error Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="relative"
        >
          <div className="w-32 h-32 glass rounded-full flex flex-col items-center justify-center border-white/10 backdrop-blur-3xl shadow-2xl relative z-10">
            <span className="text-4xl font-extrabold text-gradient headline-shimmer italic">404</span>
            <span className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase">Error</span>
          </div>
          <div className="absolute inset-0 bg-brand-purple/20 blur-2xl rounded-full scale-150 -z-10 animate-pulse" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 glass mx-auto">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-brand-cyan font-mono tracking-widest uppercase text-xs font-bold">Neural Path Not Found</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tight leading-tight">
            Lost in the<br />
            <span className="text-gradient headline-shimmer">Neural Void</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            The neural network hallucinated a path that doesn't exist. This specific coordinate in the Prompt Studio dataset is currently empty.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <AnimatedButton href="/" variant="secondary" className="min-w-[200px]">
            <Home className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
            Return Home
          </AnimatedButton>
          <AnimatedButton href="/explore" variant="outline" className="min-w-[200px]">
            <Compass className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Start Exploring
          </AnimatedButton>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-12 w-full max-w-3xl border-t border-white/5"
        >
          <Link href="/generate-prompt" className="flex flex-col gap-3 group">
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-brand-purple transition-colors">Generate</span>
            <span className="text-xl text-white/70 group-hover:text-white transition-colors">AI Prompts</span>
            <div className="h-px w-0 group-hover:w-full bg-brand-purple transition-all duration-500 mx-auto" />
          </Link>
          <Link href="/generate-image" className="flex flex-col gap-3 group">
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-brand-cyan transition-colors">Visuals</span>
            <span className="text-xl text-white/70 group-hover:text-white transition-colors">Gemini Art</span>
            <div className="h-px w-0 group-hover:w-full bg-brand-cyan transition-all duration-500 mx-auto" />
          </Link>
          <Link href="/categories" className="flex flex-col gap-3 group">
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-brand-pink transition-colors">Discover</span>
            <span className="text-xl text-white/70 group-hover:text-white transition-colors">Trending</span>
            <div className="h-px w-0 group-hover:w-full bg-brand-pink transition-all duration-500 mx-auto" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
