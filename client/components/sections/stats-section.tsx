"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    value: 10000,
    suffix: "+",
    label: "AI Prompts",
    sub: "Free forever",
    color: "from-brand-cyan to-blue-500",
    glow: "rgba(0,212,255,0.15)",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Creators",
    sub: "Active community",
    color: "from-brand-purple to-indigo-500",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    value: 200,
    suffix: "k+",
    label: "Copies Made",
    sub: "This month",
    color: "from-brand-pink to-rose-500",
    glow: "rgba(236,72,153,0.15)",
  },
  {
    value: 99,
    suffix: "%",
    label: "Satisfaction",
    sub: "5-star rating",
    color: "from-amber-400 to-orange-500",
    glow: "rgba(251,191,36,0.12)",
  },
];

function AnimatedNumber({
  value,
  suffix,
  delay,
}: {
  value: number;
  suffix: string;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    const duration = 2000; // ms

    const tick = (timestamp: number) => {
      if (!start) start = timestamp + delay * 1000;
      const elapsed = Math.max(0, timestamp - start);
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section
      aria-label="PromptStudio platform statistics"
      className="relative py-24 overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(124,58,237,0.05),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map(({ value, suffix, label, sub, color, glow }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-[#09071a] border border-white/8 hover:border-white/15 transition-all overflow-hidden"
              style={{ willChange: "transform" }}
            >
              {/* Glow behind number */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${glow}, transparent)`,
                }}
              />

              {/* Number */}
              <div
                className={`text-5xl lg:text-6xl font-black tracking-tighter mb-2 bg-gradient-to-br ${color} text-transparent bg-clip-text`}
              >
                <AnimatedNumber value={value} suffix={suffix} delay={i * 0.18} />
              </div>

              {/* Label */}
              <div className="text-base font-bold text-white mb-1">{label}</div>

              {/* Sub */}
              <div className="text-xs text-gray-500">{sub}</div>

              {/* Bottom shine line */}
              <div
                className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
