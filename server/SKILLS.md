---
name: promptstudio-server
description: >
  Backend coding rules and architecture for the PromptStudio server — a Node.js + Express REST API
  that powers an AI image and video prompt gallery. Trigger this skill whenever writing, editing, or
  reviewing any server-side code: routes, controllers, services, middleware, utils, config, or tests.
  Also use when adding new resources, wiring environment variables, or handling errors. Do not skip
  for "small" changes — every backend code touch must follow these rules.
last_updated: 2025-03-21
---

# PromptStudio Server — Coding Rules & Architecture

## What Is PromptStudio?

PromptStudio is an AI image and video prompt gallery and generator. Users browse a visually rich
library of AI-generated images, copy the exact prompts behind them, and generate their own images
directly on the site using their own Gemini API key or the platform's free quota.

This server is the Node.js + Express REST API that serves all data to the Next.js frontend.

**Stack:** Node.js 20+ · Express 4 · PostgreSQL (Neon) · Prisma · Cloudinary · Gemini API  
**Module system:** ESM only (`"type": "module"` in `package.json`)

---

## 1. Module System

ESM only. No CommonJS anywhere in this project.

- Use `import` / `export` — never `require()` or `module.exports`
- Always include the `.js` extension on local imports
- Named exports for services, controllers, and utils
- Default exports for middleware, the Express app, and router instances
- Load `dotenv` exactly once via `import "dotenv/config"` at the top of `src/index.js` only

---

## 2. Architecture — 3-Layer Pattern

Every feature follows this flow without exception:

```
Request → Route → Controller → Service → DB / External API
                                    ↓
                              Controller → Response
```

| Layer | File Location | Owns | Must NOT |
|---|---|---|---|
| Route | `src/routes/*.routes.js` | HTTP method, path, middleware wiring | Contain any logic |
| Controller | `src/controllers/*.controller.js` | Parse `req`, call service, send response | Run DB queries or business logic |
| Service | `src/services/*.service.js` | Business logic, validation, data access | Touch `req` or `res` |
| Middleware | `src/middleware/` | Auth, rate limiting, error handling | Have side effects on unrelated concerns |
| Utils | `src/utils/` | Pure helper functions | Import Express or Prisma directly |

---

## 3. Project Structure

```
server/src/
├── index.js                    # Entry point — boots server, loads dotenv once
├── app.js                      # Express factory — wires all middleware and routes
├── config/
│   └── env.js                  # Single source of truth for ALL env vars
├── routes/
│   ├── index.js                # Root router — mounts all sub-routers under /api/v1
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── prompt.routes.js
│   ├── category.routes.js
│   ├── search.routes.js
│   ├── generate.routes.js
│   ├── collection.routes.js
│   └── admin.routes.js
├── controllers/                # HTTP layer only — no logic, no DB
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── prompt.controller.js
│   ├── category.controller.js
│   ├── search.controller.js
│   ├── generate.controller.js
│   ├── collection.controller.js
│   └── admin.controller.js
├── services/                   # All business logic and data access lives here
│   ├── auth.service.js
│   ├── user.service.js
│   ├── prompt.service.js
│   ├── category.service.js
│   ├── search.service.js
│   ├── generate.service.js     # Gemini API calls, quota checks, key decryption
│   ├── collection.service.js
│   └── admin.service.js
├── middleware/
│   ├── auth.js                 # Verifies JWT, attaches req.user = { id, email, role }
│   ├── adminOnly.js            # Guards admin routes — 403 if role is insufficient
│   ├── rateLimiter.js          # Applied to all /api/* routes
│   ├── notFound.js             # 404 catch-all — must be SECOND-TO-LAST in app.js
│   └── errorHandler.js         # Global error formatter — must be LAST in app.js
└── utils/
    ├── asyncHandler.js         # Wraps async controllers — auto-forwards errors to next()
    ├── createError.js          # createError(statusCode, message) factory
    ├── apiResponse.js          # sendSuccess() and sendPaginated() helpers
    ├── encrypt.js              # AES-256-GCM encrypt/decrypt for stored Gemini API keys
    └── cloudinary.js           # Cloudinary SDK config + uploadImage() / deleteImage()
```

---

## 4. API Response Format

Always use `sendSuccess` or `sendPaginated` from `utils/apiResponse.js`. Never call `res.json()` directly.

