"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const PLACEHOLDER_KEYWORDS = [
  "Trending",
  "Portrait",
  "Landscape",
  "Abstract",
  "Cyberpunk",
  "Fantasy",
  "Minimalist",
  "Vintage",
  "Futuristic",
  "Nature"
];

export default function SearchBar() {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setDisplayText("");
      return;
    }

    if (isPaused) return;

    const currentKeyword = PLACEHOLDER_KEYWORDS[currentKeywordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 800;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentKeyword.length) {
          setDisplayText(currentKeyword.slice(0, displayText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseAfterTyping);
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, pause before moving to next keyword
          setIsDeleting(false);
          setIsPaused(true);
          setTimeout(() => {
            setCurrentKeywordIndex((prev) => (prev + 1) % PLACEHOLDER_KEYWORDS.length);
            setIsPaused(false);
          }, pauseAfterDeleting);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentKeywordIndex, isFocused, isPaused]);

  return (
    <div className="relative max-w-2xl mx-auto w-full group">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 rounded-full blur-xl group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
      <form className="relative flex items-center bg-black/50 border border-white/10 rounded-full overflow-hidden backdrop-blur-xl group-hover:border-white/20 transition-all duration-300 shadow-2xl">
        <Search className="w-5 h-5 text-gray-400 ml-6 group-focus-within:text-brand-cyan transition-colors" />
        <input
          type="text"
          placeholder={isFocused ? "" : displayText}
          className="w-full bg-transparent text-white px-4 py-4 outline-none placeholder:text-gray-500 text-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button 
          type="submit"
          className="mr-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-medium transition-colors border border-white/10 my-2"
        >
          Search
        </button>
      </form>
    </div>
  );
}
