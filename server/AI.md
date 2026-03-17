# PromptStudio — Server AI Development Rules & Coding Standards

> This file defines the mandatory rules, patterns, and conventions for all backend development on this project.
> Every AI assistant and developer working on this codebase MUST follow these rules without exception.

---

## 🧭 What Is This Service?

The **PromptStudio API** is a Node.js + Express REST API that powers the PromptStudio prompt marketplace.
It serves prompts, categories, and supporting data to the Next.js client.

---

## 📁 Project Structure

```
server/
├── src/
│   ├── index.js              # Entry point — boots the HTTP server
│   ├── app.js                # Express app factory — middleware + routes wired here
│   ├── config/
│   │   └── env.js            # Single source of truth for all env vars
│   ├── routes/
│   │   ├── index.js          # Root router — mounts all resource routers
│   │   ├── prompt.routes.js  # /api/prompts
│   │   └── category.routes.js# /api/categories
│   ├── controllers/          # HTTP layer — parse req, call service, send response
│   │   ├── prompt.controller.js
│   │   └── category.controller.js
│   ├── services/             # Business logic layer — all data access lives here
│   │   ├── prompt.service.js
│   │   └── category.service.js
│   ├── middleware/
│   │   ├── errorHandler.js   # Global error handler (must be last in app.js)
│   │   ├── notFound.js       # 404 catch-all (must be second-to-last)
│   │   └── rateLimiter.js    # express-rate-limit applied to /api/*
│   └── utils/
│       ├── asyncHandler.js   # Wraps async controllers — eliminates try/catch
│       ├── createError.js    # Factory for operational HTTP errors
│       └── apiResponse.js    # Standardised JSON response helpers
├── .env.example              # Template — copy to .env and fill in values
├── .gitignore
├── package.json
└── AI.md                     # This file
```

---

## 📦 Module System

This project uses **ES Modules (ESM)** — `"type": "module"` is set in `package.json`.

- Always use `import` / `export` — never `require()` or `module.exports`
- Always include the `.js` file extension in local imports (Node ESM requires it)
- Use named exports for services, controllers, and utils; default exports for middleware, app, and router instances

```js
// ✅ CORRECT
import { findAll, findById } from "../services/prompt.service.js";
import asyncHandler from "../utils/asyncHandler.js";

// ❌ WRONG — CommonJS
const { findAll } = require("../services/prompt.service");
module.exports = { getAll };
```

- `dotenv` is loaded via `import "dotenv/config"` at the top of `src/index.js` only

---

## 🏗️ Architecture: 3-Layer Pattern

Every feature MUST follow this strict separation:

```
Request → Route → Controller → Service → (DB / external API)
                                ↓
                          Controller → Response
```

| Layer | Responsibility | What it must NOT do |
|---|---|---|
| Route | Declare path + HTTP method, attach middleware | Contain logic |
| Controller | Parse req, call service, send response | Contain business logic or DB queries |
| Service | Business logic, data access, validation | Touch `req` / `res` |

```js
// ✅ CORRECT — controller delegates to service
const getById = asyncHandler(async (req, res) => {
  const prompt = await promptService.findById(req.params.id);
  sendSuccess(res, prompt);
});

// ❌ WRONG — controller doing DB work directly
const getById = asyncHandler(async (req, res) => {
  const prompt = await db.collection("prompts").findOne({ id: req.params.id });
  res.json(prompt);
});
```

---

## 📡 API Response Format

All responses MUST use the helpers in `utils/apiResponse.js`. Never call `res.json()` directly.

### Success (single resource or action)
```json
{ "success": true, "data": { ... } }
```

### Success (paginated list)
```json
{
  "success": true,
  "data": [ ... ],
  "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}
```

### Error
```json
{ "success": false, "message": "Prompt with id \"xyz\" not found" }
```

---

## ⚠️ Error Handling Rules

- **Never** use `try/catch` in controllers — wrap with `asyncHandler` instead
- **Never** throw plain `new Error()` — always use `createError(statusCode, message)`
- **Never** send error responses manually — always call `next(err)` and let `errorHandler` handle it
- Operational errors (404, 400, 401, 403) use `createError` with the correct status code
- Unexpected errors (DB crash, etc.) bubble up as 500s automatically

