import type { Metadata } from "next";
import SubmitPageClient from "./submit-client";

export const metadata: Metadata = {
  title: "Submit Your AI Prompt — Share with the Community | PromptStudio",
  description:
    "Share your best AI prompts on PromptStudio and reach thousands of creators. Submit prompts for ChatGPT, Claude, Gemini, Midjourney, and more — join the world's largest prompt community.",
  keywords: [
    "submit AI prompt", "share AI prompts", "contribute prompts",
    "sell AI prompts", "AI prompt community", "prompt marketplace submit",
  ],
  openGraph: {
    title: "Submit Your AI Prompt | PromptStudio",
    description: "Share your best prompts with 5,000+ creators on the world's largest AI prompt marketplace.",
    type: "website",
  },
};

export default function SubmitPage() {
  return <SubmitPageClient />;
}
