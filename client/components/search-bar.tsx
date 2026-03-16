"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative max-w-2xl mx-auto w-full group">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 rounded-full blur-xl group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
      <form className="relative flex items-center bg-black/50 border border-white/10 rounded-full overflow-hidden backdrop-blur-xl group-hover:border-white/20 transition-all duration-300 shadow-2xl">
        <Search className="w-5 h-5 text-gray-400 ml-6 group-focus-within:text-brand-cyan transition-colors" />
        <input
          type="text"
          placeholder="Search prompts, categories, or keywords..."
          className="w-full bg-transparent text-white px-4 py-4 outline-none placeholder:text-gray-500 text-lg"
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