```js
// ✅ CORRECT
const findById = async (id) => {
  const prompt = prompts.find((p) => p.id === id);
  if (!prompt) throw createError(404, `Prompt with id "${id}" not found`);
  return prompt;
};

// ❌ WRONG — plain Error, no status code
if (!prompt) throw new Error("Not found");

// ❌ WRONG — manual response in controller
if (!prompt) return res.status(404).json({ error: "Not found" });
```

---

## 🔐 Security Rules

- `helmet()` is always applied — never remove it
- `cors()` is configured via `CORS_ORIGIN` env var — never hardcode origins
- Request body is limited to `10kb` — never increase without justification
- Rate limiting is applied to all `/api/*` routes — never bypass for convenience
- **Never** log `req.body` in production — it may contain sensitive data
- **Never** expose stack traces in production responses (controlled by `NODE_ENV` check in `errorHandler`)
- **Never** commit `.env` — only `.env.example` goes to version control

---

## 🌍 Environment Config Rules

- All `process.env` access MUST go through `src/config/env.js`
- **Never** read `process.env.ANYTHING` directly in feature code
- Every new env var must be added to `.env.example` with a placeholder value

```js
// ✅ CORRECT
const { PORT, CORS_ORIGIN } = require("./config/env");

// ❌ WRONG — direct process.env access in feature code
const port = process.env.PORT || 5000;
```

---

## 🗂️ Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Files | `kebab-case` | `prompt.service.js` |
| Route files | `<resource>.routes.js` | `prompt.routes.js` |
| Controller files | `<resource>.controller.js` | `prompt.controller.js` |
| Service files | `<resource>.service.js` | `prompt.service.js` |
| Functions | `camelCase` | `findById`, `createPrompt` |
| Constants | `SCREAMING_SNAKE_CASE` | `const MAX_LIMIT = 100` |
| Error messages | Sentence case, include the offending value | `Prompt with id "xyz" not found` |

---

## 📋 Route Conventions

| Action | Method | Path | Status |
|---|---|---|---|
| List all | `GET` | `/api/prompts` | 200 |
| Get one | `GET` | `/api/prompts/:id` | 200 |
| Create | `POST` | `/api/prompts` | 201 |
| Update | `PUT` | `/api/prompts/:id` | 200 |
| Delete | `DELETE` | `/api/prompts/:id` | 200 |

- Always version the API if breaking changes are introduced: `/api/v2/...`
- Query params for filtering: `?category=seo&search=blog&sort=popular&page=1&limit=20`
- Never put filtering logic in the route or controller — it belongs in the service

---

## 🔄 Adding a New Resource (Checklist)

When adding a new resource (e.g. `users`, `collections`):

- [ ] Create `src/services/<resource>.service.js` with data access methods
- [ ] Create `src/controllers/<resource>.controller.js` using `asyncHandler` + `apiResponse`
- [ ] Create `src/routes/<resource>.routes.js` with Express Router
- [ ] Mount the new router in `src/routes/index.js`
- [ ] Add any new env vars to `src/config/env.js` and `.env.example`
- [ ] Never skip the service layer — no DB calls in controllers

---

## 🚫 Hard Rules (Never Do These)

1. **Never** write business logic or DB queries in a controller
2. **Never** use `try/catch` in controllers — use `asyncHandler`
3. **Never** call `res.json()` directly — use `sendSuccess` or `sendPaginated`
4. **Never** throw `new Error()` — use `createError(statusCode, message)`
5. **Never** read `process.env` outside of `config/env.js`
6. **Never** commit `.env` to version control
7. **Never** remove `helmet()` or `cors()` from `app.js`
8. **Never** increase the body size limit without a documented reason
9. **Never** log sensitive request data (`req.body` passwords, tokens, etc.)
10. **Never** expose stack traces outside of `NODE_ENV=development`
11. **Never** use `require()` or `module.exports` — this is an ESM project
12. **Never** omit the `.js` extension on local imports

---

## ✅ Pre-Commit Checklist

- [ ] No `process.env` access outside `config/env.js`
- [ ] All controllers use `asyncHandler` — no bare `try/catch`
- [ ] All responses use `sendSuccess` or `sendPaginated`
- [ ] All errors use `createError` and are passed to `next(err)`
- [ ] New resource has route + controller + service (3 files minimum)
- [ ] New route mounted in `routes/index.js`
- [ ] New env vars added to `.env.example`
- [ ] No secrets or `.env` committed

---

*Last updated: March 2026*
