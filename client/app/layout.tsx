import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/conditional-layout";
import APIWarmup from "@/components/api-warmup";
import ToastContainer from "@/components/toast";
import ErrorBoundary from "@/components/error-boundary";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: import("next").Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#03010a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://promptstudio-web.vercel.app"),
  title: "PromptStudio: Top AI Image & Video Prompts",
  description: "Discover breathtaking AI image & video prompts for Midjourney & DALL-E. Generate art using the Gemini API.",
  keywords: [
    "AI image prompts", "Midjourney prompts", "DALL-E prompts", "Stable diffusion prompts",
    "AI generative art", "AI image generator", "Gemini API image generation",
    "copy image prompts", "visual AI gallery", "AI video prompts",
    "AI art community", "prompt studio art", "best AI image prompts",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "PromptStudio: Top AI Image & Video Prompts",
    description: "Discover breathtaking AI image & video prompts for Midjourney & DALL-E. Generate art using the Gemini API.",
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptStudio: Top AI Image & Video Prompts",
    description: "Discover breathtaking AI image & video prompts for Midjourney & DALL-E. Generate art using the Gemini API.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PromptStudio",
    "url": "https://promptstudio-web.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://promptstudio-web.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://twitter.com/promptstudio",
      "https://facebook.com/promptstudio",
      "https://instagram.com/promptstudio",
      "https://linkedin.com/company/promptstudio",
      "https://youtube.com/@promptstudio"
    ]
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <ErrorBoundary>
          <APIWarmup />
          <ToastContainer />
          <ConditionalLayout>
            {children}
            <Analytics />
          </ConditionalLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
