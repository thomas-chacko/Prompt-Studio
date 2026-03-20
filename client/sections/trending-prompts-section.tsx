"use client";

import { motion } from "framer-motion";
import { Copy, Check, ArrowUpRight, TrendingUp, Image as ImageIcon } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#0a0812]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-brand-purple/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-all duration-300 flex flex-col h-full"
    >
      {/* Visual Image Header */}
      <div 
        className="h-48 w-full bg-cover bg-center border-b border-white/10 relative transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${prompt.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812] via-transparent to-transparent opacity-80" />
        {/* Rank badge */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-xl">
          #{rank}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-brand-purple/20 text-brand-cyan border border-brand-purple/30 backdrop-blur-md">
            {prompt.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col relative z-10 bg-[#0a0812]">
        <Link href={`/prompt/${prompt.id}`} className="group/link mb-3">
          <h3 className="text-lg font-bold text-white group-hover/link:text-brand-purple transition-colors leading-snug">
            {prompt.title}
          </h3>
        </Link>

        {/* The Prompt Snippet */}
        <p className="text-xs text-gray-400 font-mono flex-1 line-clamp-3 leading-relaxed mb-5 p-3 rounded-lg bg-white/5 border border-white/5">
          {prompt.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <TrendingUp className="w-4 h-4 text-brand-cyan" />
            {prompt.copyCount.toLocaleString()} uses
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                copied
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-white/5 text-white border border-white/10 hover:bg-brand-purple/20 hover:border-brand-purple/40"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrendingPromptsSection() {
  const trending = samplePrompts.slice(0, 6);

  return (
    <section
      aria-label="Trending AI image prompts for generative art"
      className="py-32 max-w-7xl mx-auto px-4 sm:px-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-brand-purple" />
            <span className="text-sm font-bold tracking-widest uppercase text-brand-purple">Community Favorites</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Trending Image Prompts
          </h2>
          <p className="text-gray-400 text-xl max-w-xl leading-relaxed font-light">
            The most copied, highest-rated visual prompts from our generative art community this week.
          </p>
        </div>
        <Link
          href="/explore"
          className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all bg-white/5"
        >
          View gallery <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trending.map((prompt, i) => (
          <TrendingCard key={prompt.id} prompt={prompt} rank={i + 1} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
