"use client";

import { motion } from "framer-motion";
import { Search, Copy, SendHorizonal } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Search or Browse",
    detail:
      "Search our curated library of 10,000+ battle-tested AI prompts by keyword, tool, or category. Filter by ChatGPT, Claude, Midjourney, and more.",
    tag: "Free · No signup",
    color: "text-brand-cyan",
    glow: "shadow-[0_0_40px_rgba(0,212,255,0.08)]",
    border: "border-brand-cyan/20",
  },
  {
    step: "02",
    icon: Copy,
    title: "Copy in One Click",
    detail:
      "Found the perfect prompt? Hit copy and it's instantly on your clipboard, ready to paste into any AI tool. Counter updates in real-time.",
    tag: "Instant · Works everywhere",
    color: "text-brand-purple",
    glow: "shadow-[0_0_40px_rgba(124,58,237,0.08)]",
    border: "border-brand-purple/20",
  },
  {
    step: "03",
    icon: SendHorizonal,
    title: "Submit Your Best",
    detail:
      "Are your prompts consistently delivering amazing results? Share them with 5,000+ creators and build your reputation as a top prompt engineer.",
    tag: "Community · Growing daily",
    color: "text-brand-pink",
    glow: "shadow-[0_0_40px_rgba(236,72,153,0.08)]",
    border: "border-brand-pink/20",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      aria-label="How PromptStudio works — Find, Copy, and Submit AI Prompts"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-8"
    >
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 block mb-4">Simple by design</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Get better AI outputs in three steps. No tutorials needed.
        </p>
      </div>

      {/* Step cards with connecting lines between on desktop */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Connector line desktop */}
        <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-brand-cyan/20 via-brand-purple/20 to-brand-pink/20" />

        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col items-center text-center p-8 rounded-3xl bg-[#0a0812] border ${s.border} ${s.glow}`}
              style={{ willChange: "transform" }}
            >
              {/* Step number */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-6 relative z-10">
                <Icon className={`w-6 h-6 ${s.color}`} />
              </div>

              <div className={`text-5xl font-black ${s.color} opacity-10 absolute top-6 right-6 select-none leading-none`}>
                {s.step}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">{s.detail}</p>
              <span className={`text-xs font-semibold ${s.color} bg-white/5 px-3 py-1.5 rounded-full border ${s.border}`}>
                {s.tag}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
