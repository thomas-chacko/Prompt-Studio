import type { Metadata } from "next";
import SignupClient from "./signup-client";

export const metadata: Metadata = {
  title: "Sign Up — PromptStudio",
  description: "Create your PromptStudio account to save prompts, create collections, and more.",
};

export default function SignupPage() {
  return <SignupClient />;
}
