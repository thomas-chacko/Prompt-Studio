# PromptStudio — Architecture Document

> **Version:** 1.0.0
> **Stack:** Node.js · Express · PostgreSQL (Neon) · Prisma · Cloudinary
> **Module System:** ESM only (`"type": "module"`)

---

## 1. Project Overview

**PromptStudio** is an AI image and video prompt gallery and generator. Users browse a visually rich library of AI-generated images, copy the exact prompts behind them, and generate their own images directly on the site using either their own Gemini API key or the platform's free quota.

**Live URLs**
- API: `https://prompt-studio-0egh.onrender.com`
- Frontend: `https://promptstudio-web.vercel.app`

### Core Features

| Feature | Description |
|---|---|
| Prompt Gallery | Browse, filter, search, and copy AI prompts |
| AI Image Generation | Generate images via Gemini Imagen (own key or platform key) |
| Prompt Enhance | Expand a short prompt into a rich, detailed generation prompt |
| Collections | Save and organise prompts into personal boards |
| User Accounts | Signup, login, profile management |
| Admin Panel | Content moderation, category management, platform stats |

---

## 2. Technology Stack

| Layer | Technology | Reason |
|---|---|---|
| **Runtime** | Node.js 20+ | LTS, native ESM, async performance |
| **Framework** | Express 4 | Minimal, well-understood, production-proven |
| **Module System** | ESM (`import`/`export`) | Modern standard, tree-shakeable, no `require()` |
| **Database** | Neon (PostgreSQL 15) | Serverless Postgres, auto-scaling, branching for dev/staging |
| **ORM** | Prisma | Type-safe queries, migrations, Neon-compatible |
| **File Storage** | Cloudinary | Image upload, transformation, CDN delivery out of the box |
| **AI API** | Google Gemini (Imagen 3) | Image generation + prompt enhancement |
| **Auth** | JWT (jsonwebtoken) | Stateless, simple, works across services |
| **Password Hashing** | bcrypt (rounds: 12) | Industry standard, adaptive cost |
| **Encryption** | AES-256-GCM | Encrypting user Gemini API keys at rest |
| **Security** | Helmet + CORS + express-rate-limit | Essential production hardening |
| **Deployment** | Render (Docker) | Container-based deploy via Dockerfile, env var management |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│               Next.js (Browser / Mobile)                │
└───────────────────────────┬─────────────────────────────┘
                            │  HTTPS
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   EXPRESS API SERVER                    │
│                                                         │
│   ┌─────────────┐   ┌──────────────┐  ┌─────────────┐  │
│   │ Rate Limiter│ → │Auth Middleware│ →│   Router    │  │
│   └─────────────┘   └──────────────┘  └──────┬──────┘  │
│                                              │          │
│                                    ┌─────────▼────────┐ │
│                                    │   Controllers    │ │
│                                    └─────────┬────────┘ │
│                                              │          │
│                                    ┌─────────▼────────┐ │
│                                    │    Services      │ │
│                                    └──┬──────┬──────┬─┘ │
└─────────────────────────────────────────────────────────┘
                       │       │       │
          ┌────────────┘       │       └─────────────────┐
          ▼                    ▼                         ▼
