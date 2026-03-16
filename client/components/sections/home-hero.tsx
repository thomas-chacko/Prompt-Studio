"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, BookMarked, ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

// Word-stagger variants
const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};
const wordVariant = {
  hidden: { opacity: 0, y: 32, rotateX: -30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function AnimatedHeadline() {
  return (
    <motion.h1
      variants={headlineContainer}
      initial="hidden"
      animate="visible"
      className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-black tracking-tighter leading-[1.04] text-white mb-6 max-w-4xl mx-auto text-center"
      style={{ perspective: 800 }}
    >
      {["The", "World's"].map((w) => (
        <motion.span key={w} variants={wordVariant} className="inline-block mr-[0.22em]">
          {w}
        </motion.span>
      ))}
      <br />
      <motion.span
        variants={wordVariant}
        className="inline-block mr-[0.22em] relative"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-[#818cf8] to-brand-pink headline-shimmer">
          Largest
        </span>
      </motion.span>
      <motion.span
        variants={wordVariant}
        className="inline-block mr-[0.22em] relative"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-[#818cf8] to-brand-pink headline-shimmer">
          AI Prompt
        </span>
      </motion.span>
      <br />
      {["Store"].map((w) => (
        <motion.span key={w} variants={wordVariant} className="inline-block mr-[0.22em]">
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
}

const PLACEHOLDERS = [
  '"cold email sequence for SaaS founders..."',
  '"cinematic portrait, soft golden hour light..."',
  '"React custom hook for infinite scroll..."',
  '"SEO blog post about AI tools 2025..."',
  '"viral LinkedIn post about productivity..."',
  '"brand naming prompts for a startup..."',
];

function RotatingPlaceholder() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PLACEHOLDERS.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`transition-opacity duration-400 text-gray-600 select-none pointer-events-none absolute inset-0 flex items-center px-5 text-sm md:text-base ${visible ? "opacity-100" : "opacity-0"
        }`}
    >
      {PLACEHOLDERS[index]}
    </span>
  );
}

export default function HomeHero() {
  return (
    <section
      id="hero"
      aria-label="PromptStudio — The World's Largest AI Prompt Marketplace for ChatGPT, Claude, Gemini and Midjourney"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#03010a]"
    >
      {/* ── Background layers ───────────────────────────────────── */}
      {/* Dot-grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none" />
      {/* Large purple glow top-center */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(124,58,237,0.22),transparent)] pointer-events-none" />
      {/* Cyan glow right */}
      <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_50%_50%_at_100%_50%,rgba(0,212,255,0.09),transparent)] pointer-events-none" />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#03010a] to-transparent pointer-events-none" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center">

        {/* Headline — word-stagger reveal */}
        <AnimatedHeadline />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-light"
        >
          Browse and copy thousands of hand-picked, ready-to-use prompts for{" "}
          <strong className="font-semibold text-white">ChatGPT</strong>,{" "}
          <strong className="font-semibold text-white">Claude</strong>,{" "}
          <strong className="font-semibold text-white">Gemini</strong>, and{" "}
          <strong className="font-semibold text-white">Midjourney</strong>.
          {" "}Plus, generate stunning AI images right here.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl mb-7"
        >
          <form
            action="/explore"
            method="get"
            className="relative group flex items-center bg-[#0e0b1f] border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(124,58,237,0.12)] focus-within:border-brand-purple/50 focus-within:shadow-[0_0_70px_rgba(124,58,237,0.2)] transition-all duration-300"
          >
            <Search className="w-5 h-5 text-gray-500 ml-5 shrink-0" />
            <div className="relative flex-1">
              <input
                name="q"
                type="search"
                aria-label="Search AI prompts for ChatGPT, Claude, Gemini, Midjourney"
                className="w-full bg-transparent text-white text-sm md:text-base px-4 py-4 outline-none placeholder:text-transparent"
              />
              <RotatingPlaceholder />
            </div>
            <button
              type="submit"
              className="m-2 shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/80 text-white text-sm font-semibold btn-shine transition-colors"
            >
              Search
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
        >
          {/* Primary — gradient glow button */}
          <Link
            href="/explore"
            className="group w-full relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:shadow-[0_0_55px_rgba(124,58,237,0.55)]"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0891b2 100%)" }}
          >
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
            <BookMarked className="w-4 h-4 shrink-0" />
            Browse Prompts
          </Link>

          {/* Secondary — glass border button */}
          <Link
            href="/generate-image"
            className="group w-full relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-sm text-white border border-white/15 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.09] hover:border-brand-cyan/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <ImageIcon className="w-4 h-4 shrink-0 text-brand-cyan transition-transform duration-300 group-hover:scale-110" />
            Generate AI Images
          </Link>
        </motion.div>
      </div>

      {/* ── Ambient orb animations (CSS-based, cheap) ───────────── */}
      <div
        className="absolute bottom-24 left-8 w-72 h-72 rounded-full opacity-[0.07] blur-[80px] animate-pulse bg-brand-cyan pointer-events-none"
        style={{ animationDuration: "7s" }}
      />
      <div
        className="absolute top-32 right-8 w-80 h-80 rounded-full opacity-[0.07] blur-[90px] animate-pulse bg-brand-purple pointer-events-none"
        style={{ animationDuration: "9s" }}
      />
    </section>
  );
}