```
Single resource:   { "success": true, "data": { ... } }

Paginated list:    { "success": true, "data": [...], "meta": { "page": 1, "limit": 10, "total": 240, "totalPages": 24 } }

Error:             { "success": false, "message": "Prompt with id \"xyz\" not found" }
```

---

## 5. Error Handling

**Three rules that apply everywhere:**

1. No `try/catch` in controllers — wrap with `asyncHandler` instead. It catches any thrown error and calls `next(err)` automatically.
2. No `new Error()` — always use `createError(statusCode, message)` so the error carries the correct HTTP status.
3. No manual error responses in controllers — throw the error, let `errorHandler` format and send it.

Operational errors (400, 401, 403, 404, 409, 422, 429) use `createError` with the correct status. Unexpected errors bubble up as 500 automatically.

---

## 6. Environment Variables

All `process.env` access is centralised in `src/config/env.js`. No other file reads `process.env` directly. Import from `env.js` everywhere else.

Every new env var must be:
- Exported from `src/config/env.js`
- Added to `.env.example` with a placeholder value

Never commit `.env`. Only `.env.example` goes to version control.

**Variables in use:**

| Variable | Required | Notes |
|---|---|---|
| `PORT` | No | Defaults to 5000 |
| `NODE_ENV` | Yes | Controls stack trace exposure and logging |
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string with `?sslmode=require` |
| `JWT_SECRET` | Yes | Min 32 chars — generate with `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | No | Defaults to `7d` |
| `CORS_ORIGIN` | Yes | Comma-separated list of allowed origins |
| `GEMINI_API_KEY` | Yes | Platform-wide key for free-tier generation |
| `GEMINI_FREE_LIMIT` | No | Free generations per user per day — defaults to 10 |
| `ENCRYPT_SECRET` | Yes | AES-256 key for encrypting user Gemini API keys at rest |
| `CLOUDINARY_CLOUD_NAME` | Yes | |
| `CLOUDINARY_API_KEY` | Yes | |
| `CLOUDINARY_API_SECRET` | Yes | |
| `CDN_BASE_URL` | Yes | Prepended to all image URLs returned by the API |
| `SMTP_HOST` | Yes | For password reset emails |
| `SMTP_USER` | Yes | |
| `SMTP_PASS` | Yes | |
| `EMAIL_FROM` | Yes | |

---

## 7. Route Conventions

| Action | Method | Path | Response Status |
|---|---|---|---|
| List all | `GET` | `/api/v1/prompts` | 200 |
| Get one | `GET` | `/api/v1/prompts/:id` | 200 |
| Create | `POST` | `/api/v1/prompts` | 201 |
| Update | `PUT` | `/api/v1/prompts/:id` | 200 |
| Delete | `DELETE` | `/api/v1/prompts/:id` | 200 |

- All routes are versioned under `/api/v1/`
- Filtering, sorting, and pagination via query params: `?category=cyberpunk&sort=popular&page=1&limit=20`
- All filtering logic belongs in the service layer — never in routes or controllers
- Protected routes attach `auth` middleware before the controller
- Admin routes attach `auth` then `adminOnly` before the controller

---

## 8. Authentication & Roles

The `auth` middleware verifies the JWT and attaches `req.user = { id, email, role }` to the request. Controllers and services read from `req.user` — they never decode the token themselves.

The `adminOnly` middleware checks `req.user.role`. It accepts an optional level argument:
- `adminOnly()` — allows `admin` and `super_admin`
- `adminOnly('super_admin')` — allows `super_admin` only

**Role hierarchy:**

| Role | Can Do |
|---|---|
| `user` | Manage own content only |
| `admin` | Manage all prompts, categories, view all generations |
| `super_admin` | Everything — including changing user roles |

The first `super_admin` is seeded via a direct DB insert or CLI script. No public API endpoint can set `role = super_admin`.

---

## 9. Database — Neon + Prisma

Database: **Neon (PostgreSQL 15)** via **Prisma ORM**

- `prisma/schema.prisma` is the single source of truth for the DB schema
- All queries go through Prisma — no raw SQL strings
- Prisma parameterises all queries — no SQL injection risk
- The Neon connection string must include `?sslmode=require`
- Run `npx prisma migrate dev` for local migrations
- Run `npx prisma migrate deploy` in CI/CD for production

**Tables:** `users` · `prompts` · `categories` · `generations` · `user_api_keys` · `generation_quota` · `collections` · `collection_items` · `prompt_likes` · `password_resets`

Users and admins share the single `users` table. Role is a column (`user` / `admin` / `super_admin`), not a separate table.

---

## 10. File Storage — Cloudinary

All images are uploaded to and served from Cloudinary. The Cloudinary SDK is configured once in `src/utils/cloudinary.js` and exported as `uploadImage(source, folder)` and `deleteImage(publicId)`.

**Folder structure:**

| Image Type | Cloudinary Folder |
|---|---|
| Prompt preview images | `promptstudio/prompts/` |
| AI-generated images | `promptstudio/generations/` |
| User avatars | `promptstudio/avatars/` |

When a prompt or generation is deleted, the associated Cloudinary image is deleted in the same service call. The `public_id` is extracted from the stored URL before calling `deleteImage()`.

Images are always uploaded with `quality: 'auto'` and `fetch_format: 'auto'` for optimal CDN delivery.

---

## 11. Image Generation — Gemini

All Gemini API calls live in `generate.service.js`. The controller never touches the Gemini SDK.

**Two generation modes:**

- **Own key** (`use_own_key: true`): The service decrypts the user's stored key from `user_api_keys` using `encrypt.js`, calls Gemini with it, and skips quota deduction. If Gemini rejects the key, `user_api_keys.is_valid` is set to `false` and a `422` is thrown.

- **Platform key** (`use_own_key: false`): The service checks `generation_quota` for the user. If `now() >= resets_at`, it resets `free_used = 0` and advances `resets_at` to the next midnight — no cron job required. If `free_used >= free_limit`, it throws a `429`. On success, `free_used` is incremented by 1.

After a successful Gemini call, the returned image buffer(s) are uploaded to Cloudinary and the URLs are stored in the `generations` table.

---

## 12. Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Files | `kebab-case` | `prompt.service.js` |
| Functions | `camelCase` | `findById`, `createPrompt` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_LIMIT`, `GEMINI_FREE_LIMIT` |
| Error messages | Sentence case, include the offending value | `Prompt with id "xyz" not found` |
| Cloudinary public IDs | `folder/userId_timestamp` | `promptstudio/prompts/abc123_1711234567` |

