---
name: promptstudio-server
description: >
  Backend coding rules and architecture for the PromptStudio server — a Node.js + Express REST API
  that powers an AI image and video prompt gallery. Trigger this skill whenever writing, editing, or
  reviewing any server-side code: routes, controllers, services, middleware, utils, config, or tests.
  Also use when adding new resources, wiring environment variables, or handling errors. Do not skip
  for "small" changes — every backend code touch must follow these rules.
---

# PromptStudio Server — AI Coding Rules

## What Is PromptStudio?

PromptStudio is an **AI image and video prompt gallery and generator**. Users browse a visually
rich library of AI-generated images, copy the exact prompts behind them, and generate their own
images directly on the site using their own **Gemini API key**.

This server is the REST API backend that serves prompts, categories, and generation-supporting data
to the Next.js frontend.

---

## Module System — ESM Only

`"type": "module"` is in `package.json`. No CommonJS anywhere.

- `import` / `export` only — never `require()` or `module.exports`
- Always include the `.js` extension on local imports
- Named exports for services, controllers, and utils
- Default exports for middleware, the Express app, and router instances
- `dotenv` loaded once via `import "dotenv/config"` at the top of `src/index.js` only

```js
// ✅
import { findAll, findById } from "../services/prompt.service.js";
import asyncHandler from "../utils/asyncHandler.js";

// ❌
const { findAll } = require("../services/prompt.service");
module.exports = { getAll };
```

---

## Architecture — 3-Layer Pattern

```
Request → Route → Controller → Service → (DB / external API)
                                    ↓
                              Controller → Response
```

| Layer | Owns | Must NOT do |
|---|---|---|
| **Route** | Path, HTTP method, middleware | Any logic |
| **Controller** | Parse `req`, call service, send response | Business logic or DB queries |
| **Service** | Business logic, data access, validation | Touch `req` or `res` |

```js
// ✅
const getById = asyncHandler(async (req, res) => {
  const prompt = await promptService.findById(req.params.id);
  sendSuccess(res, prompt);
});

// ❌ — DB query inside a controller
const getById = asyncHandler(async (req, res) => {
  const prompt = await db.collection("prompts").findOne({ id: req.params.id });
  res.json(prompt);
});
```

---

## Project Structure

```
server/src/
├── index.js                  # Entry point — boots server, loads dotenv
├── app.js                    # Express factory — middleware + routes
├── config/
│   └── env.js                # Single source of truth for ALL env vars
├── routes/
│   ├── index.js              # Root router — mounts all resource routers
│   ├── prompt.routes.js      # /api/prompts
│   └── category.routes.js    # /api/categories
├── controllers/
│   ├── prompt.controller.js
│   └── category.controller.js
├── services/
│   ├── prompt.service.js
│   └── category.service.js
├── middleware/
│   ├── errorHandler.js       # Global — must be LAST in app.js
│   ├── notFound.js           # 404 catch-all — must be SECOND-TO-LAST
│   └── rateLimiter.js        # Applied to all /api/* routes
└── utils/
    ├── asyncHandler.js       # Wraps async controllers — eliminates try/catch
    ├── createError.js        # Factory for operational HTTP errors
    └── apiResponse.js        # sendSuccess / sendPaginated helpers
```

---

## API Response Format

Always use `sendSuccess` or `sendPaginated` from `utils/apiResponse.js`. Never `res.json()` directly.

```js
// Single resource
{ "success": true, "data": { ... } }

// Paginated list
{ "success": true, "data": [...], "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 } }

// Error (errorHandler sends this automatically)
{ "success": false, "message": "Prompt with id \"xyz\" not found" }
```

---

## Error Handling

- No `try/catch` in controllers — use `asyncHandler`
- No `new Error()` — use `createError(statusCode, message)`
- No manual error responses in controllers — call `next(err)`, let `errorHandler` handle it
- Operational errors (400, 401, 403, 404) use `createError` with the correct status
- Unexpected errors bubble up as 500 automatically

```js
// ✅
const findById = async (id) => {
  const prompt = prompts.find((p) => p.id === id);
  if (!prompt) throw createError(404, `Prompt with id "${id}" not found`);
  return prompt;
};

// ❌
if (!prompt) throw new Error("Not found");
if (!prompt) return res.status(404).json({ error: "Not found" });
```

---

## Environment Variables

- All `process.env` access lives in `src/config/env.js` — nowhere else
- Import from the config object everywhere else
- Every new env var must be added to `.env.example` with a placeholder
- Never commit `.env`

```js
// ✅
import { PORT, CORS_ORIGIN } from "./config/env.js";

// ❌
const port = process.env.PORT || 5000;
```

---

## Security Rules

- `helmet()` always applied — never remove it
- `cors()` configured via `CORS_ORIGIN` env var — never hardcode origins
- Request body capped at `10kb` — never increase without a documented reason
- Rate limiting on all `/api/*` routes — never bypass
- Never log `req.body` in production
- Never expose stack traces outside `NODE_ENV=development`

---

## Route Conventions

| Action | Method | Path | Status |
|---|---|---|---|
| List all | `GET` | `/api/prompts` | 200 |
| Get one | `GET` | `/api/prompts/:id` | 200 |
| Create | `POST` | `/api/prompts` | 201 |
| Update | `PUT` | `/api/prompts/:id` | 200 |
| Delete | `DELETE` | `/api/prompts/:id` | 200 |

- Version for breaking changes: `/api/v2/...`
- Filtering via query params: `?category=cinematic&search=sunset&sort=popular&page=1&limit=20`
- All filtering logic in the **service layer** — never in routes or controllers

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Files | `kebab-case` | `prompt.service.js` |
| Functions | `camelCase` | `findById`, `createPrompt` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_LIMIT` |
| Error messages | Sentence case, include the offending value | `Prompt with id "xyz" not found` |

---

## Adding a New Resource

- [ ] `src/services/<resource>.service.js`
- [ ] `src/controllers/<resource>.controller.js` — `asyncHandler` + `apiResponse` only
- [ ] `src/routes/<resource>.routes.js` — Express Router instance
- [ ] Mount in `src/routes/index.js`
- [ ] New env vars → `src/config/env.js` and `.env.example`
- [ ] No DB calls in controllers — ever

---

## CI/CD

- Pipeline runs `npm test` (Jest + Supertest) and a Docker smoke test on every push
- All tests must pass locally before pushing to `main`
- Passing CI on `main` triggers automatic deployment to Render

---

## Hard Rules

1. No business logic or DB queries in controllers
2. No `try/catch` in controllers — use `asyncHandler`
3. No `res.json()` directly — use `sendSuccess` or `sendPaginated`
4. No `new Error()` — use `createError(statusCode, message)`
5. No `process.env` access outside `config/env.js`
6. No `.env` in version control
7. No removal of `helmet()` or `cors()`
8. No body size limit increases without documented justification
9. No logging of sensitive request data
10. No stack traces outside `NODE_ENV=development`
11. No `require()` or `module.exports` — ESM only
12. No local imports without the `.js` extension