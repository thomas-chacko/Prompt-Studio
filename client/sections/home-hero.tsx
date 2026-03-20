"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SearchBar from "@/components/search-bar";
import { Sparkles, ArrowRight, Wand2 } from "lucide-react";

// Curated high-aesthetic images for the scrolling cascade
const CASCADE_IMAGES_LEFT = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605364850558-29a3977c07e0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=600&auto=format&fit=crop",
];

const CASCADE_IMAGES_RIGHT = [
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=600&auto=format&fit=crop",
];

export default function HomeHero() {
  return (
    <section
      id="hero"
      aria-label="PromptStudio — Visual AI Prompt Gallery"
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#03010a] pt-24"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-[-10%] w-[50%] aspect-square rounded-full bg-brand-purple/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] aspect-square rounded-full bg-brand-cyan/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center h-full">

        {/* Left Column: Typography & Actions */}
        <div className="flex flex-col items-start text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, originX: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 mb-8 text-sm font-medium tracking-wide shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">Next-Gen Visual Gallery</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05] mb-6"
          >
            Imagine. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-purple-400 to-brand-purple">
              Generate.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg lg:text-xl text-gray-400 mb-10 max-w-lg font-light leading-relaxed"
          >
            Access thousands of breathtaking AI prompts tailored for Midjourney and DALL-E, or instantly render them right here in the browser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg relative mb-10 z-20 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative">
              <SearchBar />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <Link
              href="/explore"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/generate"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium rounded-full text-base transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              <Wand2 className="w-4 h-4 text-brand-purple" />
              Generate Image
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Scrolling Image Cascades */}
        <div className="relative h-[80svh] w-full hidden md:flex items-center justify-center gap-4 lg:gap-6 overflow-hidden perspective-[1200px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          {/* Subtle Rotate/Tilt Container for 3D Feel */}
          <div className="flex gap-4 lg:gap-6 w-full h-[200%] rotate-[-4deg] scale-[1.05] translate-x-10">

            {/* Cascade Column 1 (Scrolls Up) */}
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex flex-col flex-1 mt-12"
            >
              {[1, 2].map((group) => (
                <div key={group} className="flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
                  {CASCADE_IMAGES_LEFT.map((src, idx) => (
                    <div
                      key={`left-${group}-${idx}`}
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.02] transition-transform duration-500"
                    >
                      <img src={src} alt="AI Artwork" className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Cascade Column 2 (Scrolls Down) */}
            <motion.div
              animate={{ y: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              className="flex flex-col flex-1 -mt-24"
            >
              {[1, 2].map((group) => (
                <div key={group} className="flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
                  {CASCADE_IMAGES_RIGHT.map((src, idx) => (
                    <div
                      key={`right-${group}-${idx}`}
                      className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.02] transition-transform duration-500"
                    >
                      <img src={src} alt="AI Artwork" className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
