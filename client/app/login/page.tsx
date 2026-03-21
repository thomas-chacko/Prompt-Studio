import type { Metadata } from "next";
import LoginClient from "./login-client";

export const metadata: Metadata = {
  title: "Login — PromptStudio",
  description: "Login to your PromptStudio account to access your saved prompts and collections.",
};

export default function LoginPage() {
  return <LoginClient />;
}
