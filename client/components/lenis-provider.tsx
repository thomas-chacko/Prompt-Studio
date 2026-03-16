"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, // Smoothness interpolation
        duration: 1.2, // Slightly faster to feel more responsive on slow devices
        smoothWheel: true, 
        wheelMultiplier: 1, // Standardizes wheel scroll step feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optimized easing curve that looks buttery
        touchMultiplier: 2, // Smooth touch experience
      }}
    >
      {children}
    </ReactLenis>
  );
}
