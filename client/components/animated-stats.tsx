"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function StatItem({ end, label, suffix = "", delay = 0 }: StatItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, end, {
        duration: 2,
        delay: delay,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Math.floor(value));
        },
      });
      return controls.stop;
    }
  }, [inView, end, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, delay: delay }}
        className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight"
      >
        {count.toLocaleString()}
        <span className="text-brand-cyan">{suffix}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider"
      >
        {label}
      </motion.div>
    </div>
  );
}

export default function AnimatedStats() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-transparent to-brand-purple/5" />
          
          <StatItem end={10000} label="Prompts Available" suffix="+" delay={0} />
          <div className="hidden md:block w-px h-24 bg-white/10" />
          <StatItem end={5000} label="Active Creators" suffix="+" delay={0.2} />
          <div className="hidden md:block w-px h-24 bg-white/10" />
          <StatItem end={200} label="Prompt Copies" suffix="k+" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
