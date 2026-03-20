"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SearchBar from "@/components/search-bar";
import { ArrowRight, Copy, CheckCircle2, Image as ImageIcon, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export default function HomeHero() {
  return (
    <section 
      id="hero"
      aria-label="PromptStudio — Visual AI Prompt Gallery"
      className="relative min-h-[95vh] flex items-center pt-24 pb-20 overflow-hidden bg-[#03010a]"
    >
      {/* Sleek minimalist dark theme background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Subtle core glow focus on the purple aesthetic */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[600px] bg-brand-purple/15 blur-[150px] mix-blend-screen pointer-events-none hidden lg:block" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (Split Layout) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left max-w-2xl mx-auto lg:mx-0 w-full"
          >
            {/* Minimalist Tech Badge */}
            <div className="inline-flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/5 text-brand-purple mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </span>
              Image & Video Prompts
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
              The standard for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-300 to-brand-purple">
                Visual Generative Art.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-light leading-relaxed">
              Discover, copy, and create breathtaking images. Browse the ultimate visual prompt gallery for Midjourney and DALL-E, or generate your own using Gemini.
            </p>

            <div className="w-full max-w-md mb-8">
              <SearchBar />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Link 
                href="/explore" 
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-xl text-sm transition-all hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.15)] w-full sm:w-auto"
                aria-label="Explore Visual AI Gallery"
              >
                Explore Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/generate" 
                className="flex items-center justify-center gap-2 px-7 py-3.5 border border-brand-purple/50 bg-brand-purple/10 hover:bg-brand-purple/20 text-white font-semibold rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                aria-label="Generate images with your Gemini API Key"
              >
                <Sparkles className="w-4 h-4 text-brand-purple" />
                Generate with Gemini Key
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-brand-purple" /> Stunning Visuals</div>
              <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-brand-purple" /> Instant Copy + Generate</div>
            </div>
          </motion.div>

          {/* Right Column: Visual Art Gallery Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <InteractivePromptUI />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function InteractivePromptUI() {
  return (
    <div className="relative w-full max-w-xl xl:max-w-2xl mx-auto ml-auto xl:mr-0 z-10 [perspective:1000px]">
      {/* Behind-glow for 3D emphasis */}
      <div className="absolute inset-x-10 inset-y-10 bg-brand-purple/20 blur-[80px] rounded-full mix-blend-screen -z-10" />

      {/* Main Glass Gallery Feed mimicking the app */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        className="transform-gpu shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 bg-[#0a0812]/80 backdrop-blur-2xl rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Gallery Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.03]">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-md text-xs font-mono text-gray-400">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> Currently Trending Prompts
          </div>
        </div>

        {/* Content Listing the Top Visual Prompts with actual placeholder imagery style */}
        <div className="p-6 space-y-6">
          <MockImageCard 
            badge="Midjourney v6"
            title="Neon Cyberpunk Alley"
            prompt="A photorealistic cinematic shot of a rainy neon cyberpunk alleyway in Tokyo, highly detailed reflections 8k --ar 16:9"
            imageUrl="https://images.unsplash.com/photo-1605364850558-29a3977c07e0?q=80&w=600&auto=format&fit=crop"
            active={false}
          />
          <MockImageCard 
            badge="Gemini Visuals"
            title="Ethereal Deep Space"
            prompt="An ethereal glowing nebula in deep space shaped like a cosmic eye, brilliant purple and cyan hues, ultra high resolution"
            imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
            active={true}
          />
        </div>
        
        {/* Fade Out Gradient Cover at bottom for the 'infinite scroll' look */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0812] to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}

function MockImageCard({ badge, title, prompt, imageUrl, active }: { badge: string; title: string; prompt: string; imageUrl: string; active: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border transition-all duration-300 flex flex-col overflow-hidden ${active ? 'bg-brand-purple/10 border-brand-purple/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}>
      
      {/* Mock Image Area */}
      <div className="h-32 w-full bg-cover bg-center relative border-b border-white/10" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">{badge}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white text-sm sm:text-base select-none">{title}</h3>
          <button 
            onClick={handleCopy} 
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
            aria-label="Copy visual prompt"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-400 font-mono leading-relaxed line-clamp-2 select-none">{prompt}</p>
      </div>
    </div>
  );
}
