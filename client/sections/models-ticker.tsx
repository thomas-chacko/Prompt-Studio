"use client";

import { motion } from "framer-motion";

const MODELS = [
  "Midjourney v6", "DALL·E 3", "Stable Diffusion XL", "Gemini Pro Vision",
  "Sora", "Kling AI", "Runway Gen-3", "Pika Labs", "Leonardo AI",
  "Adobe Firefly", "Flux.1", "Haiper", "Luma Dream Machine"
];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const looped = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        className="flex shrink-0 gap-10 items-center"
      >
        {looped.map((m, i) => (
          <span
            key={i}
            className="text-2xl font-black text-white/10 hover:text-white/30 transition-colors uppercase tracking-tight whitespace-nowrap shrink-0 cursor-default"
          >
            {m}
            <span className="text-brand-purple/20 mx-6 font-normal">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ModelsTicker() {
  return (
    <section
      aria-label="Supported generative image and video AI models"
      className="py-16 border-y border-white/5 bg-[#050312] relative overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050312] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#050312] to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-10 relative z-10">
        <p className="text-xs font-bold tracking-widest uppercase text-brand-purple/70">Engineered for leading generative models</p>
      </div>

      <div className="space-y-4">
        <Marquee items={MODELS} />
        <Marquee items={[...MODELS].reverse()} reverse />
      </div>
    </section>
  );
}
