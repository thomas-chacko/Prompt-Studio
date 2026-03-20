# PromptStudio — AI Development Rules & Coding Standards

> This file defines the mandatory rules, patterns, and conventions for all development on this project.
> Every AI assistant and developer working on this codebase MUST follow these rules without exception.

---

## 🧭 What Is This Project?

**PromptStudio** is an **AI Image & Video Prompt Gallery and Generator**. The main product is a visually stunning library of image prompts (and eventually video prompts) where users can see popular AI-generated images, copy the exact prompts used to create them, and even generate their own images directly on the site using their own Gemini API key.

### Always frame content as:
- ✅ "Discover breathtaking AI image prompts" / "Gallery of generative art"
- ✅ "Generate your own images using a Gemini API key"
- ✅ "Prompts for Midjourney, DALL-E, Stable Diffusion, and Gemini"
- ❌ Never describe us as a "text prompt library" or "ChatGPT coding assistant"
- ❌ Do not include SEO, SaaS marketing, or coding prompts — this is exclusively for Visual AI Media (Image/Video).

---

## 📁 Project Structure

```
client/
├── app/                    # Next.js App Router pages (server components by default)
│   ├── page.tsx            # Home page (server component)
│   ├── layout.tsx          # Root layout — global metadata lives here
│   ├── sitemap.ts          # Auto-generates /sitemap.xml
│   ├── robots.ts           # Auto-generates /robots.txt
│   ├── explore/page.tsx    # Visual gallery of prompts
│   ├── generate/page.tsx   # Tool to generate images using Gemini API
│   └── submit/page.tsx     # Submission page for new image prompts
├── components/             # Reusable UI components
├── sections/               # Page-level section components (HomeHero, etc.)
└── data/                   # Mock data for images/prompts
```

---

## ⚛️ React & Next.js Rules

### Server vs. Client Components

| Rule | Reason |
|---|---|
| Default to **server components** for all `app/` pages | Better SSR, no hydration cost |
| Only add `"use client"` when you need `useState`, `useEffect`, events, or browser APIs | Keeps bundle lean |
| **Never** put `export const metadata` in a `"use client"` component | Metadata only works in server components |

### Component Rules
- All components must be typed with explicit TypeScript interfaces — no `any`
- Extract repeated UI into reusable components under `components/`
- Use smooth scroll behavior across the application (`html { scroll-behavior: smooth }`).

---

## 🔍 SEO — Mandatory for Every Page

### Every page route MUST have:
1. `export const metadata` with `title`, `description`, `keywords`, `openGraph`, `twitter`
2. A single semantically correct `<h1>` tag
3. `aria-label` on every `<section>`
4. `alt` text on every `<Image>` describing the visual art and the prompt

### Title Format
```
[Page Purpose] — [Keyword] | PromptStudio
```
Examples:
- `Explore AI Art Prompts — Stunning Visual Gallery | PromptStudio`
- `Generate AI Images — Bring Your Prompts to Life | PromptStudio`

---

## 🖥️ Performance, SSR, & Media Rules

- **Extreme Performance**: Because this relies heavily on images, you MUST use `next/image` (`<Image>`) with proper `loading="lazy"` (except above-the-fold which get `priority`), `blurDataURL` (where applicable), and sizing.
- Forms that submit data must have both a `<label htmlFor>` and an `id` on the input for accessibility + SEO.
- Render server-side data (`async/await`) instead of using `useEffect` whenever possible.

---

## 📱 Responsiveness

- Mobile first. Everything MUST collapse vertically. Image grids should shift from 1 column (mobile) to 2 (tablet) to 3 or 4 (desktop).
- Prevent horizontal scrolling overflow at all costs (`overflow-x-hidden`).

---

## 🎨 Design System

- **Vibe**: A high-end, visual-first gallery. Sleek, minimalist borders that don't take attention away from the generated images.
- **Colors**: Deep dark mode (`#03010a`) background, with beautiful glassmorphism to show depth behind images. Accent: `brand-purple` (`#7c3aed`).

### Spacing Rules
- Section padding: `py-24` (desktop), `py-16` (mobile)

---

## ♿ Accessibility
- Visually hidden labels (`sr-only`) for icon buttons. Focus outlines should be visible on keyboard navigation. Contrast ratio must remain strong against the dark background.

---

## 🚫 Hard Rules (Never Do These)

1. **Never** use `"use client"` on a page that exports `metadata`
2. **Never** leave `any` types in TypeScript
3. **Never** refer to text-generation or coding prompts (ChatGPT/Claude text).
4. **Never** clutter the UI. Let the images speak for themselves. 
5. **Never** block the main JS thread with expensive Framer Motion infinite loops. Use CSS for ambient effects.

---

## ✅ Pre-Commit Checklist

- [ ] TypeScript compiles (`pnpm build`)
- [ ] No unused imports
- [ ] Fast, smooth scroll implemented
- [ ] Next/Image used exclusively for the gallery

*Last updated: March 2026*
