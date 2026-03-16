"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Megaphone, Code2, Search as SearchIcon, Briefcase, PenTool, Zap,
  Share2, Brain, type LucideIcon,
} from "lucide-react";

type Category = {
  name: string;
  icon: LucideIcon;
  color: string;
  border: string;
  iconBg: string;
  count: string;
  description: string;
};

const CATEGORIES: Category[] = [
  { name: "Marketing", icon: Megaphone,   color: "text-rose-400",  border: "hover:border-rose-500/30",   iconBg: "bg-rose-500/10",   count: "1.2k+", description: "Cold email, ad copy, landing page prompts" },
  { name: "Coding",    icon: Code2,       color: "text-blue-400",  border: "hover:border-blue-500/30",   iconBg: "bg-blue-500/10",   count: "980+",  description: "React, TypeScript, debugging & API prompts" },
  { name: "SEO",       icon: SearchIcon,  color: "text-green-400", border: "hover:border-green-500/30",  iconBg: "bg-green-500/10",  count: "740+",  description: "Keyword research, blog outline & meta prompts" },
  { name: "Business",  icon: Briefcase,   color: "text-amber-400", border: "hover:border-amber-500/30",  iconBg: "bg-amber-500/10",  count: "620+",  description: "Proposal, strategy & presentation prompts" },
  { name: "Writing",   icon: PenTool,     color: "text-purple-400",border: "hover:border-purple-500/30", iconBg: "bg-purple-500/10", count: "880+",  description: "Essay, storytelling & newsletter prompts" },
  { name: "Productivity", icon: Zap,      color: "text-cyan-400",  border: "hover:border-cyan-500/30",   iconBg: "bg-cyan-500/10",   count: "510+",  description: "Daily planning, focus & task automation prompts" },
  { name: "Social Media", icon: Share2,   color: "text-pink-400",  border: "hover:border-pink-500/30",   iconBg: "bg-pink-500/10",   count: "690+",  description: "Instagram, Twitter & LinkedIn caption prompts" },
  { name: "AI & Research", icon: Brain,   color: "text-indigo-400",border: "hover:border-indigo-500/30", iconBg: "bg-indigo-500/10", count: "430+",  description: "Summarization, analysis & research prompts" },
];

export default function CategoriesSection() {
  return (
    <section
      aria-label="Browse AI prompt categories in the PromptStudio store — Marketing, Coding, SEO, Writing, and more"
      className="py-24 bg-[#050312] border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(124,58,237,0.07),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-purple">8 prompt categories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Shop Prompts by Category
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Every use case, every AI tool. Find the exact prompt you need — curated by expert creators.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="h-full"
              style={{ willChange: "transform" }}
            >
              <Link
                href={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex flex-col p-5 rounded-2xl bg-[#0a0812] border border-white/8 ${cat.border} transition-all duration-300 h-full`}
                aria-label={`Browse ${cat.name} AI prompts`}
              >
                <div className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4 shrink-0`}>
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <div className="font-bold text-white text-sm mb-1">{cat.name}</div>
                <div className="text-[11px] text-gray-500 mb-3 leading-relaxed flex-1">{cat.description}</div>
                <div className={`text-xs font-semibold ${cat.color}`}>{cat.count} prompts</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
