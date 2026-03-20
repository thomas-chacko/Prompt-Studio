"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera, Image as ImageIcon, Box, Palmtree, User, Flame,
  Torus, Zap, type LucideIcon,
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
  { name: "Portraits", icon: User,     color: "text-rose-400",  border: "hover:border-rose-500/30",   iconBg: "bg-rose-500/10",   count: "12.2k+", description: "Photorealistic faces, cyberpunk characters & editorial" },
  { name: "Sci-Fi",    icon: Zap,      color: "text-blue-400",  border: "hover:border-blue-500/30",   iconBg: "bg-blue-500/10",   count: "9.8k+",  description: "Neon cities, mechs, spaceships & futuristic tech" },
  { name: "Architecture",icon: Box,     color: "text-green-400", border: "hover:border-green-500/30",  iconBg: "bg-green-500/10",  count: "7.4k+",  description: "Brutalism, modern interiors & landscape design" },
  { name: "Fantasy",   icon: Flame,    color: "text-amber-400", border: "hover:border-amber-500/30",  iconBg: "bg-amber-500/10",  count: "6.2k+",  description: "Dragons, magic castles, elves & epic landscapes" },
  { name: "Product",   icon: Camera,   color: "text-purple-400",border: "hover:border-purple-500/30", iconBg: "bg-purple-500/10", count: "8.8k+",  description: "Commercial mockups, dramatic studio lighting" },
  { name: "Anime",     icon: ImageIcon,color: "text-cyan-400",  border: "hover:border-cyan-500/30",   iconBg: "bg-cyan-500/10",   count: "15.1k+", description: "Studio Ghibli style, cel-shaded & manga art" },
  { name: "Abstract",  icon: Torus,    color: "text-pink-400",  border: "hover:border-pink-500/30",   iconBg: "bg-pink-500/10",   count: "6.9k+",  description: "Fluid dynamics, geometric shapes & 3D renders" },
  { name: "Nature",    icon: Palmtree, color: "text-emerald-400",border: "hover:border-emerald-500/30", iconBg: "bg-emerald-500/10", count: "8.3k+",  description: "Hyper-realistic forests, oceans & wildlife" },
];

export default function CategoriesSection() {
  return (
    <section
      aria-label="Browse visual AI prompt categories in the PromptStudio gallery"
      className="py-32 bg-[#050312] border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(ellipse_100%_50%_at_50%_100%,rgba(124,58,237,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-5">
            <ImageIcon className="w-4 h-4 text-brand-purple" />
            <span className="text-sm font-bold tracking-widest uppercase text-brand-purple">Infinite Creativity</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Explore Visual Categories
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            From hyper-realistic portraits to breathtaking fantasy landscapes. Find the exact aesthetics you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="h-full z-10"
            >
              <Link
                href={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={`group flex flex-col p-6 rounded-3xl bg-[#0a0812] border border-white/10 ${cat.border} transition-all duration-300 h-full hover:shadow-2xl hover:shadow-${cat.color.split('-')[1]}-500/10`}
                aria-label={`Browse ${cat.name} art prompts`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <cat.icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <div className={`text-xs font-bold tracking-wider ${cat.color} bg-white/5 px-3 py-1 rounded-full`}>
                    {cat.count}
                  </div>
                </div>
                
                <div className="font-bold text-white text-xl mb-2">{cat.name}</div>
                <div className="text-sm text-gray-500 leading-relaxed flex-1 font-light">{cat.description}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
