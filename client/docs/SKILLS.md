# PromptStudio — Client Development Rules & Coding Standards

> **Skill Name:** promptstudio-client  
> **Description:** Frontend coding rules and architecture for the PromptStudio client — a Next.js 15 + React 19 + TypeScript application. Trigger this skill whenever writing, editing, or reviewing any client-side code: pages, components, hooks, API calls, state management, or styles.  
> **Last Updated:** March 2026

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

## 📚 Module Documentation Requirements

**CRITICAL RULE:** For every major feature module you implement, you MUST create a detailed documentation file in `/client/docs/`.

### Required Documentation Files

Each module MUST have its own comprehensive `.md` file:

| Module | File | Required Contents |
|---|---|---|
| **Authentication** | `AUTHENTICATION.md` | Auth flow, validation, error handling, API integration, complete examples |
| **Prompts** | `PROMPTS.md` | Prompt CRUD, like/copy, trending, API endpoints, components, hooks |
| **Admin** | `ADMIN.md` | Admin panel, user management, content moderation, stats dashboard |
| **Search** | `SEARCH.md` | Search implementation, filters, debouncing, API integration |
| **Generation** | `GENERATION.md` | Image generation flow, quota management, Gemini API integration |
| **Collections** | `COLLECTIONS.md` | Collection CRUD, add/remove prompts, UI patterns |
| **Categories** | `CATEGORIES.md` | Category browsing, filtering, slug handling |
| **User Profile** | `USER.md` | Profile management, settings, avatar upload, password change |

### Documentation Template Structure

Each module documentation MUST include these sections:

1. **Overview** — What the module does, key features, user flows
2. **API Endpoints** — All endpoints with request/response examples, status codes
3. **Components** — List all components with file paths and purposes
4. **Hooks** — Custom hooks with usage examples and return values
5. **State Management** — Zustand stores if applicable, state shape
6. **Validation Rules** — All validation logic specific to the module
7. **Error Handling** — Module-specific error scenarios and handling
8. **Complete Code Example** — Full implementation showing best practices
9. **Manual Testing Checklist** — Key scenarios to test manually
10. **Common Patterns** — Reusable patterns specific to the module

### When to Create Documentation

- **Before implementing** a new major feature — plan the architecture
- **During implementation** — document as you build
- **After completing** a feature module — ensure completeness
- **When refactoring** — update docs to match new patterns

### Documentation Best Practices

- Use code examples liberally
- Show both correct (✅) and incorrect (❌) patterns
- Include error scenarios and how to handle them
- Reference other related modules
- Keep examples minimal but complete
- Update when patterns change

**IMPORTANT:** This SKILLS.md file is the entry point for all AI coding. Detailed implementation patterns go in module-specific docs in `/client/docs/`. When implementing features, ALWAYS reference the appropriate module documentation file.

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
- [ ] Base test file exists at `app/__tests__/app.test.tsx`

*Last updated: March 2026*

---

## 📚 Documentation Structure

All implementation details and patterns are documented in `/client/docs/`:

| File | Purpose |
|---|---|
| `AUTHENTICATION.md` | Complete auth implementation guide with examples |
| `ERROR_HANDLING.md` | Error handling patterns and validation rules |

**IMPORTANT:** When implementing authentication features, ALWAYS reference `docs/AUTHENTICATION.md` for the complete pattern including validation, error handling, and toast notifications.

---

## 🔧 Error Handling & Validation

### Client-Side Validation Rules

All form inputs MUST be validated before API calls:

1. **Email validation** — Use `validateEmail()` from `lib/validation.ts`
2. **Password validation** — Use `validatePassword()` from `lib/validation.ts`
3. **Username validation** — Use `validateUsername()` from `lib/validation.ts`
4. **Field-level errors** — Show inline error messages below each field
5. **Clear errors on change** — Remove field error when user starts typing

### Validation Requirements

| Field | Rules |
|---|---|
| Email | Required, valid format (`user@domain.com`) |
| Password | Required, 8-128 chars, at least 1 letter and 1 number |
| Username | Required, 3-32 chars, alphanumeric + underscores only |
| Password Confirmation | Must match password field |

### Error Handling Pattern

```typescript
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/toast";

const toast = useToast();

try {
  await someApiCall();
  toast.success("Operation successful!");
} catch (err) {
  const appError = handleApiError(err, "OperationName");
  setError(appError.message);
  toast.error(appError.message);
}
```

### Global Error Handler

All API errors are processed through `handleApiError()`:
- Extracts user-friendly messages from axios errors
- Logs errors in development only
- Returns standardized `AppError` object
- Never exposes stack traces to users

