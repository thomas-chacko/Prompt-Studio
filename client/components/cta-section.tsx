"use client";

import { motion } from "framer-motion";
import AnimatedButton from "./animated-button";

export default function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[3rem] overflow-hidden glass border-white/20 p-12 md:p-24 text-center shadow-[0_0_100px_rgba(112,0,255,0.15)]"
        >
          {/* Animated Glow Background - Performance Optimized */}
          <div 
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(112,0,255,0.4)_360deg)] -z-10 opacity-30 mix-blend-screen pointer-events-none animate-[spin_20s_linear_infinite]" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-cyan/20 z-0 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-brand-cyan font-semibold text-sm mb-6 border border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              Start building today
            </span>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-white leading-tight">
              Level Up Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                AI Prompts
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of creators sharing their best prompts. Access the library entirely for free, no account required.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <AnimatedButton variant="primary" href="/explore" className="w-full sm:w-auto px-10 py-5 text-lg">
                Explore Prompts
              </AnimatedButton>
              <AnimatedButton variant="outline" href="/submit" className="w-full sm:w-auto px-10 py-5 text-lg border-white/30 hover:border-white/50 bg-white/5 backdrop-blur-md">
                Submit Prompt
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
