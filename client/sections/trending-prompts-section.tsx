"use client";

import { motion } from "framer-motion";
import { Copy, Check, ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { samplePrompts } from "@/data/prompts";

function TrendingCard({
  prompt,
  rank,
  delay,
}: {
  prompt: (typeof samplePrompts)[0];
  rank: number;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#0a0812] border border-white/8 rounded-2xl p-6 hover:border-brand-purple/40 hover:bg-[#0f0c1a] transition-all duration-300 flex flex-col h-full"
      style={{ willChange: "transform" }}
    >
      {/* Rank badge */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-xs font-bold text-gray-500">
        #{rank}
      </div>

      {/* Category */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-purple/15 text-brand-cyan border border-brand-purple/20">
          {prompt.category}
        </span>
      </div>

      {/* Title */}
      <Link href={`/prompt/${prompt.id}`} className="group/link">
        <h3 className="text-base font-bold text-white mb-2 group-hover/link:text-brand-cyan transition-colors leading-snug pr-8">
          {prompt.title}
        </h3>
      </Link>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-5 flex-1 line-clamp-2 leading-relaxed">
        {prompt.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-500 border border-white/5">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <TrendingUp className="w-3 h-3 text-brand-cyan" />
          {prompt.copyCount.toLocaleString()} copies
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={`/prompt/${prompt.id}`}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              copied
                ? "bg-green-500/15 text-green-400 border border-green-500/25"
                : "bg-white/8 text-white border border-white/10 hover:bg-brand-purple/20 hover:border-brand-purple/40"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrendingPromptsSection() {
  const trending = samplePrompts.slice(0, 6);

  return (
    <section
      aria-label="Trending AI prompts for ChatGPT, Claude, and Midjourney"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-brand-cyan" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-cyan">Hot right now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Trending AI Prompts
          </h2>
          <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
            The most copied, highest-rated prompts from our community this week.
          </p>
        </div>
        <Link
          href="/explore"
          className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 hover:border-white/20 transition-all"
        >
          View all prompts <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trending.map((prompt, i) => (
          <TrendingCard key={prompt.id} prompt={prompt} rank={i + 1} delay={i * 0.07} />
        ))}
      </div>
    </section>
  );
}
