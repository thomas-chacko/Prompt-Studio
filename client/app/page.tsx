import dynamic from 'next/dynamic';
import HomeHero from "@/sections/home-hero";

// Lazy load below-the-fold sections to improve INP and initial load time
const TrendingPromptsSection = dynamic(() => import("@/sections/trending-prompts-section"));
const CategoriesSection = dynamic(() => import("@/sections/categories-section"));
const HowItWorksSection = dynamic(() => import("@/sections/how-it-works-section"));
const ModelsTicker = dynamic(() => import("@/sections/models-ticker"));
const SEOContentSection = dynamic(() => import("@/sections/seo-content-section"));
const CTASectionNew = dynamic(() => import("@/sections/cta-section-new"));

export default function Home() {
  return (
    <div className="flex flex-col bg-[#03010a] overflow-x-hidden -mt-16">
      {/* Section 1: Hero */}
      <HomeHero />

      {/* Section 3: Trending AI Prompts Grid */}
      <TrendingPromptsSection />

      {/* Section 4: Browse by Category */}
      <CategoriesSection />

      {/* Section 5: How It Works */}
      <HowItWorksSection />

      {/* Section 6 (Second-last): AI Models Ticker */}
      <ModelsTicker />

      {/* SEO Section to improve text-to-code ratio */}
      <SEOContentSection />

      {/* Section 7 (Last): Call to Action */}
      <CTASectionNew />
    </div>
  );
}
