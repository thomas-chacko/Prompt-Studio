"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Copy, Wand2, ImageIcon, Sparkles } from "lucide-react";
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
      className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-black tracking-tighter leading-[1.04] text-white mb-6 max-w-4xl"
      style={{ perspective: 800 }}
    >
      {["The", "Best", "Free"].map((w) => (
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
          AI
        </span>
      </motion.span>
      <motion.span
        variants={wordVariant}
        className="inline-block mr-[0.22em] relative"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-[#818cf8] to-brand-pink headline-shimmer">
          Prompt
        </span>
      </motion.span>
      <br />
      {["Library", "on", "Earth"].map((w) => (
        <motion.span key={w} variants={wordVariant} className="inline-block mr-[0.22em]">
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
}

const PLACEHOLDERS = [
  '"Write a cold email for SaaS founders..."',
  '"Midjourney cyberpunk city at midnight..."',
  '"React custom hook for data fetching..."',
  '"SEO blog outline: best AI tools 2025..."',
  '"Viral Twitter thread about productivity..."',
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

const FEATURE_PILLS = [
  { icon: Copy, label: "One-click copy", href: "/explore" },
  { icon: Wand2, label: "AI Prompt Builder", href: "/generate-prompt" },
  { icon: ImageIcon, label: "Image Prompts", href: "/generate-image" },
  { icon: Sparkles, label: "10k+ prompts free", href: "/explore" },
];

export default function HomeHero() {
  return (
    <section
      id="hero"
      aria-label="PromptStudio — Best Free AI Prompt Library for ChatGPT and Claude"
      className="relative flex flex-col items-center justify-center min-h-[95vh] pt-28 pb-16 overflow-hidden bg-[#03010a]"
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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">

        {/* Top eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
            </span>
            10,000+ free AI prompts — no sign-up needed
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-colors" />
          </Link>
        </motion.div>

        {/* Headline — word-stagger reveal */}
        <AnimatedHeadline />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-light"
        >
          Instantly copy proven prompts for{" "}
          <strong className="font-semibold text-white">ChatGPT</strong>,{" "}
          <strong className="font-semibold text-white">Claude</strong>, and{" "}
          <strong className="font-semibold text-white">Midjourney</strong>.
          Built by top creators, free for everyone.
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
                aria-label="Search free AI prompts for ChatGPT, Claude, Midjourney"
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

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {FEATURE_PILLS.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-400 bg-white/[0.05] border border-white/8 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all"
            >
              <Icon className="w-3.5 h-3.5 text-brand-cyan" />
              {label}
            </Link>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
        >
          <Link
            href="/explore"
            className="w-full flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-gray-100 btn-shine transition-all shadow-[0_0_35px_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-4 h-4" />
            Browse All Prompts
          </Link>
          <Link
            href="/generate-prompt"
            className="w-full flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/15 text-white font-semibold text-sm hover:bg-white/[0.06] hover:border-white/25 transition-all"
          >
            <Wand2 className="w-4 h-4 text-brand-cyan" />
            Free AI Generator
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
