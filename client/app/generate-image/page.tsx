import { Metadata } from 'next';
import { ImageIcon, Wand2, ArrowRight, Dices } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Image Generator | PromptStudio',
  description: 'Generate stunning, hyper-realistic AI images using our advanced image prompt builder. Perfect for Midjourney, DALL-E, and Stable Diffusion.',
  keywords: ['AI Image Generator', 'Midjourney Prompt Builder', 'DALL-E Prompt Creator', 'Stable Diffusion', 'Free Text to Image Prompts'],
};

export default function GenerateImagePage() {
  return (
    <div className="w-full mx-auto px-4 py-12 md:py-24">
      {/* Page Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-purple/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-purple mb-6 shadow-sm shadow-brand-purple/10">
          <ImageIcon className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide">Image Prompt Architect</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
          AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">Image Generator</span>
        </h1>
        <p className="text-xl text-gray-400 w-full mx-auto leading-relaxed">
          Creating breathtaking AI art requires precision. Build the perfect text-to-image prompts for Midjourney, DALL-E 3, and Stable Diffusion by fine-tuning lighting, style, and camera settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start relative">
        {/* Editor Column */}
        <div className="glass rounded-3xl p-6 md:p-8 border border-brand-purple/20 hover:border-brand-purple/40 transition-colors duration-500 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-brand-purple" />
              Build Image Prompt
            </h2>
            <button className="text-xs text-brand-cyan hover:text-white transition-colors flex items-center gap-1 bg-brand-cyan/10 px-3 py-1.5 rounded-full">
              <Dices className="w-3 h-3" /> Randomize
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Main Subject</label>
              <input
                type="text"
                placeholder="e.g. A futuristic cyber-city during heavy rain..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Art Style</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-all appearance-none">
                  <option>Photorealistic</option>
                  <option>Anime / Manga</option>
                  <option>Cyberpunk</option>
                  <option>Oil Painting</option>
                  <option>3D Render (Unreal Engine)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Lighting</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-all appearance-none">
                  <option>Cinematic Lighting</option>
                  <option>Neon / Synthwave</option>
                  <option>Golden Hour</option>
                  <option>Studio Lighting</option>
                  <option>Volumetric Rays</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio (Midjourney)</label>
              <div className="flex gap-3">
                {['1:1', '16:9', '9:16', '3:2'].map((ratio) => (
                  <button type="button" key={ratio} className="flex-1 py-3 px-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:border-brand-purple/50 hover:bg-brand-purple/10 transition-colors">
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-6 bg-gradient-to-r from-brand-purple to-pink-600 hover:from-brand-purple/80 hover:to-pink-600/80 text-white font-bold py-4 px-8 rounded-xl flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_25px_rgba(112,0,255,0.4)]"
            >
              Construct Image Prompt <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>

        {/* Visual Preview Column */}
        <div className="glass rounded-3xl p-2 border border-white/5 relative overflow-hidden h-[400px] lg:h-full min-h-[500px] flex items-center justify-center bg-black/50 shadow-2xl group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000 grayscale mix-blend-luminosity" />
          
          <div className="relative z-10 text-center p-8 backdrop-blur-md bg-black/60 rounded-2xl border border-white/10 max-w-sm">
            <ImageIcon className="w-12 h-12 text-pink-400 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold text-white mb-2">Visual Preview</h3>
            <p className="text-sm text-gray-400">
              Your engineered prompt will appear here, fully formatted with specific camera angles, render engines, and stylization parameters ready to be pasted into your AI tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
