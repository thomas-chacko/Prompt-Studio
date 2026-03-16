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
  title: "PromptStudio — #1 AI Prompt Marketplace | Buy, Sell & Copy AI Prompts",
  description:
    "PromptStudio is the largest AI prompt marketplace. Browse, copy, and submit thousands of expert-crafted prompts for ChatGPT, Claude, Gemini, Midjourney & more. Plus, generate images using AI — free, no login needed.",
  keywords: [
    "AI prompt marketplace", "AI prompt store", "buy AI prompts", "sell AI prompts",
    "free AI prompts", "ChatGPT prompts", "Claude prompts", "Gemini prompts",
    "Midjourney prompts", "best AI prompts", "AI prompt library",
    "prompt engineering", "copy AI prompts", "AI prompts for coding",
    "AI prompts for marketing", "AI prompts for writing", "AI prompts for SEO",
    "prompt studio", "AI tools", "prompt community", "AI image generation prompts",
  ],
  openGraph: {
    title: "PromptStudio — The #1 AI Prompt Marketplace",
    description: "Discover & copy thousands of expert AI prompts for ChatGPT, Claude, Gemini & Midjourney. The best place to find, share, and submit AI prompts — free forever.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptStudio — The #1 AI Prompt Marketplace",
    description: "Browse thousands of free AI prompts for ChatGPT, Claude, Gemini & Midjourney. Copy in one click. Submit your own.",
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
