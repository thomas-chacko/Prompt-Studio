"use client";

import AnimatedButton from "@/components/animated-button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SubmitPageClient() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="w-full mx-auto px-4 py-24 text-center">
        <div className="glass rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/20 rounded-full blur-[80px] -z-10" />
          <h2 className="text-4xl font-bold mb-4">Prompt Submitted!</h2>
          <p className="text-xl text-gray-400 mb-8 w-full mx-auto">
            Your prompt has been successfully submitted and is currently{" "}
            <span className="text-brand-cyan font-bold">pending review</span>.
            You will be notified once it is approved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton variant="outline" onClick={() => setSuccess(false)}>
              Submit Another
            </AnimatedButton>
            <AnimatedButton variant="primary" href="/explore">
              Explore Prompts
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="mb-10 block">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit a Prompt</h1>
        <p className="text-xl text-gray-400">Share your best AI prompts with the community.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden border-white/10 space-y-6"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] -z-10" />

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Prompt Title
          </label>
          <input
            type="text"
            id="title"
            required
            placeholder="e.g. SEO Blog Outline Generator"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <select
            id="category"
            required
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all appearance-none"
          >
            <option value="">Select a category</option>
            <option value="Marketing">Marketing</option>
            <option value="Coding">Coding</option>
            <option value="SEO">SEO</option>
            <option value="Writing">Writing</option>
            <option value="Business">Business</option>
            <option value="Productivity">Productivity</option>
            <option value="Social Media">Social Media</option>
            <option value="AI & Research">AI &amp; Research</option>
            <option value="Image Generation">Image Generation</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Short Description
          </label>
          <textarea
            id="description"
            rows={2}
            required
            placeholder="What does this prompt do?"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            Prompt Content
          </label>
          <textarea
            id="content"
            rows={8}
            required
            placeholder="Act as an expert..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-y"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            placeholder="seo, blog, copywriting"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
          />
        </div>

        <div className="pt-6 border-t border-white/10">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-purple/80 hover:to-brand-cyan/80 text-white font-bold py-4 px-8 rounded-xl flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(112,0,255,0.4)]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
}
