"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Megaphone, 
  Code2, 
  SearchIcon, 
  Briefcase, 
  PenTool, 
  Zap,
  LucideIcon
} from "lucide-react";

interface CategoryMapping {
  [key: string]: {
    icon: LucideIcon;
    color: string;
    gradient: string;
    description: string;
  };
}

const CATEGORY_MAP: CategoryMapping = {
  "Marketing": { icon: Megaphone, color: "text-rose-400", gradient: "from-rose-500/20 to-orange-500/20", description: "Copywriting, ads, and sales logic." },
  "Coding": { icon: Code2, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", description: "React, Python, debugging, SQL." },
  "SEO": { icon: SearchIcon, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", description: "Keywords, outlines, backlink strategy." },
  "Business": { icon: Briefcase, color: "text-purple-400", gradient: "from-purple-500/20 to-indigo-500/20", description: "Proposals, business models, cold emails." },
  "Writing": { icon: PenTool, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", description: "Creative stories, essays, syntax fixing." },
  "Productivity": { icon: Zap, color: "text-brand-cyan", gradient: "from-brand-cyan/20 to-blue-500/20", description: "Time management, planners, logic models." }
};

export default function CategoryCard({ category, index }: { category: string, index: number }) {
  const details = CATEGORY_MAP[category] || CATEGORY_MAP["Productivity"];
  const Icon = details.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link href={`/category/${category.toLowerCase()}`} className="block h-full cursor-pointer outline-none">
        <div className="glass p-8 rounded-3xl relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center">
          <div className={`absolute inset-0 bg-gradient-to-br ${details.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out`} />
          
          <div className="relative z-10">
            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ease-out`}>
              <Icon className={`w-7 h-7 ${details.color}`} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
              {category}
            </h3>
            
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {details.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
