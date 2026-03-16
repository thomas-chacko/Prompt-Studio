import AnimatedButton from "@/components/animated-button";
import PromptGrid from "@/components/prompt-grid";
import { samplePrompts } from "@/data/prompts";

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Prompts</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
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
