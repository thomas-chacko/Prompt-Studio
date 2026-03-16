"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import AnimatedButton from "./animated-button";

export default function CopyDetailButton({ content, copyCount: initialCount }: { content: string, copyCount: number }) {
  const [copied, setCopied] = useState(false);
  const [copyCount, setCopyCount] = useState(initialCount);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setCopyCount((prev) => prev + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <AnimatedButton onClick={handleCopy} variant="primary" className="flex-1 w-full flex items-center justify-center gap-2">
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        {copied ? "Copied to Clipboard!" : "Copy Prompt text"}
      </AnimatedButton>
      
      <AnimatedButton onClick={handleShare} variant="outline" className="flex items-center justify-center gap-2">
        <Share2 className="w-5 h-5" />
        Share Link
      </AnimatedButton>
      
      <div className="flex items-center justify-center px-6 py-4 rounded-full glass border-white/10 text-sm font-medium text-gray-400">
        {copyCount.toLocaleString()} Copies
      </div>
    </div>
  );
}
