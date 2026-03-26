import { Metadata } from "next";
import NotFoundContent from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "404 - Neural Path Not Found | PromptStudio",
  description: "The path you're looking for was never generated. Explore our library of premium AI prompts instead.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
