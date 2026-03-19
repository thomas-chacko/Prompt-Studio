# PromptStudio — AI Development Rules & Coding Standards

> This file defines the mandatory rules, patterns, and conventions for all development on this project.
> Every AI assistant and developer working on this codebase MUST follow these rules without exception.

---

## 🧭 What Is This Project?

**PromptStudio** is an **AI prompt marketplace (store)** — the primary product is a curated library of AI prompts that users can browse, copy, and submit. AI image generation is a **secondary bonus feature**, not the core product.

### Always frame content as:
- ✅ "Browse our prompt store" / "Copy AI prompts" / "Submit your prompts"
- ✅ "The world's largest AI prompt marketplace"
- ✅ "Prompts for ChatGPT, Claude, Gemini, Midjourney…"
- ❌ Never describe us as "an AI image generator"
- ❌ Never describe us as "a tool that generates AI content"

---

## 📁 Project Structure

```
client/
├── app/                    # Next.js App Router pages (server components by default)
│   ├── page.tsx            # Home page (server component)
│   ├── layout.tsx          # Root layout — global metadata lives here
│   ├── sitemap.ts          # Auto-generates /sitemap.xml
│   ├── robots.ts           # Auto-generates /robots.txt
│   ├── explore/page.tsx    # Prompt store browse page
│   ├── categories/page.tsx # Categories page
│   ├── generate-image/     # AI image generator (secondary feature)
│   ├── generate-prompt/    # AI prompt generator tool
│   └── submit/
│       ├── page.tsx        # Server component — exports metadata
│       └── submit-client.tsx # Client component — interactive form
├── components/
│   ├── sections/           # Page-level section components
│   │   ├── home-hero.tsx
│   │   ├── trending-prompts-section.tsx
│   │   ├── categories-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── models-ticker.tsx
│   │   └── cta-section-new.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── ...shared components
└── data/
    └── prompts.ts          # Prompt data (will be replaced by API later)
```

---

## ⚛️ React & Next.js Rules

### Server vs. Client Components

| Rule | Reason |
|---|---|
| Default to **server components** for all `app/` pages | Better SSR, no hydration cost |
| Only add `"use client"` when you need `useState`, `useEffect`, events, or browser APIs | Keeps bundle lean |
| **Never** put `export const metadata` in a `"use client"` component | Next.js will silently ignore it — metadata only works in server components |
| If a page needs both metadata AND interactivity: create a `page.tsx` (server) + `page-client.tsx` (client) pattern | See `app/submit/` for reference |

```tsx
// ✅ CORRECT pattern for pages needing both
// app/submit/page.tsx (SERVER)
import type { Metadata } from "next";
import SubmitPageClient from "./submit-client";

export const metadata: Metadata = { title: "..." };
export default function SubmitPage() { return <SubmitPageClient />; }

// app/submit/submit-client.tsx (CLIENT)
"use client";
export default function SubmitPageClient() { /* useState, forms, etc */ }
```

### Component Rules
- All components must be typed with explicit TypeScript interfaces — no `any`
- Extract repeated UI into reusable components under `components/`
- Use named exports for utility components; default exports for pages/sections
- `willChange: "transform"` only on animated elements that actually animate
- Never use inline style for colors that belong in the design system (use CSS classes)

---

## 🔍 SEO — Mandatory for Every Page

### Every page route MUST have:
1. `export const metadata` with `title`, `description`, `keywords`, `openGraph`, `twitter`
2. A single semantically correct `<h1>` tag
3. `aria-label` on every `<section>`
4. `alt` text on every `<img>` / Next.js `<Image>`

### Title Format
```
[Page Purpose] — [Keyword] | PromptStudio
```
Examples:
- `Explore AI Prompts — Browse the Prompt Store | PromptStudio`
- `Submit Your AI Prompt — Share with the Community | PromptStudio`

### Description Rules
- 140–160 characters
- Include the primary keyword in the first sentence
- Always mention the marketplace/store angle
- End with a benefit or CTA

