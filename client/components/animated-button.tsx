"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}

export default function AnimatedButton({ href, children, className, variant = "primary", onClick }: AnimatedButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all duration-300 text-lg group relative overflow-hidden";
  
  const variants = {
    primary: "bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    secondary: "bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:scale-105 shadow-[0_0_20px_rgba(112,0,255,0.4)]",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10"
  };

  const Content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant !== "outline" && (
        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      )}
    </>
  );

  return href ? (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
      <Link href={href} className={cn(baseStyles, variants[variant], className)}>
        {Content}
      </Link>
    </motion.div>
  ) : (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
      {Content}
    </motion.button>
  );
}
