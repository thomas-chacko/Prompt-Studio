import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import APIWarmup from "@/components/api-warmup";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptStudio — #1 AI Image & Video Prompt Gallery | Generate with Gemini",
  description:
    "PromptStudio is the largest visual AI prompt gallery. Browse, copy, and discover breathtaking image prompts for Midjourney, DALL-E, & Stable Diffusion. Generate your own stunning AI images right here using your Gemini API key.",
  keywords: [
    "AI image prompts", "Midjourney prompts", "DALL-E prompts", "Stable diffusion prompts",
    "AI generative art", "AI image generator", "Gemini API image generation",
    "copy image prompts", "visual AI gallery", "AI video prompts",
    "AI art community", "prompt studio art", "best AI image prompts",
  ],
  openGraph: {
    title: "PromptStudio — Visual AI Prompt Gallery",
    description: "Discover breathtaking AI image prompts. Generate stunning generative art using your Gemini API key. Free curated library of Midjourney and DALL-E prompts.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptStudio — Visual AI Prompt Gallery",
    description: "Browse the world's best AI image prompts. Copy in one click. Generate stunning art directly with your Gemini API key.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <APIWarmup />
        <LenisProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
              <Analytics />
            </main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