### Keywords Checklist
Every page's keywords array must include at least:
- `"AI prompt marketplace"` or `"AI prompt store"`  
- Page-specific keywords (e.g., `"SEO AI prompts"` for the SEO category)
- Model-specific keywords (`"ChatGPT prompts"`, `"Claude prompts"`, etc.)

### Sitemap & Robots
- `app/sitemap.ts` auto-generates `/sitemap.xml` — add every new route here
- `app/robots.ts` auto-generates `/robots.txt` — never disallow public routes
- **Live URL**: `https://promptstudio-web.vercel.app` — this is already set in both files

---

## 🖥️ SSR (Server-Side Rendering) Rules

- All `app/` pages default to SSR — **do not** opt out with `export const dynamic = 'force-static'` unless data is truly static
- Data fetching must happen in server components using `async/await` — never `useEffect` for data that should be indexed
- `"use client"` components that need server data should receive it as props from a parent server component
- Forms that submit data must have both a `<label htmlFor>` and an `id` on the input for accessibility + SEO

```tsx
// ✅ SSR-safe data fetch
export default async function ExplorePage() {
  const prompts = await fetchPrompts(); // server-side, fast, indexed by Google
  return <PromptGrid prompts={prompts} />;
}

// ❌ Never use useEffect for initial data load that should be SEO-indexed
useEffect(() => { fetch('/api/prompts') }, []); // Google won't see this
```

---

## 📱 Responsiveness Rules

### Breakpoints (Tailwind)
| Prefix | Pixels | Use for |
|---|---|---|
| (none) | 0px+ | Mobile first — always start here |
| `sm:` | 640px+ | Large phones, small tablets |
| `md:` | 768px+ | Tablets |
| `lg:` | 1024px+ | Laptops |
| `xl:` | 1280px+ | Desktops |

### Required Checks for Every Component
- [ ] Does it stack vertically on mobile (< 640px)?
- [ ] Is text readable at mobile size? (min `text-sm`, prefer `text-base`)
- [ ] Do grids collapse correctly? Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [ ] Are tap targets at least 44×44px on mobile?
- [ ] Is horizontal overflow prevented? (`overflow-x-hidden` on page wrapper)
- [ ] Does the hero section fit within viewport height on mobile? (`min-h-screen` not `h-screen`)

### Typography Scale
```
Hero heading:    text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem]
Section heading: text-3xl md:text-4xl lg:text-5xl
Card heading:    text-lg md:text-xl
Body:            text-sm md:text-base
Caption:         text-xs sm:text-sm
```

---

## ⚡ Performance Rules

### Animation Rules
- Use CSS `animate-pulse`, `animate-spin` for simple loops — not Framer Motion
- Use Framer Motion ONLY for entry animations and complex interactions
- Always add `viewport={{ once: true }}` to `whileInView` animations — never re-animate on scroll-back
- Add `style={{ willChange: "transform" }}` only on elements that will actually animate
- Never use Framer Motion `animate` for continuous effects that could be CSS (`@keyframes`)
- Limit `blur()` filter values — large blur radii (> 100px) are GPU-expensive

```tsx
// ✅ Cheap CSS orb (good)
<div className="animate-pulse bg-brand-cyan blur-[80px]" style={{ animationDuration: "7s" }} />

// ❌ Expensive Framer loop (bad — kills battery on mobile)
<motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity }} />
```

### Image Rules
- Always use `next/image` (`<Image>`) — never `<img>` for content images
- Always supply `width`, `height`, and `alt`
- Use `priority` prop on above-the-fold images (hero)
- For decorative backgrounds, use CSS `background-image` or `<div>` with Tailwind — not `<Image>`

### Bundle Rules
- Never import an entire library when you need one function: `import { motion } from "framer-motion"` ✅
- Remove all unused imports immediately (ESLint will flag these)
- Use `dynamic()` import for heavy components not needed on initial load

---

## 🎨 Design System

