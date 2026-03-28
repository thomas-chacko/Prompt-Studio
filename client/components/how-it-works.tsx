"use client";

import { motion } from "framer-motion";
import { Search, CopyCheck, Send } from "lucide-react";
import React from "react";

const steps = [
  {
    icon: Search,
    title: "Discover prompts",
    description: "Search our massive library of community-tested prompts and find the perfect match for your use case.",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10"
  },
  {
    icon: CopyCheck,
    title: "Copy and use them",
    description: "One-click copy straight to your clipboard and paste it into ChatGPT, Claude, or your favorite AI instantly.",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10"
  },
  {
    icon: Send,
    title: "Submit your own",
    description: "Join 5,000+ creators and share your most successful prompts with the community to build your portfolio.",
    color: "text-brand-pink",
    bg: "bg-brand-pink/10"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How PromptStudio Works</h2>
          <p className="text-xl text-gray-400">Your journey to better AI outputs in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-brand-cyan/20 via-brand-purple/20 to-brand-pink/20 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center p-6"
              >
                <div className={`w-20 h-20 rounded-2xl ${step.bg} flex items-center justify-center mb-6 shadow-xl border border-white/5`}>
                  <Icon className={`w-8 h-8 ${step.color}`} />
                </div>
                
                <div className="glass px-4 py-1.5 rounded-full text-sm font-bold bg-white/5 border border-white/10 mb-4 text-white">
                  Step 0{index + 1}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
