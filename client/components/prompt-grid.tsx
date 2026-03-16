"use client";

import { motion } from "framer-motion";
import PromptCard from "./prompt-card";
import type { Prompt } from "@/data/prompts";

export default function PromptGrid({ prompts }: { prompts: Prompt[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
