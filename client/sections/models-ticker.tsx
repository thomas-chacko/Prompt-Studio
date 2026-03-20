"use client";

import { motion } from "framer-motion";

const MODELS = [
  "ChatGPT", "Claude", "Midjourney", "DALL·E 3", "Stable Diffusion",
  "Gemini", "Llama 3", "Mistral", "Copilot", "Perplexity AI",
  "Grok", "Sora", "Runway ML", "ElevenLabs", "Kling AI",
];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const looped = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 28, repeat: Infinity }}
        className="flex shrink-0 gap-8 items-center"
      >
        {looped.map((m, i) => (
          <span
            key={i}
            className="text-lg md:text-xl font-black text-white/15 uppercase tracking-tighter whitespace-nowrap shrink-0"
          >
            {m}
            <span className="text-brand-purple/30 mx-4">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ModelsTicker() {
  return (
    <section
      aria-label="AI models supported by PromptStudio — ChatGPT, Claude, Midjourney and more"
      className="py-16 border-y border-white/5 bg-[#050312] relative overflow-hidden"
    >
      {/* Fade masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050312] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050312] to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-8 relative z-10">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-600">Works with prompts for</p>
      </div>

      <div className="space-y-3">
        <Marquee items={MODELS} />
        <Marquee items={[...MODELS].reverse()} reverse />
      </div>
    </section>
  );
}