### Color Tokens (defined in Tailwind config)
| Token | Value | Use for |
|---|---|---|
| `brand-purple` | `#7c3aed` | Primary actions, active states |
| `brand-cyan` | `#00d4ff` | Accents, highlights, icons |
| `brand-pink` | `#ec4899` | Gradient ends, special highlights |

### Background Colors
- Page background: `bg-[#03010a]`
- Card background: `bg-[#0a0812]`
- Elevated section: `bg-[#050312]`

### Button Patterns
```tsx
// PRIMARY — gradient glow (main CTA)
className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0891b2 100%)" }}

// SECONDARY — glass border
className="border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-brand-cyan/40 transition-all duration-300"

// GHOST — nav links
className="text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
```

### Spacing Rules
- Section padding: `py-24` (desktop), `py-16` (mobile via responsive)
- Card padding: `p-5` (small cards) `p-6 md:p-8` (large cards)
- Max content widths: `max-w-7xl` (full page), `max-w-5xl` (centered content), `max-w-2xl` (text columns)

---

## ♿ Accessibility Rules

- Every `<section>` must have `aria-label` describing its content
- Every interactive element needs an accessible label (`aria-label` or visible text)
- Icon-only buttons MUST have `aria-label` or a `<span className="sr-only">`
- Color contrast: text on dark backgrounds must be at least `text-gray-400` (never `text-gray-600` for readable text)
- Focus states must be visible — never do `outline-none` without a replacement `focus:ring`

---

## 🗂️ Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `TrendingPromptsSection` |
| Files | kebab-case | `trending-prompts-section.tsx` |
| Client files | suffix `-client` | `submit-client.tsx` |
| Constants | SCREAMING_SNAKE | `const PLACEHOLDERS = [...]` |
| Types/Interfaces | PascalCase | `type Category = {...}` |
| CSS variables | `--kebab-case` | `--font-geist-sans` |
| Event handlers | `handle` prefix | `handleCopy`, `handleSubmit` |

---

## 🚫 Hard Rules (Never Do These)

1. **Never** use `"use client"` on a page that exports `metadata`
2. **Never** leave `any` types in TypeScript — always type explicitly
3. **Never** use `<img>` for content images — always `next/image`
4. **Never** fetch data in `useEffect` for content that needs SEO indexing
5. **Never** add a new page route without adding it to `app/sitemap.ts`
6. **Never** use inline styles for colors from the design system — use Tailwind classes
7. **Never** remove `pointer-events-none` from decorative background `<div>` elements
8. **Never** use the phrase "AI image generator" as the primary description of PromptStudio
9. **Never** create a continuous Framer Motion animation loop for a purely decorative element
10. **Never** add `overflow-hidden` to the page `<body>` permanently (breaks sticky/fixed elements)

---

## 🚀 CI/CD & Testing Rules

- All code changes are verified by a GitHub Actions CI/CD pipeline (`.github/workflows/ci-cd.yml`).
- The frontend pipeline runs `pnpm test` (Vitest) and `pnpm build`.
- You **must** ensure all tests pass locally before pushing to `main`.
- Deployment to Vercel happens automatically when code is pushed to the `main` branch and the pipeline succeeds.

---

## ✅ Pre-Commit Checklist

Before considering any feature done, verify:

- [ ] TypeScript compiles with no errors (`pnpm build`)
- [ ] All tests pass locally (`pnpm test`)
- [ ] No unused imports (ESLint clean)
- [ ] Page has `export const metadata` if it's a new route
- [ ] New route added to `app/sitemap.ts`
- [ ] All interactive client code is in a `"use client"` file
- [ ] Mobile layout tested at 375px width
- [ ] Every `<section>` has `aria-label`
- [ ] Every new `<img>` replaced with `<Image>` from `next/image`
- [ ] `whileInView` animations have `viewport={{ once: true }}`
- [ ] Content refers to PromptStudio as a prompt store/marketplace

---

*Last updated: March 2026*
