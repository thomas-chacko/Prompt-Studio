"use client";

import { motion } from "framer-motion";
import { Copy, Sparkles, Wand2, ArrowUpRight, Code, PenTool, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export default function BentoFeatureGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">Engineered for speed.</h2>
        <p className="text-gray-400 text-lg">Build complex applications, write highly converting copy, and generate breathtaking imagery inside a single unified platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
        {/* Large Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 relative rounded-3xl overflow-hidden group bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-8 relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-4 border border-brand-cyan/20">
                <Wand2 className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Generators</h3>
              <p className="text-gray-400 max-w-sm">Not sure what to write? Our advanced AI model will engineer the perfect prompt for you based on a few simple inputs.</p>
            </div>
            <Link href="/generate-prompt" className="inline-flex items-center gap-2 text-brand-cyan font-medium text-sm group-hover:underline underline-offset-4">
              Try the Generator <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Abstract background element */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-end p-8 translate-x-8 opacity-50 group-hover:opacity-100 transition-all duration-500">
             <div className="w-full h-full bg-[#111] rounded-xl border border-white/5 flex flex-col p-4 space-y-3 mask-image-linear-left relative overflow-hidden">
                <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                <div className="h-4 w-full bg-white/10 rounded-full" />
                <div className="h-4 w-5/6 bg-white/10 rounded-full" />
                <div className="mt-auto self-end flex items-center gap-2 px-3 py-1 bg-brand-cyan/20 text-brand-cyan rounded-md text-xs font-mono">
                  <Sparkles className="w-3 h-3" /> Optimizing...
                </div>
             </div>
          </div>
        </motion.div>

        {/* Small Feature 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden group bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="p-8 relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4 border border-brand-purple/20">
              <Code className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Coding Arsenal</h3>
            <p className="text-gray-400 text-sm">Next.js, Python, Rust. Access snippets built by senior engineers.</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-purple/20 blur-[50px] group-hover:bg-brand-purple/30 transition-colors" />
        </motion.div>

        {/* Small Feature 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden group bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="p-8 relative z-10 h-full flex flex-col">
             <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 border border-pink-500/20">
              <PenTool className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Copywriting</h3>
            <p className="text-gray-400 text-sm">Sales letters, cold emails, and ad copy engineered for high conversion.</p>
          </div>
        </motion.div>

        {/* Large Feature 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 relative rounded-3xl overflow-hidden group bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-8 relative z-10 h-full flex pl-8 md:pl-12 flex-col justify-center max-w-md">
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <LayoutTemplate className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">One-Click Copy</h3>
            <p className="text-gray-400 mb-6">No accounts required. Find the perfect prompt, copy it straight to your clipboard, and paste it into ChatGPT immediately.</p>
            <div className="flex items-center gap-3">
               <div className="px-4 py-2 rounded-full bg-white text-black text-sm font-bold flex items-center gap-2">
                 <Copy className="w-4 h-4" /> Copied to clipboard
               </div>
            </div>
          </div>
          {/* Abstract visual */}
          <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_right,rgba(255,255,255,0.1),transparent_70%)]" />
        </motion.div>
      </div>
    </section>
  );
}