---

## 13. Security Rules

| Concern | Rule |
|---|---|
| HTTP headers | `helmet()` is always applied in `app.js` — never remove it |
| CORS | Configured via `CORS_ORIGIN` env var — never hardcode origins |
| Body size | `express.json({ limit: '10kb' })` — never increase without a documented reason |
| Rate limiting | `rateLimiter` middleware on all `/api/*` routes — never bypass |
| Passwords | bcrypt with cost factor 12 — never stored in plain text |
| JWT secrets | Minimum 32 chars — generate with `openssl rand -hex 32` |
| User API keys | AES-256-GCM encrypted at rest — full key never returned from any endpoint |
| Reset tokens | SHA-256 hashed before storage — raw token exists only in the email |
| Request logging | Never log `req.body` in production — may contain passwords or tokens |
| Stack traces | Only exposed when `NODE_ENV=development` — enforced by `errorHandler` |
| Admin escalation | No API endpoint can set `role = super_admin` |

---

## 14. Adding a New Resource

Follow this checklist when adding any new resource (e.g. `reviews`, `tags`):

- [ ] `src/services/<resource>.service.js` — all data access and business logic
- [ ] `src/controllers/<resource>.controller.js` — `asyncHandler` + `sendSuccess` only, no logic
- [ ] `src/routes/<resource>.routes.js` — Express Router, mounted with correct middleware
- [ ] Mount the router in `src/routes/index.js`
- [ ] Add any new env vars to `src/config/env.js` and `.env.example`
- [ ] Add the new Prisma model to `prisma/schema.prisma` and run a migration
- [ ] No DB calls in controllers — ever

---

## 15. Hard Rules — Never Break These

1. No business logic or DB queries in controllers
2. No `try/catch` in controllers — use `asyncHandler`
3. No `res.json()` directly — use `sendSuccess` or `sendPaginated`
4. No `new Error()` — use `createError(statusCode, message)`
5. No `process.env` access outside `src/config/env.js`
6. No `.env` committed to version control
7. No removal of `helmet()` or `cors()` from `app.js`
8. No body size limit increases without a documented reason
9. No logging of sensitive request data in production
10. No stack traces outside `NODE_ENV=development`
11. No `require()` or `module.exports` — ESM only
12. No local imports without the `.js` extension
13. No raw SQL strings — Prisma only
14. No Gemini or Cloudinary SDK calls outside their respective service/util files