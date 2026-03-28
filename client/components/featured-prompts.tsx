"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PromptCard from "./prompt-card";
import type { Prompt } from "@/data/prompts";

export default function FeaturedPrompts({ prompts }: { prompts: Prompt[] }) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={targetRef} className="py-24 relative overflow-hidden bg-black/20">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-cyan/5 to-transparent -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-purple/5 to-transparent -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4"
          >
            <span className="text-brand-purple">✧</span> Editor's Choice
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Hand-picked selections guaranteed to generate the best AI outputs. Swipe horizontally to explore.
          </motion.p>
        </div>
      </div>

      <div className="pl-4 sm:pl-6 lg:pl-8 ml-auto max-w-7xl">
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 sm:px-0 snap-x snap-mandatory scrollbar-hide hide-scroll gap-x-6">
          <style dangerouslySetInnerHTML={{ __html: `
            .hide-scroll::-webkit-scrollbar { display: none; }
            .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />
          {prompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[85vw] sm:min-w-[400px] snap-center shrink-0"
            >
              <PromptCard prompt={prompt} />
            </motion.div>
          ))}
          {/* Spacer to allow last item to scroll past edge */}
          <div className="min-w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
