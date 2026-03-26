import React from 'react';

export default function SEOContentSection() {
  return (
    <section className="py-24 bg-[#03010a] border-t border-white/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-gray-300">
        <div className="space-y-12">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              The Ultimate Hub for AI Image & Video Prompts
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              Welcome to PromptStudio, the internet's most comprehensive gallery for AI-generated visual art. 
              Whether you're a seasoned digital artist or a beginner exploring the world of generative AI, 
              our platform provides everything you need to spark your creativity and engineer the perfect prompt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-brand-purple"></span>
                Master Midjourney & DALL-E
              </h3>
              <p className="text-gray-400 leading-relaxed font-light mb-4">
                Creating breathtaking AI art requires more than just a basic idea—it requires precise prompt engineering. 
                Our curated collection features the very best Midjourney prompts, DALL-E commands, and Stable Diffusion parameters. 
                Discover how specific keywords, camera angles, lighting descriptors, and art styles dramatically change your resulting image.
              </p>
              <p className="text-gray-400 leading-relaxed font-light">
                By copying and modifying our top-performing community prompts, you can reverse-engineer stunning visuals and learn 
                how to communicate effectively with today's leading diffusion models.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-brand-cyan"></span>
                Generate Art with Gemini API
              </h3>
              <p className="text-gray-400 leading-relaxed font-light mb-4">
                We go beyond just being a visual AI gallery. PromptStudio empowers you to generate your own masterpieces directly 
                within our platform. By securely integrating your Google Gemini API key, you can utilize state-of-the-art vision 
                models to bring your imagination to life without ever leaving the site.
              </p>
              <p className="text-gray-400 leading-relaxed font-light">
                Our built-in generator is designed for speed, quality, and iteration. Test out new prompt structures, compare variations, 
                and instantly download your favorite AI-generated images and videos to share with the world.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Why Content Creators Choose PromptStudio</h3>
            <div className="grid sm:grid-cols-3 gap-6 text-center mt-8">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Curated Quality</h4>
                <p className="text-sm text-gray-400 font-light">Every prompt in our gallery is visually verified to ensure high-quality outputs across popular AI models.</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">One-Click Copying</h4>
                <p className="text-sm text-gray-400 font-light">Our seamless UI allows you to instantly copy prompt text, parameters, and negative prompts to your clipboard.</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Active Community</h4>
                <p className="text-sm text-gray-400 font-light">Join thousands of AI artists sharing their techniques, workflows, and discoveries in the generative space.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