### Toast Notifications

Use the global toast system for user feedback:

```typescript
import { useToast } from "@/components/toast";

const toast = useToast();

toast.success("Account created successfully!");
toast.error("Login failed. Please try again.");
toast.info("Your session will expire in 5 minutes.");
```

**Toast Rules:**
- Success: Green, CheckCircle icon
- Error: Red, AlertCircle icon
- Info: Blue, Info icon
- Auto-dismiss after 5 seconds
- User can manually dismiss
- Max 5 toasts visible at once

---

## 🎯 State Management

### Zustand Store Pattern

All global state uses Zustand with persistence:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyStore {
  data: any;
  setData: (data: any) => void;
}

export const useMyStore = create<MyStore>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    {
      name: 'my-storage',
      partialize: (state) => ({ data: state.data }),
    }
  )
);
```

### Auth State

Auth state is managed by `store/auth.store.ts`:
- Persisted to localStorage automatically
- Synced across tabs
- Token attached to all API requests via axios interceptor
- Cleared on logout or 401 responses

---

## 🔐 Authentication Patterns

### Protected Routes

Wrap any page requiring auth:

```typescript
import ProtectedRoute from "@/components/protected-route";

export default function MyPage() {
  return (
    <ProtectedRoute>
      <MyPageClient />
    </ProtectedRoute>
  );
}
```

### Using Auth in Components

```typescript
import { useAuth } from "@/hooks/useAuth";

const { user, isAuthenticated, login, logout } = useAuth();

