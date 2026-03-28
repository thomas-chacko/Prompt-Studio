"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Disable default smooth scroll behavior to prevent conflicts
    document.documentElement.style.scrollBehavior = 'auto';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, // Slightly lower for smoother interpolation (0.05-0.1 range)
        duration: 1, // Faster response for better feel
        smoothWheel: true,
        wheelMultiplier: 0.8, // Slightly reduce scroll speed for more control
        touchMultiplier: 1.5, // Touch scroll speed
        infinite: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        prevent: (node) => {
          // Prevent Lenis on specific elements that need native scroll
          return node.classList.contains('no-smooth-scroll') || 
                 node.tagName === 'INPUT' || 
                 node.tagName === 'TEXTAREA' ||
                 node.tagName === 'SELECT';
        }
      }}
    >
      {children}
    </ReactLenis>
  );
}
