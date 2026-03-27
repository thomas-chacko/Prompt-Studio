"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Heart } from "lucide-react";
import Link from "next/link";
import type { Prompt } from "@/data/prompts";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [copyCount, setCopyCount] = useState(prompt.copyCount);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setCopyCount((prev) => prev + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link href={`/prompt/${prompt.id}`} className="block h-full outline-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ willChange: 'transform, opacity' }}
        className="glass p-6 rounded-2xl relative overflow-hidden group border border-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(112,0,255,0.15)] flex flex-col h-full cursor-pointer"
      >
        {/* Subtle dynamic gradient overlay on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ willChange: 'opacity' }}
        />

        <div className="flex justify-between items-start mb-4 relative z-10 w-full gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-brand-cyan border border-brand-cyan/20">
              {prompt.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="text-gray-400 hover:text-brand-pink transition-colors duration-200 p-1"
              aria-label="Favorite prompt"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handled favorite conditionally
              }}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-200">
          {prompt.title}
        </h3>
        <p className="text-sm text-gray-400 mb-6 flex-grow line-clamp-3">
          {prompt.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
              +{prompt.tags.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto border-t border-white/10 pt-4 flex items-center justify-between relative z-10">
          <span className="text-xs text-gray-500 font-medium">
            {copyCount.toLocaleString()} copies
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              copied
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
