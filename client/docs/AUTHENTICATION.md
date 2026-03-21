# Authentication Implementation Guide

> **Complete reference for authentication in PromptStudio**  
> Covers API integration, validation, error handling, and usage patterns

---

## System Overview

The frontend authentication system uses:
- **Zustand** for state management with localStorage persistence
- **Custom React hooks** for auth operations (`useAuth`)
- **Axios interceptors** for automatic JWT token attachment
- **Protected route wrapper** for access control
- **Toast notifications** for user feedback
- **Comprehensive validation** before API calls

---

## Quick Start

### 1. Using Auth in Components

```typescript
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.username}!</p>
      <button onClick={logout} className="cursor-pointer">
        Logout
      </button>
    </div>
  );
}
```

### 2. Protecting Routes

Wrap any page that requires authentication:

```typescript
// app/dashboard/page.tsx
import ProtectedRoute from "@/components/protected-route";
import DashboardClient from "./dashboard-client";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardClient />
    </ProtectedRoute>
  );
}
```

---

## Full Login Component

```typescript
"use client";

import { Mail, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validatePassword } from "@/lib/validation";
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/toast";

export default function LoginClient() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  // Hooks
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error!;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/explore");
    } catch (err) {
      const appError = handleApiError(err, "Login");
      setError(appError.message);
      toast.error(appError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/ai-generated-robot.avif"
          alt="AI Generated Art"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center text-sm mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-2">Login</h1>
          <p className="text-gray-400 mb-8">Access your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Global form error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="you@example.com"
                  className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    fieldErrors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="••••••••"
                  className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                    fieldErrors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                  }`}
                />
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-purple/80 hover:to-brand-cyan/80 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

---

## Error Flow Diagram

```
User submits form
      │
      ▼
Client validation (validateForm)
      │
      ├─→ Invalid: Show field errors, stop
      │
      ▼
API call (login/signup)
      │
      ├─→ Success: Toast + redirect
      │
      ▼
API error thrown
      │
      ▼
handleApiError() processes error
      │
      ├─→ Extract message
      ├─→ Log in dev
      └─→ Return AppError
      │
      ▼
Component catch block
      │
      ├─→ Set inline error
      └─→ Show toast
      │
      ▼
User sees:
  1. Toast notification (top-right)
  2. Inline error message (in form)
  3. Button re-enabled
```

---

## Common Error Scenarios

### Scenario 1: Invalid Email Format

**User Action:** Enters "invalid-email" and clicks submit

**Flow:**
1. Client validation catches it
2. Field error shown: "Invalid email format"
3. Red border on email input
4. No API call made
5. Button stays enabled

### Scenario 2: Wrong Password

**User Action:** Enters correct email but wrong password

**Flow:**
1. Client validation passes
2. API call made
3. Server returns 401
4. handleApiError extracts: "Invalid email or password"
5. Toast shows error
6. Inline error shown in form
7. Button re-enabled

### Scenario 3: Network Error

**User Action:** Submits form with no internet

**Flow:**
1. Client validation passes
2. API call fails with network error
3. handleApiError extracts: "Network error"
4. Toast shows error
5. Inline error shown
6. Button re-enabled
7. User can retry

### Scenario 4: Email Already Exists

**User Action:** Signs up with existing email

**Flow:**
1. Client validation passes
2. API call made
3. Server returns 409
4. handleApiError extracts: "Email already registered"
5. Toast shows error
6. Inline error shown
7. Email field highlighted
8. Button re-enabled

---

## Testing Approach

**IMPORTANT:** PromptStudio uses minimal automated testing with one base test file only.

### Test File Location
- **Client:** `client/app/__tests__/app.test.tsx`
- **Server:** `server/src/__test__/app.test.js`

### Testing Philosophy
- Manual testing preferred over extensive test suites
- Base test files verify build and environment only
- No per-component or per-module test files
- Focus on code review and manual QA

### Manual Testing Checklist

- [ ] Login form shows validation errors
- [ ] Signup form shows validation errors
- [ ] Toast notifications appear on success/error
- [ ] Buttons disable during loading
- [ ] Errors clear when user types
- [ ] 401 responses redirect to login
- [ ] Network errors show user-friendly messages
- [ ] No console errors in production build

---

*Last updated: March 2026*
