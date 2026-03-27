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
  count: string;
  className: string; // Specific grid span for bento layout
  imageUrl: string;
};

const CATEGORIES: Category[] = [
  { name: "Portraits", icon: User, count: "12.2k+", className: "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
  { name: "Environment", icon: Palmtree, count: "8.3k+", className: "col-span-1 sm:col-span-2 lg:col-span-1 row-span-1", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" },
  { name: "Architecture", icon: Box, count: "7.4k+", className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1", imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop" },
  { name: "Anime / Manga", icon: ImageIcon, count: "15.1k+", className: "col-span-1 sm:col-span-1 lg:col-span-2 row-span-1", imageUrl: "https://images.unsplash.com/photo-1542401886-65d6c61de007?q=80&w=600&auto=format&fit=crop" },
  { name: "Sci-Fi Cyberpunk", icon: Zap, count: "9.8k+", className: "col-span-1 sm:col-span-2 lg:col-span-1 row-span-2", imageUrl: "https://images.unsplash.com/photo-1605364850558-29a3977c07e0?q=80&w=400&auto=format&fit=crop" },
  { name: "Fantasy", icon: Flame, count: "6.2k+", className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1", imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop" },
  { name: "Product Lighting", icon: Camera, count: "8.8k+", className: "col-span-1 sm:col-span-1 lg:col-span-2 row-span-1", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" }
];

export default function CategoriesSection() {
  return (
    <section
      aria-label="Browse visual AI prompt categories in the PromptStudio gallery"
      className="py-32 bg-[#020202] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 w-full">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-brand-purple" />
              <span className="text-sm font-bold tracking-widest uppercase text-brand-purple">Infinite Creativity</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Explore Aesthetic Categories
            </h2>
            <p className="text-gray-400 text-lg w-full font-light leading-relaxed">
              Find the exact visual styles you need. Built for modern generative systems like Midjourney v6 and DALL·E 3.
            </p>
          </div>
        </div>

        {/* Bento Box Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4 sm:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className={`${cat.className} group relative rounded-3xl overflow-hidden border border-white/10 bg-black`}
            >
              <Link
                href={`/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="absolute inset-0 z-20 cursor-pointer"
                aria-label={`Browse ${cat.name} art prompts`}
              >
                <span className="sr-only">Browse {cat.name}</span>
              </Link>

              {/* Background Image Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
                style={{ backgroundImage: `url(${cat.imageUrl})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-80" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end h-full z-10">
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <cat.icon className="w-5 h-5 text-brand-cyan drop-shadow-lg" />
                    </div>
                    <div className="font-extrabold text-white text-2xl drop-shadow-md mb-1">{cat.name}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-300 tracking-wider">PROMPTS</span>
                    <span className="text-lg font-black text-brand-cyan tracking-tight">{cat.count}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