┌──────────────────┐  ┌───────────────┐       ┌──────────────────┐
│   Neon Postgres  │  │  Gemini API   │       │   Cloudinary     │
│  (via Prisma)    │  │  (Imagen 3)   │       │  (Image Storage) │
└──────────────────┘  └───────────────┘       └──────────────────┘
```

### Layer Responsibilities

| Layer | File Location | Responsibility | Must NOT |
|---|---|---|---|
| **Route** | `src/routes/*.routes.js` | Map HTTP method + path to controller, attach middleware | Contain any logic |
| **Controller** | `src/controllers/*.controller.js` | Parse `req`, call service, send response via `sendSuccess()` | Run DB queries or business logic |
| **Service** | `src/services/*.service.js` | Business logic, validation, DB queries, external API calls | Touch `req` or `res` |
| **Middleware** | `src/middleware/` | Auth, rate limiting, error handling | Have side effects on unrelated concerns |
| **Utils** | `src/utils/` | Pure helper functions | Import Express or Prisma directly |

---

## 4. Request Lifecycle

Every incoming request flows through this exact sequence:

```
Incoming Request
      │
      ▼
1.  helmet()            — Sets secure HTTP headers
      │
      ▼
2.  cors()              — Validates Origin against CORS_ORIGIN env var
      │
      ▼
3.  express.json()      — Parses body, enforces 10kb size limit
      │
      ▼
4.  rateLimiter         — Applied to all /api/* routes
      │
      ▼
5.  Router              — Matches method + path to a controller function
      │
      ▼
6.  auth middleware     — Verifies JWT on protected routes (optional on public routes)
      │                   Attaches req.user = { id, email, role }
      ▼
7.  adminOnly           — Checks req.user.role on admin routes (applied per-route)
      │
      ▼
8.  asyncHandler        — Wraps the controller, catches async errors automatically
      │
      ▼
9.  Controller          — Extracts params/body/query from req, calls service(s)
      │
      ▼
10. Service             — Business logic, Prisma queries, Cloudinary/Gemini calls
      │
      ▼
11. sendSuccess()       — Standardises the JSON response shape
      │
      ▼
Response Sent


      (if any step throws)
            │
            ▼
12. errorHandler        — Last middleware in app.js, formats all errors consistently
```

---

## 5. Project Structure

```
promptstudio-server/
├── .env                          # Local secrets — never commit
├── .env.example                  # Committed template with placeholder values
├── .gitignore
├── Dockerfile                    # Docker image for Render deployment
├── package.json                  # "type": "module" — ESM only
├── prisma/
│   ├── schema.prisma             # Single source of truth for DB schema
│   └── migrations/               # Auto-generated migration files
└── src/
    ├── index.js                  # Entry point — boots HTTP server, imports dotenv/config
    ├── app.js                    # Express factory — wires all middleware and routes
    │
    ├── config/
    │   └── env.js                # Reads process.env once. All other files import from here.
    │
    ├── routes/
    │   ├── index.js              # Root router — mounts all sub-routers under /api/v1
    │   ├── auth.routes.js
    │   ├── user.routes.js
    │   ├── prompt.routes.js
    │   ├── category.routes.js
    │   ├── search.routes.js
    │   ├── generate.routes.js
    │   ├── collection.routes.js
    │   └── admin.routes.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── prompt.controller.js
    │   ├── category.controller.js
    │   ├── search.controller.js
    │   ├── generate.controller.js
    │   ├── collection.controller.js
    │   └── admin.controller.js
    │
    ├── services/
    │   ├── auth.service.js       # Signup, login, token generation
    │   ├── user.service.js       # Profile CRUD, account deletion
    │   ├── prompt.service.js     # Prompt CRUD, trending logic, like toggle
    │   ├── category.service.js   # Category CRUD, prompt counts
    │   ├── search.service.js     # Full-text search across prompts + categories
    │   ├── generate.service.js   # Gemini API calls, quota enforcement, key decryption
    │   ├── collection.service.js # Collection CRUD, add/remove items
    │   └── admin.service.js      # Platform stats, force-delete, role management
    │
    ├── middleware/
    │   ├── auth.js               # Verifies JWT, attaches req.user
    │   ├── adminOnly.js          # Checks role — 403 if not admin
    │   ├── rateLimiter.js        # express-rate-limit config
    │   ├── notFound.js           # 404 catch-all — must be second-to-last in app.js
    │   └── errorHandler.js       # Global error formatter — must be LAST in app.js
    │
    └── utils/
        ├── asyncHandler.js       # Wraps async controllers — auto-calls next(err) on throw
        ├── createError.js        # createError(statusCode, message) factory
        ├── apiResponse.js        # sendSuccess(res, data) and sendPaginated(res, data, meta)
        ├── encrypt.js            # AES-256-GCM encrypt/decrypt for Gemini API keys
        └── cloudinary.js         # Cloudinary SDK config + upload/delete helpers
```

---

## 6. Database Schema

Database: **Neon PostgreSQL** via **Prisma ORM**
All timestamps are `timestamptz` (timezone-aware). All primary keys on user-facing tables use `uuid` to prevent enumeration.

### Schema Overview

```
users
  │
  ├──< prompts (author_id)
  │       └──< collection_items (prompt_id)
  │       └──< prompt_likes (prompt_id)
  │
  ├──< collections (user_id)
  │       └──< collection_items (collection_id)
  │
  ├──< generations (user_id)
  │
  ├──  user_api_keys (user_id) — one-to-one
  │
  └──  generation_quota (user_id) — one-to-one

categories
  └──< prompts (category_id)
```

---

### Table Definitions

#### `users`
Central entity. Handles both regular users and admins via the `role` column — no separate admin table needed.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `username` | `varchar(32)` | UNIQUE, NOT NULL | Alphanumeric + underscores |
| `email` | `varchar(255)` | UNIQUE, NOT NULL | Stored lowercase |
| `password_hash` | `varchar(255)` | NOT NULL | bcrypt, 12 rounds |
| `role` | `enum` | NOT NULL, default `user` | `user` · `admin` |
| `avatar_url` | `text` | NULLABLE | Cloudinary URL |
| `bio` | `text` | NULLABLE | |
| `plan` | `enum` | NOT NULL, default `free` | `free` · `pro` |
| `is_verified` | `boolean` | default `false` | Email verification flag |
| `created_at` | `timestamptz` | default `now()` | |
| `updated_at` | `timestamptz` | auto-updated | |

> **Role values:** `user` (default on signup) → `admin` (manages content, categories, users). Admin role is assigned via direct DB update — no public API endpoint can elevate a user to admin.

---

#### `prompts`
Core content table.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `serial` | PK | |
| `author_id` | `uuid` | FK → users.id, INDEX | Cascade delete |
| `category_id` | `integer` | FK → categories.id, INDEX | |
| `title` | `varchar(128)` | NOT NULL | |
| `prompt` | `text` | NOT NULL | The actual AI prompt text |
| `image` | `text` | NOT NULL | Cloudinary URL |
| `model_used` | `varchar(64)` | NULLABLE | e.g. `imagen-3.0-generate-002` |
| `tags` | `text[]` | default `{}` | Array of tag strings |
| `total_copied_count` | `integer` | default `0` | Denormalised counter |
| `total_likes` | `integer` | default `0` | Denormalised counter |
| `is_published` | `boolean` | default `true`, INDEX | `false` = draft / hidden by admin |
| `created_at` | `timestamptz` | default `now()` | |
| `updated_at` | `timestamptz` | auto-updated | |

---

#### `categories`
Aesthetic categories used to filter the prompt gallery.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `serial` | PK | |
| `category` | `varchar(64)` | UNIQUE, NOT NULL | Display name |
| `slug` | `varchar(64)` | UNIQUE, NOT NULL | URL-safe, e.g. `cyberpunk` |
| `image_url` | `text` | NULLABLE | Cloudinary URL |
| `total_prompts_count` | `integer` | default `0` | Denormalised, updated on prompt create/delete |
| `created_at` | `timestamptz` | default `now()` | |

---

#### `generations`
Records every image generation request for history and admin monitoring.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | FK → users.id, INDEX | Cascade delete |
| `prompt_used` | `text` | NOT NULL | |
| `aspect_ratio` | `varchar(8)` | default `1:1` | |
| `style` | `varchar(32)` | NULLABLE | |
| `model` | `varchar(64)` | NOT NULL | |
| `api_key_source` | `enum` | NOT NULL | `own` · `free` |
| `image_urls` | `text[]` | NOT NULL | Array of Cloudinary URLs |
| `saved_as_prompt_id` | `integer` | FK → prompts.id, NULLABLE | Set when published to gallery |
| `created_at` | `timestamptz` | default `now()` | |

---

#### `user_api_keys`
Stores each user's personal Gemini API key, encrypted at rest.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | FK → users.id, UNIQUE | One key per user |
| `encrypted_key` | `text` | NOT NULL | AES-256-GCM encrypted |
| `key_preview` | `varchar(16)` | NOT NULL | e.g. `AIza...Xk9z` — safe to show in UI |
| `is_valid` | `boolean` | default `true` | Set false if a generation call fails with auth error |
| `added_at` | `timestamptz` | default `now()` | |
| `last_used_at` | `timestamptz` | NULLABLE | Updated on every generation with own key |

---

#### `generation_quota`
Tracks the free generation usage per user. One row per user, reset daily.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | FK → users.id, UNIQUE | |
| `free_used` | `integer` | default `0` | Incremented on each free generation |
| `free_limit` | `integer` | default from env `GEMINI_FREE_LIMIT` | Configurable per-environment |
| `period_start` | `date` | NOT NULL | Date the current period started |
| `resets_at` | `timestamptz` | NOT NULL | Midnight UTC of next day |

> **Quota reset logic:** The service checks `resets_at` on every generation request. If `now() >= resets_at`, it resets `free_used = 0` and sets `resets_at` to the next midnight — no cron job required.

---

#### `collections`
User-created boards for saving and organising prompts.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `serial` | PK | |
| `user_id` | `uuid` | FK → users.id, INDEX | |
| `name` | `varchar(64)` | NOT NULL | |
| `is_public` | `boolean` | default `false` | |
| `cover_image` | `text` | NULLABLE | First prompt's image, updated automatically |
| `created_at` | `timestamptz` | default `now()` | |

---

#### `collection_items`
Junction table between collections and prompts.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `serial` | PK | |
| `collection_id` | `integer` | FK → collections.id | Cascade delete |
| `prompt_id` | `integer` | FK → prompts.id | |
| `added_at` | `timestamptz` | default `now()` | |

> **Unique constraint:** `(collection_id, prompt_id)` — prevents duplicate saves. The service returns `409 Conflict` if the pair already exists.

---

#### `prompt_likes`
Tracks which users liked which prompts (for like toggle).

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `serial` | PK | |
| `user_id` | `uuid` | FK → users.id | |
| `prompt_id` | `integer` | FK → prompts.id | |
| `created_at` | `timestamptz` | default `now()` | |

> **Unique constraint:** `(user_id, prompt_id)` — one like per user per prompt.

---

## 7. API Architecture

### Base URL

```
https://prompt-studio-0egh.onrender.com/api/v1
```

### Response Format

Every response — success or error — follows one of these shapes:

```jsonc
// Single resource
{ "success": true, "data": { ... } }

// Paginated list
{
  "success": true,
  "data": [ ... ],
  "meta": { "page": 1, "limit": 10, "total": 240, "totalPages": 24 }
}

// Error
{ "success": false, "message": "Prompt with id \"99\" not found" }
```

### All Endpoints

| Method | Endpoint | Auth | Status |
|---|---|---|---|
| POST | `/api/v1/auth/signup` | — | 201 |
| POST | `/api/v1/auth/login` | — | 200 |
| POST | `/api/v1/auth/logout` | Auth | 200 |
| GET | `/api/v1/user/me` | Auth | 200 |
| PUT | `/api/v1/user/me` | Auth | 200 |
| PUT | `/api/v1/user/me/password` | Auth | 200 |
| DELETE | `/api/v1/user/me` | Auth | 200 |
| GET | `/api/v1/user/me/prompts` | Auth | 200 |
| GET | `/api/v1/prompts/trending` | — | 200 |
| GET | `/api/v1/prompts` | — | 200 |
| GET | `/api/v1/prompts/:id` | — | 200 |
| POST | `/api/v1/prompts` | Auth | 201 |
| PUT | `/api/v1/prompts/:id` | Auth | 200 |
| DELETE | `/api/v1/prompts/:id` | Auth | 200 |
| POST | `/api/v1/prompts/:id/copy` | — | 200 |
| POST | `/api/v1/prompts/:id/like` | Auth | 200 |
| GET | `/api/v1/categories` | — | 200 |
| GET | `/api/v1/categories/:slug` | — | 200 |
| POST | `/api/v1/categories` | Admin | 201 |
| PUT | `/api/v1/categories/:id` | Admin | 200 |
| DELETE | `/api/v1/categories/:id` | Admin | 200 |
| POST | `/api/v1/search` | — | 200 |
| POST | `/api/v1/generate/image` | Auth | 200 |
| POST | `/api/v1/generate/enhance-prompt` | Auth | 200 |
| GET | `/api/v1/generate/history` | Auth | 200 |
| DELETE | `/api/v1/generate/history/:id` | Auth | 200 |
| POST | `/api/v1/generate/save-to-gallery` | Auth | 201 |
| GET | `/api/v1/generate/quota` | Auth | 200 |
| GET | `/api/v1/collections` | Auth | 200 |
| POST | `/api/v1/collections` | Auth | 201 |
| POST | `/api/v1/collections/:id/prompts` | Auth | 200 |
| DELETE | `/api/v1/collections/:id/prompts/:pid` | Auth | 200 |
| DELETE | `/api/v1/collections/:id` | Auth | 200 |
| POST | `/api/v1/user/api-key` | Auth | 200 |
| GET | `/api/v1/user/api-key` | Auth | 200 |
| DELETE | `/api/v1/user/api-key` | Auth | 200 |
| GET | `/api/v1/admin/stats` | Admin | 200 |
| GET | `/api/v1/admin/users` | Admin | 200 |
| PUT | `/api/v1/admin/users/:id/role` | Admin | 200 |
| DELETE | `/api/v1/admin/users/:id` | Admin | 200 |
| GET | `/api/v1/admin/prompts` | Admin | 200 |
| PUT | `/api/v1/admin/prompts/:id` | Admin | 200 |
| DELETE | `/api/v1/admin/prompts/:id` | Admin | 200 |
| GET | `/api/v1/admin/categories` | Admin | 200 |
| PUT | `/api/v1/admin/categories/:id` | Admin | 200 |
| DELETE | `/api/v1/admin/categories/:id` | Admin | 200 |
| GET | `/api/v1/admin/generations` | Admin | 200 |

---

## 8. Authentication & Authorization

### JWT Flow

```
Signup / Login
      │
      ▼
Service hashes password (bcrypt, 12 rounds)
      │
      ▼
JWT signed with JWT_SECRET
Payload: { id, email, role }
Expiry:  JWT_EXPIRES_IN (default: 7d)
      │
      ▼
Token returned to client
Client stores in httpOnly cookie or localStorage
Client sends: Authorization: Bearer <token>
      │
      ▼
auth middleware verifies signature + expiry
Attaches req.user = { id, email, role }
```

### Role Hierarchy

```
admin
    │    Can manage prompts, categories, users, view all generations.
    │    Role assigned via direct DB update — no API endpoint can promote to admin.
    ▼
user
         Standard account. Manages own content only.
```

### Middleware Chain for Protected Routes

```javascript
// Public route — no auth
router.get('/prompts', getAll)

// Auth required
router.post('/prompts', auth, asyncHandler(createPrompt))

// Admin required
router.delete('/admin/prompts/:id', auth, adminOnly, asyncHandler(forceDeletePrompt))
```

### Logout Strategy

On logout, the token's `jti` (JWT ID) is stored in a `token_blocklist` table in Neon with a TTL matching the token's remaining lifetime. The `auth` middleware checks this blocklist on every request. A cleanup query (`where: { expires_at: { lt: new Date() } }`) removes expired entries.

---

## 9. Image Generation Flow

### Flow: User with Own API Key

```
POST /api/v1/generate/image { use_own_key: true, prompt, ... }
      │
      ▼
auth middleware — verify JWT
      │
      ▼
generate.service.js
  ├── Fetch user_api_keys row for req.user.id
  ├── Decrypt encrypted_key using AES-256-GCM + ENCRYPT_SECRET
  ├── Check generation_quota — if use_own_key: true, skip quota check
  ├── Call Gemini Imagen API with decrypted key
  ├── On Gemini success:
  │     ├── Upload returned image buffer(s) to Cloudinary
  │     ├── Insert row into generations table
  │     └── Return { generation_id, images: [{ url, width, height }] }
  └── On Gemini auth error:
        └── Set user_api_keys.is_valid = false, throw 422
```

### Flow: Platform Free Key

```
POST /api/v1/generate/image { use_own_key: false, prompt, ... }
      │
      ▼
generate.service.js
  ├── Fetch generation_quota for req.user.id
  ├── If now() >= resets_at → reset free_used = 0, update resets_at
  ├── If free_used >= free_limit → throw 429 "Quota exhausted"
  ├── Call Gemini Imagen API with platform GEMINI_API_KEY
  ├── On success:
  │     ├── Increment generation_quota.free_used by 1
  │     ├── Upload image(s) to Cloudinary
  │     ├── Insert row into generations table
  │     └── Return response with free_generations_remaining
  └── On failure → throw 500
```

### Prompt Enhancement Flow

```
POST /api/v1/generate/enhance-prompt { raw_prompt, style_hint }
      │
      ▼
generate.service.js
  ├── Build system prompt instructing Gemini Flash to expand the raw prompt
  ├── Call Gemini Flash (text model — fast, cheap, not Imagen)
  ├── Return { enhanced_prompt, original_prompt }
  └── Client uses enhanced_prompt as input to POST /api/v1/generate/image
```

---

## 10. File Storage — Cloudinary

All images in PromptStudio are stored on and served from **Cloudinary**.

### What Gets Uploaded to Cloudinary

| Source | When | Cloudinary Folder |
|---|---|---|
| Prompt preview image | User creates/uploads a prompt | `promptstudio/prompts/` |
| Generated image | Gemini returns image buffer | `promptstudio/generations/` |
| User avatar | User updates profile picture | `promptstudio/avatars/` |

### Upload Helper (`src/utils/cloudinary.js`)

```javascript
import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config/env.js'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key:    CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export const uploadImage = async (source, folder) => {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
  return result.secure_url  // always HTTPS
}

export const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId)
}
```

### Cloudinary Naming Convention

```
promptstudio/prompts/{userId}_{timestamp}
promptstudio/generations/{generationId}_{index}
promptstudio/avatars/{userId}
```

### Image Deletion Policy

When a prompt is deleted, the associated Cloudinary image is also deleted by calling `deleteImage(publicId)` inside the service. The `public_id` is extracted from the stored URL before deletion.

```javascript
const getPublicId = (url) => {
  // e.g. https://res.cloudinary.com/demo/image/upload/v123/promptstudio/prompts/abc.jpg
  // → promptstudio/prompts/abc
  const parts = url.split('/')
  const filename = parts[parts.length - 1].split('.')[0]
  const folder = parts[parts.length - 2]
  return `${folder}/${filename}`
}
```

---

## 11. Environment Variables

All `process.env` access is centralised in `src/config/env.js`. No other file reads `process.env` directly.

```javascript
// src/config/env.js
export const PORT                  = process.env.PORT || 5000
export const NODE_ENV              = process.env.NODE_ENV || 'development'
export const DATABASE_URL          = process.env.DATABASE_URL
export const JWT_SECRET            = process.env.JWT_SECRET
export const JWT_EXPIRES_IN        = process.env.JWT_EXPIRES_IN || '7d'
export const CORS_ORIGIN           = process.env.CORS_ORIGIN
export const GEMINI_API_KEY        = process.env.GEMINI_API_KEY
export const GEMINI_FREE_LIMIT     = Number(process.env.GEMINI_FREE_LIMIT) || 10
export const ENCRYPT_SECRET        = process.env.ENCRYPT_SECRET
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY    = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
```

### `.env.example`

```bash
# Server
PORT=5000
NODE_ENV=development

# Database — Neon PostgreSQL
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/promptstudio?sslmode=require"

# Auth
JWT_SECRET="replace-with-openssl-rand-hex-32-output"
JWT_EXPIRES_IN="7d"

# CORS — comma-separated for multiple origins
CORS_ORIGIN="https://promptstudio-web.vercel.app,http://localhost:3000"

# Gemini AI
GEMINI_API_KEY="AIza..."
GEMINI_FREE_LIMIT=10

# Encryption — for storing user Gemini API keys
ENCRYPT_SECRET="replace-with-openssl-rand-hex-32-output"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---
## 12. Error Handling Strategy

### Rules

1. No `try/catch` in controllers — wrap with `asyncHandler`. It catches any thrown error and passes it to `next(err)` automatically.
2. No `new Error()` — always use `createError(statusCode, message)` for operational errors.
3. No `res.json()` directly — always use `sendSuccess()` or `sendPaginated()`.
4. No stack traces in production — `errorHandler` only includes `stack` when `NODE_ENV === 'development'`.

### Error Codes

| Code | When |
|---|---|
| `400` | Missing/invalid request body or params |
| `401` | Missing, expired, or blocklisted JWT |
| `403` | Authenticated but not authorised (not owner, not admin) |
| `404` | Resource not found |
| `409` | Conflict — duplicate email, prompt already in collection |
| `422` | Gemini API key rejected by Google |
| `429` | Free generation quota exhausted |
| `500` | Unhandled exception — DB failure, Gemini outage |

### Example Service Error

```javascript
// src/services/prompt.service.js
import { createError } from '../utils/createError.js'

export const findById = async (id) => {
  const prompt = await prisma.prompt.findUnique({ where: { id } })
  if (!prompt) throw createError(404, `Prompt with id "${id}" not found`)
  return prompt
}
```

### Example Controller

```javascript
// src/controllers/prompt.controller.js
import asyncHandler from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/apiResponse.js'
import * as promptService from '../services/prompt.service.js'

export const getById = asyncHandler(async (req, res) => {
  const prompt = await promptService.findById(Number(req.params.id))
  sendSuccess(res, prompt)
})
```

---

## 13. Security Checklist

| Concern | Implementation |
|---|---|
| **Secure headers** | `helmet()` applied globally in `app.js` |
| **CORS** | Configured via `CORS_ORIGIN` env var — never hardcoded |
| **Body size** | `express.json({ limit: '10kb' })` — prevents payload attacks |
| **Rate limiting** | `express-rate-limit` on all `/api/*` routes |
| **Password storage** | bcrypt with cost factor 12 — never stored in plain text |
| **JWT secrets** | Long random string via `openssl rand -hex 32` |
| **Token invalidation** | Logout blocklist via `token_blocklist` DB table |
| **API key encryption** | User Gemini keys encrypted with AES-256-GCM at rest |
| **API key exposure** | Full key never returned from any endpoint — preview only |
| **SQL injection** | Prisma parameterises all queries — no raw SQL strings |
| **Stack traces** | Only exposed in `NODE_ENV=development` |
| **Env secrets** | `.env` in `.gitignore` — only `.env.example` committed |
| **Admin escalation** | `role = admin` cannot be set via any API endpoint |

---

## 14. Scalability Considerations

PromptStudio is designed to scale horizontally without any architectural changes.

### Stateless API Server

The Express server holds no in-memory state. Every request reads from Neon and writes to Neon. This means you can run multiple instances behind a load balancer without any session-sharing problem.

> **Exception:** The logout token blocklist. A simple `token_blocklist` table in Neon handles this at current scale. If sub-millisecond blocklist checks are needed at very high traffic, that's the one place to add Redis later.

### Neon PostgreSQL

Neon is serverless Postgres — it auto-scales compute based on load and scales storage independently.

- **Branching:** Create a database branch per PR for isolated staging environments
- **Connection pooling:** Use Neon's built-in PgBouncer endpoint for high-concurrency workloads
- **Read replicas:** Route heavy read traffic (prompt feeds, search) to a read replica without changing application code

### Cloudinary

Cloudinary handles CDN delivery automatically. Uploaded images are served from the nearest edge — no infrastructure work required to go global.

### Gemini Quota Management

`generation_quota` resets are self-healing — no cron job. The service checks and resets on the first request after midnight, meaning zero infrastructure overhead for quota management.

### Trending Prompts

The `/prompts/trending` endpoint runs a weighted sort query on every call. At low-to-medium scale this is fine with proper indexes on `total_copied_count` and `total_likes`. When this becomes a bottleneck, a materialized view refreshing every 10 minutes is a one-line Prisma migration.

### Future Scaling Path

```
Current (MVP)                        Future (Scale)
─────────────────────────────────    ────────────────────────────────────
Single Express instance (Render) →   Multiple instances + load balancer
Neon serverless (auto-scale)     →   Neon + read replicas for feed queries
Cloudinary CDN (built-in)        →   Already global — no change needed
token_blocklist in Neon          →   Redis for sub-ms token lookup
Trending query on every request  →   Materialized view, refresh every 10m
Gemini direct call               →   Queue + worker for bulk generations
```

---

*Last updated: 2025 — PromptStudio v1.0.0*
