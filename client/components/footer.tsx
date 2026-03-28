import Link from 'next/link';
import { Github, Twitter, DiscIcon as Discord, Sparkles, Image as ImageIcon, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#03010a] pt-20 pb-12 overflow-hidden">
      {/* Subtle top glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-purple/10 blur-[100px] rounded-b-full pointer-events-none" />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-purple/30 group-hover:bg-brand-purple/10 transition-colors">
                <ImageIcon className="w-5 h-5 text-brand-cyan group-hover:text-brand-purple transition-colors" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">PromptStudio</span>
            </Link>
            <p className="text-gray-400 text-sm w-full leading-relaxed mb-6 font-light">
              The world's largest visual AI prompt gallery. Discover stunning generative art, copy Midjourney prompts, and generate masterpieces using your Gemini API key.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="https://twitter.com/promptstudio" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-brand-purple" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/promptstudio" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-brand-purple" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/promptstudio" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-brand-purple" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/promptstudio" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-brand-purple" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@promptstudio" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-brand-purple" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-brand-purple" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white tracking-wide text-sm mb-2">Platform</h4>
            <Link href="/explore" className="text-sm text-gray-500 hover:text-brand-cyan transition-colors">Visual Gallery</Link>
            <Link href="/generate" className="text-sm text-gray-500 hover:text-brand-purple transition-colors">Gemini Generator</Link>
            <Link href="/submit" className="text-sm text-gray-500 hover:text-white transition-colors">Submit Artwork</Link>
            <Link href="/trending" className="text-sm text-gray-500 hover:text-white transition-colors">Trending Prompts</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white tracking-wide text-sm mb-2">Resources</h4>
            <Link href="/docs" className="text-sm text-gray-500 hover:text-white transition-colors">API Guidelines</Link>
            <Link href="/midjourney-guide" className="text-sm text-gray-500 hover:text-white transition-colors">Midjourney v6 Guide</Link>
            <Link href="/dalle-tips" className="text-sm text-gray-500 hover:text-white transition-colors">DALL·E Optimization</Link>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors">Generative Art Blog</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white tracking-wide text-sm mb-2">Legal</h4>
            <Link href="/about" className="text-sm text-gray-500 hover:text-white transition-colors">About PromptStudio</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <a href="mailto:contact@promptstudio.com" className="text-sm text-gray-500 hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} PromptStudio, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-sm text-gray-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
