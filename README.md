<div align="center">
  <h1>PromptStudio</h1>
  <p>An AI image prompt gallery and generator — browse stunning AI-generated visuals, copy the exact prompts behind them, and generate your own using Gemini.</p>

  <p>
    <a href="https://promptstudio-web.vercel.app">Live Site</a> ·
    <a href="https://prompt-studio-0egh.onrender.com">API</a>
  </p>
</div>

---

## What is PromptStudio?

PromptStudio is a visual-first gallery of AI-generated images paired with the exact prompts used to create them. Users can browse by category, copy prompts for use in Midjourney, DALL-E, Stable Diffusion, or Gemini, and generate their own images directly on the platform using either their own Gemini API key or the platform's free daily quota.

---

## Features

- **Prompt Gallery** — Browse, filter by category, and search a curated library of AI image prompts
- **AI Image Generation** — Generate images via Google Gemini Imagen 3 using your own API key or the platform's free quota
- **Prompt Enhancer** — Expand a short idea into a rich, detailed generation prompt using Gemini Flash
- **Collections** — Save and organise prompts into personal boards
- **User Accounts** — Signup, login, profile management, avatar upload
- **Generation History** — View and manage your past generations, save them to the public gallery
- **Admin Panel** — Content moderation, category management, platform-wide stats

---

## Tech Stack

### Frontend (`/client`)

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | SSR-first React framework |
| React 19 | UI library |
| TypeScript | Type safety across all components |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations and transitions |
| Lenis | Smooth scroll |
| Lucide React | Icon library |
| Vercel Analytics | Usage tracking |
| Vitest + Testing Library | Unit testing |

### Backend (`/server`)

| Technology | Purpose |
|---|---|
| Node.js 20+ (ESM) | Runtime — native `import/export`, no `require()` |
| Express 4 | HTTP framework |
| Neon (PostgreSQL 15) | Serverless Postgres database |
| Prisma ORM | Type-safe DB queries and migrations |
| Cloudinary | Image upload, storage, and CDN delivery |
| Google Gemini (Imagen 3) | AI image generation |
| Google Gemini Flash | Prompt enhancement (text model) |
| JWT (jsonwebtoken) | Stateless authentication |
| bcrypt (rounds: 12) | Password hashing |
| AES-256-GCM | Encrypting user Gemini API keys at rest |
| Helmet + CORS + express-rate-limit | Security hardening |
| Docker + Render | Containerised deployment |

---

## Project Structure

```
prompt-studio/
├── client/                   # Next.js frontend
│   ├── app/                  # App Router pages (SSR by default)
│   │   ├── page.tsx          # Home
│   │   ├── explore/          # Prompt gallery
│   │   ├── generate-image/   # Image generation tool
│   │   ├── generate-prompt/  # Prompt enhancer
│   │   ├── categories/       # Browse by category
│   │   ├── prompt/[id]/      # Single prompt detail
│   │   └── submit/           # Submit a new prompt
│   ├── components/           # Reusable UI components
│   ├── sections/             # Page-level section components
│   ├── lib/                  # Utility functions
│   └── data/                 # Static/mock data
│
└── server/                   # Express REST API
    ├── prisma/
    │   └── schema.prisma     # Single source of truth for DB schema
    └── src/
        ├── index.js          # Entry point
        ├── app.js            # Express app — middleware + routes
        ├── config/env.js     # Centralised env var access
        ├── routes/           # HTTP route definitions
        ├── controllers/      # Request parsing, response sending
        ├── services/         # Business logic, DB queries, external APIs
        ├── middleware/       # Auth, rate limiting, error handling
        └── utils/            # Pure helper functions
```

---

## API

Base URL: `https://prompt-studio-0egh.onrender.com/api/v1`

All responses follow a consistent shape:

```jsonc
// Success
{ "success": true, "data": { ... } }

// Paginated
{ "success": true, "data": [...], "meta": { "page": 1, "limit": 10, "total": 240, "totalPages": 24 } }

// Error
{ "success": false, "message": "Prompt with id \"99\" not found" }
```

Key route groups: `/api/v1/auth`, `/api/v1/user`, `/api/v1/prompts`, `/api/v1/categories`, `/api/v1/search`, `/api/v1/generate`, `/api/v1/collections`, `/api/v1/admin`

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (client) / npm (server)
- A [Neon](https://neon.tech) PostgreSQL database
- A [Cloudinary](https://cloudinary.com) account
- A [Google Gemini](https://aistudio.google.com) API key

### Server

```bash
cd server
npm install
cp .env.example .env   # fill in your values
npx prisma migrate dev
npm run dev
```

### Client

```bash
cd client
pnpm install
cp .env.example .env.local   # fill in your values
pnpm dev
```

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: `5000`) |
| `NODE_ENV` | `development` or `production` |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing JWTs — generate with `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | Token expiry (default: `7d`) |
| `CORS_ORIGIN` | Comma-separated allowed origins |
| `GEMINI_API_KEY` | Platform Gemini API key for free-tier generations |
| `GEMINI_FREE_LIMIT` | Free generations per user per day (default: `10`) |
| `ENCRYPT_SECRET` | AES-256-GCM key for encrypting user API keys — generate with `openssl rand -hex 32` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) (Docker) |
| Database | [Neon](https://neon.tech) (serverless Postgres) |
| Images | [Cloudinary](https://cloudinary.com) (CDN) |

---

## Status

> Project is currently in active development. Core API architecture and frontend shell are in place. Feature implementation is ongoing.
