"use client";

import { motion } from "framer-motion";
import AnimatedButton from "@/components/animated-button";
import SearchBar from "@/components/search-bar";
import { Copy, Sparkles, Terminal, Code2, PenTool } from "lucide-react";

// Word-stagger variants for premium 3D headline
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
      className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] text-white mb-8 max-w-5xl mx-auto text-center drop-shadow-lg"
      style={{ perspective: 800 }}
    >
      {["Elevate", "Your", "Work"].map((w) => (
        <motion.span key={w} variants={wordVariant} className="inline-block mr-[0.25em]">
          {w}
        </motion.span>
      ))}
      <br />
      {["With"].map((w) => (
        <motion.span key={w} variants={wordVariant} className="inline-block mr-[0.25em]">
          {w}
        </motion.span>
      ))}
      <motion.span
        variants={wordVariant}
        className="inline-block relative ml-2"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink drop-shadow-2xl">
          Curated AI Prompts
        </span>
      </motion.span>
    </motion.h1>
  );
}

export default function HomeHero() {
  return (
    <section 
      id="hero"
      aria-label="PromptStudio — The World's Largest AI Prompt Marketplace"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-[#03010a]"
    >
      {/* Background Gradients & Grid - CSS Only to save CPU */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Orbs using pure CSS animation for performance on mobile */}
        {/* Large Purple Glow */}
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] bg-brand-purple/20 rounded-full blur-[100px] sm:blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
        {/* Cyan Accents */}
        <div className="absolute top-[10%] -right-[10%] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-brand-cyan/20 rounded-full blur-[80px] sm:blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        {/* Pink Accent */}
        <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-brand-pink/15 rounded-full blur-[80px] sm:blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Dynamic Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 mb-8 backdrop-blur-md shadow-2xl overflow-hidden group cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-brand-cyan/20 to-brand-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <span className="text-sm font-medium tracking-wide">
            The World's Largest <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple font-bold">AI Prompt Marketplace</span>
          </span>
        </motion.div>

        {/* Cinematic 3D Headline */}
        <div className="max-w-5xl mx-auto">
          <AnimatedHeadline />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Discover, copy, and submit the highest-quality prompts for{" "}
            <strong className="font-semibold text-white">ChatGPT</strong>,{" "}
            <strong className="font-semibold text-white">Claude</strong>,{" "}
            <strong className="font-semibold text-white">Gemini</strong>, and{" "}
            <strong className="font-semibold text-white">Midjourney</strong>. Stop guessing. Start creating.
          </motion.p>
        </div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto relative z-20 group mb-10"
        >
          {/* Glowing wrapper around SearchBar on hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink rounded-3xl blur opacity-25 group-hover:opacity-50 transition-all duration-700 pointer-events-none" />
          <div className="relative">
            <SearchBar />
          </div>
        </motion.div>

        {/* Optimized Buttons targeted explicitly for prompt store actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full sm:w-auto relative z-10"
        >
          <AnimatedButton variant="primary" href="/explore" className="w-full sm:w-auto px-8 py-4 text-base shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] transition-shadow duration-500">
            Browse Prompts
          </AnimatedButton>
          <AnimatedButton variant="outline" href="/submit" className="w-full sm:w-auto px-8 py-4 text-base backdrop-blur-sm">
            Submit A Prompt
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Custom CSS Floating Animation for Background Cards */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes heroFloatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1.5deg); }
        }
        .animate-hero-float {
          animation: heroFloat 7s ease-in-out infinite;
        }
        .animate-hero-float-reverse {
          animation: heroFloatReverse 8s ease-in-out infinite;
        }
        .anim-delay-0 { animation-delay: 0s; }
        .anim-delay-1 { animation-delay: -2s; }
        .anim-delay-2 { animation-delay: -4s; }
        .anim-delay-3 { animation-delay: -3s; }
      `}} />

      {/* High-fidelity Floating Decorative Cards */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden xl:block overflow-hidden [perspective:1000px]">
        <FloatingCard
          title="React Component Generator"
          category="Coding"
          icon={<Code2 className="w-4 h-4 text-brand-cyan" />}
          delayClass="anim-delay-0"
          floatClass="animate-hero-float"
          className="top-[15%] left-[6%] -rotate-6"
        />
        <FloatingCard
          title="Viral Twitter Thread"
          category="Social"
          icon={<Sparkles className="w-4 h-4 text-brand-pink" />}
          delayClass="anim-delay-1"
          floatClass="animate-hero-float-reverse"
          className="top-[60%] left-[8%] rotate-3"
        />
        <FloatingCard
          title="SaaS Landing Page Copy"
          category="Marketing"
          icon={<PenTool className="w-4 h-4 text-brand-purple" />}
          delayClass="anim-delay-2"
          floatClass="animate-hero-float"
          className="top-[25%] right-[6%] rotate-6"
        />
        <FloatingCard
          title="Advanced System Prompt"
          category="AI Eng"
          icon={<Terminal className="w-4 h-4 text-white" />}
          delayClass="anim-delay-3"
          floatClass="animate-hero-float-reverse"
          className="top-[65%] right-[8%] -rotate-3"
        />
      </div>
    </section>
  );
}

function FloatingCard({ 
  title, 
  category, 
  icon,
  delayClass,
  floatClass,
  className 
}: { 
  title: string; 
  category: string; 
  icon: React.ReactNode;
  delayClass: string; 
  floatClass: string;
  className: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className={`absolute w-[260px] ${floatClass} ${delayClass} ${className}`}
    >
      <div className="glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-[#0a0812]/50 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="flex gap-3 items-center mb-4">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 shadow-inner">
            {icon}
          </div>
          <span className="text-xs font-bold tracking-wider text-brand-cyan uppercase">{category}</span>
        </div>
        
        <p className="text-sm font-semibold text-white leading-snug mb-5 pr-2">{title}</p>
        
        <div className="flex items-center justify-between text-gray-500 pt-3 border-t border-white/5">
          <div className="flex gap-1.5">
             <div className="h-1.5 w-10 bg-white/10 rounded-full" />
             <div className="h-1.5 w-16 bg-white/5 rounded-full" />
          </div>
          <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-brand-purple/20 transition-colors pointer-events-auto cursor-pointer border border-transparent group-hover:border-brand-purple/30">
            <Copy className="w-3.5 h-3.5 group-hover:text-brand-purple transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
