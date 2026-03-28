import AnimatedButton from "@/components/animated-button";
import PromptGrid from "@/components/prompt-grid";
import { samplePrompts } from "@/data/prompts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore AI Prompts — Browse the Prompt Store | PromptStudio",
  description:
    "Browse thousands of expert-crafted, free AI prompts for ChatGPT, Claude, Gemini, and Midjourney. Filter by category, sort by popularity, and copy in one click.",
  keywords: [
    "explore AI prompts", "browse AI prompts", "free ChatGPT prompts",
    "Claude prompts", "Gemini prompts", "AI prompt store", "best AI prompts",
  ],
  openGraph: {
    title: "Explore AI Prompts | PromptStudio",
    description: "Browse & copy thousands of free, expert-crafted AI prompts. Filter by category, model, and use case.",
    type: "website",
  },
};


export default function ExplorePage() {
  return (
    <div className="w-full mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Prompts</h1>
          <p className="text-xl text-gray-400 w-full">
            Discover the highest quality prompts curated by the community.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <select className="glass px-4 py-2 rounded-lg text-sm font-medium text-white border-white/10 outline-none">
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="copied">Most Copied</option>
          </select>
        </div>
      </div>
      
      {/* Search Input for filtering */}
      <div className="mb-12 relative">
        <input 
          type="text" 
          placeholder="Filter prompts..." 
          className="w-full glass bg-transparent text-white px-6 py-4 rounded-xl outline-none placeholder:text-gray-500 text-lg border-white/10 focus:border-brand-cyan/50 transition-colors"
        />
      </div>

      <PromptGrid prompts={samplePrompts} />
      
      <div className="mt-16 flex justify-center">
        <AnimatedButton variant="outline">
          Load More Prompts
        </AnimatedButton>
      </div>
    </div>
  );
}
