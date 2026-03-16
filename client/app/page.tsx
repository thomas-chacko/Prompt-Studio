import HomeHero from "@/components/sections/home-hero";
import TrendingPromptsSection from "@/components/sections/trending-prompts-section";
import CategoriesSection from "@/components/sections/categories-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import ModelsTicker from "@/components/sections/models-ticker";
import CTASectionNew from "@/components/sections/cta-section-new";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#03010a] overflow-x-hidden">
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

      {/* Section 7 (Last): Call to Action */}
      <CTASectionNew />
    </div>
  );
}