if (!isAuthenticated) {
  return <LoginPrompt />;
}
```

### Conditional Rendering Based on Auth

```typescript
{isAuthenticated ? (
  <button onClick={handleSubmit}>Submit</button>
) : (
  <Link href="/login">Login to submit</Link>
)}
```

---

## 📡 API Integration

### API Call Pattern

All API calls go through `lib/api/*.api.ts`:

```typescript
// lib/api/myresource.api.ts
import axios from '../axios';

export const myResourceApi = {
  getAll: async () => {
    return axios.get('/api/v1/myresource');
  },
  
  getById: async (id: string) => {
    return axios.get(`/api/v1/myresource/${id}`);
  },
  
  create: async (data: CreateData) => {
    return axios.post('/api/v1/myresource', data);
  },
};
```

### Custom Hooks for API

Wrap API calls in custom hooks:

```typescript
// hooks/useMyResource.ts
import { useState } from 'react';
import { myResourceApi } from '@/lib/api';
import { handleApiError } from '@/lib/error-handler';
import { useToast } from '@/components/toast';

export const useMyResource = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await myResourceApi.getAll();
      setData(response.data);
    } catch (err) {
      const error = handleApiError(err, 'FetchData');
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, fetchData };
};
```

### User Profile Hook (`useUser`)

The `useUser` hook provides methods for managing user profile operations:

```typescript
import { useUser } from '@/hooks';

const { 
  isLoading, 
  updateProfile, 
  uploadAvatar,
  updatePassword, 
  deleteAccount, 
  getMyPrompts 
} = useUser();

// Update profile
await updateProfile({
  username: 'newusername',
  bio: 'New bio text'
});

// Upload avatar (base64 data URI)
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const reader = new FileReader();
reader.onloadend = async () => {
  await uploadAvatar(reader.result as string);
};
reader.readAsDataURL(file);

// Update password
await updatePassword({
  current_password: 'oldpass',
  new_password: 'newpass123'
});

// Delete account
await deleteAccount();

// Get user's prompts
const response = await getMyPrompts(1, 12);
```

**Available Methods:**
- `updateProfile({ username?, bio? })` - Updates user profile, syncs with auth store
- `uploadAvatar(imageData)` - Uploads avatar to Cloudinary (base64 data URI), deletes old avatar, syncs with auth store
- `updatePassword({ current_password, new_password })` - Changes password
- `deleteAccount()` - Permanently deletes account
- `getMyPrompts(page, limit)` - Gets user's created prompts with pagination

**State:**
- `isLoading` - Boolean indicating if any operation is in progress

All methods automatically handle errors through the global error handler and display toast notifications.

**Avatar Upload Notes:**
- Send image as base64 data URI (e.g., `data:image/png;base64,...`)
- Old avatar is automatically deleted from Cloudinary
- Image is uploaded to `promptstudio/avatars/{userId}` folder
- Returns updated user object with new `avatar_url`

---

## 🎨 Component Patterns

### Button & Interactive Element Rules

**CRITICAL:** All interactive elements MUST have `cursor-pointer` class:

```typescript
// ✅ CORRECT
<button onClick={handleClick} className="... cursor-pointer">
  Click Me
</button>

<div onClick={handleClick} className="... cursor-pointer">
  Clickable Div
</div>

<Link href="/page" className="... cursor-pointer">
  Navigate
</Link>

// ❌ WRONG — Missing cursor-pointer
<button onClick={handleClick} className="...">
  Click Me
</button>
```

**When to add `cursor-pointer`:**
- All `<button>` elements
- All elements with `onClick` handlers
- All `<Link>` components that look like buttons
- All clickable `<div>`, `<span>`, or custom elements
- All form labels with `htmlFor` attribute

**Exception:** Native `<a>` tags and `<Link>` components with default link styling already have pointer cursor.

### Form Component Structure

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateField } from "@/lib/validation";
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/toast";

export default function MyForm() {
  const [formData, setFormData] = useState({ field: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validate
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await apiCall(formData);
      toast.success("Success!");
      router.push("/success-page");
    } catch (err) {
      const appError = handleApiError(err, "FormSubmit");
      setError(appError.message);
      toast.error(appError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Input Field Pattern

```typescript
<div>
  <label 
    htmlFor="fieldName" 
    className="block text-sm font-medium text-gray-300 mb-2 cursor-pointer"
  >
    Field Label
  </label>
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
    <input
      type="text"
      id="fieldName"
      required
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setFieldErrors((prev) => ({ ...prev, fieldName: "" }));
      }}
      placeholder="Enter value"
      className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
        fieldErrors.fieldName
          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
      }`}
    />
  </div>
  {fieldErrors.fieldName && (
    <p className="mt-1.5 text-xs text-red-400">{fieldErrors.fieldName}</p>
  )}
</div>
```

### Button Loading States

```typescript
<button
  type="submit"
  disabled={isLoading}
  className="... cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
>
  {isLoading ? "Loading..." : "Submit"}
</button>
```

---

## 📝 TypeScript Rules

### Strict Typing

- No `any` types — use `unknown` and type guards instead
- All props must have explicit interfaces
- All API responses must be typed
- Use type inference where obvious, explicit types elsewhere

### Type Definitions

```typescript
// types/auth.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar_url?: string;
  bio?: string;
  plan: 'free' | 'pro';
  is_verified: boolean;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}
```

### Component Props

```typescript
interface MyComponentProps {
  title: string;
  description?: string;
  onSubmit: (data: FormData) => void;
  children?: React.ReactNode;
}

export default function MyComponent({ 
  title, 
  description, 
  onSubmit,
  children 
}: MyComponentProps) {
  // ...
}
```

---

## 🚨 Hard Rules — Never Break These

### Error Handling
1. **Never** use `alert()` for errors — use toast notifications
2. **Never** log errors in production — use `logError()` which checks `NODE_ENV`
3. **Never** expose stack traces to users
4. **Always** validate forms before API calls
5. **Always** show field-level errors inline
6. **Always** clear errors when user starts typing
7. **Always** use `handleApiError()` for API error processing

### Validation
1. **Never** skip client-side validation
2. **Never** trust user input — validate everything
3. **Always** use centralized validation functions from `lib/validation.ts`
4. **Always** show validation errors immediately
5. **Never** submit forms with validation errors

### State Management
1. **Never** store sensitive data in localStorage without encryption
2. **Never** mutate state directly — use setter functions
3. **Always** use Zustand for global state
4. **Always** use `useState` for local component state
5. **Never** store derived state — compute it

### API Calls
1. **Never** make API calls directly — use `lib/api/*.api.ts`
2. **Never** hardcode API URLs — use axios instance with baseURL
3. **Always** handle loading states
4. **Always** handle errors with toast + inline messages
5. **Never** retry failed requests without user action

### Forms
1. **Always** use `<label htmlFor>` with matching input `id`
2. **Always** add `cursor-pointer` to labels
3. **Always** show loading state on submit buttons
4. **Always** disable buttons during submission
5. **Always** add `cursor-pointer` to all buttons
6. **Always** clear errors on field change
7. **Never** submit without validation
8. **Always** use `disabled:cursor-not-allowed` on disabled buttons

### Interactive Elements
1. **Always** add `cursor-pointer` to clickable elements
2. **Always** add `cursor-pointer` to buttons
3. **Always** add `cursor-pointer` to custom clickable divs/spans
4. **Always** add `cursor-pointer` to labels with `htmlFor`
5. **Never** forget cursor styling on interactive elements

---

## 📦 File Organization

### Required Structure

```
client/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── login/
│   │   └── signup/
│   └── (protected)/              # Route group for protected pages
│       ├── submit/
│       └── profile/
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components (buttons, inputs)
│   └── features/                 # Feature-specific components
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities and helpers
│   ├── api/                      # API client functions
│   ├── validation.ts             # Form validation
│   ├── error-handler.ts          # Error processing
│   └── utils.ts                  # General utilities
├── store/                        # Zustand stores
├── types/                        # TypeScript type definitions
└── sections/                     # Page-level section components
```

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `LoginClient.tsx`, `PromptCard.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts`, `usePrompts.ts` |
| Utils | camelCase | `validation.ts`, `error-handler.ts` |
| Types | PascalCase | `User`, `AuthResponse` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE`, `API_TIMEOUT` |

---

## 🎯 Code Quality Standards

### Component Rules

1. **One component per file** — except for small, tightly coupled helpers
2. **Extract repeated JSX** — If used 3+ times, make it a component
3. **Props interface at top** — Always define before component
4. **Early returns** — Handle edge cases first
5. **Destructure props** — `({ title, description }: Props)` not `(props: Props)`

### Hook Rules

1. **Single responsibility** — One hook, one concern
2. **Return object** — `return { data, isLoading, error, refetch }`
3. **Handle cleanup** — Use `useEffect` cleanup for subscriptions
4. **Memoize expensive computations** — Use `useMemo` when needed
5. **Stable references** — Use `useCallback` for functions passed as props

### Performance Rules

1. **Lazy load images** — Use `loading="lazy"` except above-the-fold
2. **Code splitting** — Use `dynamic()` for heavy components
3. **Memoize expensive renders** — Use `React.memo()` sparingly
4. **Debounce search inputs** — Use `useDebouncedValue` hook
5. **Virtualize long lists** — Use `react-window` for 100+ items

---

## 🔒 Security Rules

### Client-Side Security

1. **Never** store sensitive data in localStorage unencrypted
2. **Never** log tokens or passwords — even in development
3. **Always** sanitize user input before rendering
4. **Always** use HTTPS in production
5. **Never** expose API keys in client code

### XSS Prevention

1. **Never** use `dangerouslySetInnerHTML` without sanitization
2. **Always** escape user-generated content
3. **Never** execute user-provided code
4. **Always** validate URLs before navigation

---

## 🧪 Testing Standards

### Test File Location

**IMPORTANT:** We maintain only ONE base test file for the entire client application:

- **Location:** `client/app/__tests__/app.test.tsx`
- **Purpose:** Basic smoke tests to verify the app builds and test environment works
- **No per-module tests** — Keep it minimal

### Test Pattern

```typescript
import { describe, it, expect } from 'vitest';

describe('App Health Check', () => {
  it('app builds and tests run successfully', () => {
    expect(true).toBe(true);
  });

  it('basic math works', () => {
    expect(1 + 1).toBe(2);
  });
});
```

### Testing Philosophy

- Keep tests minimal — one base file only
- Focus on manual testing and code review
- No per-component or per-module test files
- Test environment verification only

---

## 📋 Pre-Commit Checklist

Before committing any code, verify:

- [ ] TypeScript compiles without errors (`pnpm build`)
- [ ] No `any` types used
- [ ] All forms have validation
- [ ] All API calls have error handling
- [ ] All buttons have loading states
- [ ] All inputs have labels with `htmlFor`
- [ ] All images have `alt` text
- [ ] No console.logs in production code
- [ ] No unused imports
- [ ] Toast notifications for user feedback
- [ ] Field errors clear on input change
- [ ] Base test file exists at `app/__tests__/app.test.tsx`

---

## 🚫 Anti-Patterns — Never Do These

1. **Never** use `any` type
2. **Never** skip validation
3. **Never** use `alert()` or `confirm()` — use toast notifications
4. **Never** make API calls in components — use hooks
5. **Never** store passwords in state longer than needed
6. **Never** log sensitive data
7. **Never** ignore TypeScript errors
8. **Never** use `// @ts-ignore` without a comment explaining why
9. **Never** mutate props
10. **Never** use `useEffect` for data fetching — use React Query or custom hooks
11. **Never** forget `cursor-pointer` on buttons and clickable elements
12. **Never** forget `disabled:cursor-not-allowed` on disabled buttons
13. **Never** forget `cursor-pointer` on labels with `htmlFor`

---

## 📚 Additional Documentation

For detailed implementation guides, see:
- `docs/AUTHENTICATION.md` - Complete auth implementation with validation and error handling
- `docs/ERROR_HANDLING.md` - Error handling patterns and best practices

**IMPORTANT:** When implementing authentication or forms, ALWAYS reference these docs for the complete pattern.

---

*Last updated: March 2026 — PromptStudio v1.0.0*
