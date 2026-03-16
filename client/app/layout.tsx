import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptStudio — Best AI Prompt Library for ChatGPT, Claude & Midjourney",
  description:
    "Browse 10,000+ free AI prompts for ChatGPT, Claude, Midjourney, DALL·E, and Stable Diffusion. Copy trending prompts for coding, marketing, SEO, and writing. No login needed.",
  keywords: [
    "AI prompts", "ChatGPT prompts", "Claude prompts", "Midjourney prompts",
    "free AI prompts", "best AI prompts 2024", "AI prompt library",
    "prompt engineering", "DALL-E prompts", "Stable Diffusion prompts",
    "AI copywriting prompts", "coding prompts", "SEO prompts",
    "ChatGPT prompt generator", "prompt studio",
  ],
  openGraph: {
    title: "PromptStudio — Best AI Prompt Library",
    description: "10,000+ free prompts for ChatGPT, Claude & Midjourney. Copy, use, and share.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptStudio — Best AI Prompt Library",
    description: "10,000+ free prompts for ChatGPT, Claude & Midjourney.",
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
        <LenisProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
