import { Metadata } from 'next';
import AnimatedButton from '@/components/animated-button';
import { Wand2, Sparkles, SlidersHorizontal, ArrowRight, Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Prompt Generator | PromptStudio',
  description: 'Generate highly optimized, detailed AI prompts for ChatGPT, Claude, and Midjourney. Boost your AI outputs instantly with our advanced prompt builder.',
  keywords: ['AI Prompt Generator', 'ChatGPT Prompt Builder', 'Best Prompt Creator', 'Prompt Engineering Tool', 'Free AI tools'],
};

export default function GeneratePromptPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
      {/* Page Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-cyan mb-6 shadow-sm shadow-brand-cyan/10">
          <Wand2 className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide">The Ultimate Prompt Builder</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
          Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-500">AI Prompt Generator</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Struggling to get the right output from AI? Tell us what you want to achieve, and our advanced generator will engineer the perfect, highly-detailed prompt for ChatGPT, Claude, or Gemini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        {/* Input Form Column */}
        <div className="lg:col-span-5 glass rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group hover:border-brand-cyan/30 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 blur-[50px] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-brand-cyan" />
              Configure
            </h2>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">What is your goal?</label>
              <textarea
                id="goal"
                rows={3}
                placeholder="e.g. Write a cold email to SaaS founders offering SEO services..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none shadow-inner"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">Act as (Role)</label>
              <select
                id="role"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all appearance-none cursor-pointer"
              >
                <option value="expert">Expert Copywriter</option>
                <option value="developer">Senior Software Engineer</option>
                <option value="marketer">Growth Marketer</option>
                <option value="strategist">Business Strategist</option>
              </select>
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">Tone of Voice</label>
              <div className="grid grid-cols-2 gap-3">
                {['Professional', 'Casual', 'Persuasive', 'Analytical'].map((tone) => (
                  <button type="button" key={tone} className="py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-colors">
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-4 bg-gradient-to-r from-brand-cyan to-blue-600 hover:from-brand-cyan/80 hover:to-blue-600/80 text-white font-bold py-4 px-8 rounded-xl flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_25px_rgba(0,240,255,0.3)]"
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Generate Magic Prompt
            </button>
          </form>
        </div>

        <div className="hidden lg:flex lg:col-span-2 items-center justify-center pointer-events-none opacity-50">
          <ArrowRight className="w-12 h-12 text-gray-500 animate-pulse" />
        </div>

        {/* Output Column */}
        <div className="lg:col-span-5 h-[500px] lg:h-auto glass rounded-3xl p-6 md:p-8 border border-brand-cyan/20 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,240,255,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent z-0" />
          
          <div className="relative z-10 w-full">
            <Loader2 className="w-12 h-12 text-brand-cyan/30 mx-auto mb-6 animate-spin duration-3000" />
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Awaiting Instructions</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Configure your requirements on the left, and watch as we engineer an expertly crafted, highly-effective language model prompt here.
            </p>

            {/* Empty State skeleton visualizer */}
            <div className="mt-10 space-y-3 opacity-20">
              <div className="h-4 bg-white/50 rounded-full w-3/4 mx-auto" />
              <div className="h-4 bg-white/50 rounded-full w-full mx-auto" />
              <div className="h-4 bg-white/50 rounded-full w-5/6 mx-auto" />
              <div className="h-4 bg-white/50 rounded-full w-1/2 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
