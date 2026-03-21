import { Metadata } from "next";
import ProtectedRoute from "@/components/protected-route";
import SubmitClient from "./submit-client";

export const metadata: Metadata = {
  title: "Submit AI Prompt — Share Your Creation | PromptStudio",
  description: "Share your AI-generated image prompts with the PromptStudio community. Upload your creation and inspire others.",
  keywords: ["submit prompt", "share AI art", "upload prompt", "AI image gallery"],
};

export default function SubmitPage() {
  return (
    <ProtectedRoute>
      <SubmitClient />
    </ProtectedRoute>
  );
}
