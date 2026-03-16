"use client";

import { motion } from "framer-motion";

export default function InfiniteTicker() {
  const words = [
    "ChatGPT", "Claude", "Midjourney", "DALL-E", "Stable Diffusion",
    "Gemini", "Llama 3", "Mistral", "Copilot", "OpenAI",
    "ChatGPT", "Claude", "Midjourney", "DALL-E", "Stable Diffusion",
  ];

  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center justify-center py-12 border-y border-white/5 bg-black">
      {/* Masks for fading edges */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <p className="text-gray-500 font-medium text-sm mb-6 z-10 tracking-widest uppercase">Powers models from</p>
      
      <div className="flex whitespace-nowrap overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex gap-16 item-center px-8"
        >
          {words.map((word, i) => (
             <span key={i} className="text-2xl md:text-3xl font-extrabold text-white/20 uppercase tracking-tighter">
               {word}
             </span>
          ))}
        </motion.div>
        
        {/* Duplicate for seamless infinite loop effect */}
         <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex gap-16 item-center px-8"
        >
          {words.map((word, i) => (
             <span key={i + 100} className="text-2xl md:text-3xl font-extrabold text-white/20 uppercase tracking-tighter">
               {word}
             </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
