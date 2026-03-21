# Error Handling & Validation Guide

## Overview

PromptStudio implements a comprehensive error handling and validation system across the entire frontend application.

---

## Architecture

```
User Input
    │
    ▼
Client-Side Validation (lib/validation.ts)
    │
    ▼
API Call (lib/api/*.api.ts)
    │
    ▼
Axios Interceptor (lib/axios.ts)
    │
    ▼
Error Handler (lib/error-handler.ts)
    │
    ├─→ Toast Notification (components/toast.tsx)
    └─→ Inline Error Message (component state)
```

---

## Validation System

### Location
`client/lib/validation.ts`

### Available Validators

```typescript
validateEmail(email: string): ValidationResult
validatePassword(password: string): ValidationResult
validateUsername(username: string): ValidationResult
validatePasswordMatch(password: string, confirmPassword: string): ValidationResult
```

### Validation Rules

**Email:**
- Required
- Must match regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**Password:**
- Required
- 8-128 characters
- At least one letter
- At least one number

**Username:**
- Required
- 3-32 characters
- Alphanumeric and underscores only (`/^[a-zA-Z0-9_]+$/`)

**Password Match:**
- Must match password field exactly

### Usage Example

```typescript
import { validateEmail, validatePassword } from "@/lib/validation";

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
```

---

## Error Handler

### Location
`client/lib/error-handler.ts`

### Core Functions

**extractErrorMessage(error: unknown): string**
- Extracts user-friendly message from any error type
- Handles axios errors, Error objects, strings, and unknown types

**getStatusMessage(statusCode: number): string**
- Maps HTTP status codes to user-friendly messages
- Covers 400, 401, 403, 404, 409, 422, 429, 500, 503

**handleApiError(error: unknown, context?: string): AppError**
- Main error processing function
- Logs errors in development only
- Returns standardized AppError object

**logError(error: unknown, context?: string): void**
- Logs to console in development only
- Never logs in production

### Usage Example

```typescript
import { handleApiError } from "@/lib/error-handler";

try {
  await apiCall();
} catch (err) {
  const appError = handleApiError(err, "MyOperation");
  setError(appError.message);
  toast.error(appError.message);
}
```

---

## Toast Notification System

### Location
`client/components/toast.tsx`

### Features
- Global notification system
- Three types: success, error, info
- Auto-dismiss after 5 seconds
- Manual dismiss with X button
- Animated entrance/exit
- Stacks multiple toasts
- Fixed position (top-right)

### Usage

```typescript
import { useToast } from "@/components/toast";

const toast = useToast();

// Success notification
toast.success("Account created successfully!");

// Error notification
toast.error("Login failed. Please try again.");

// Info notification
toast.info("Your session will expire in 5 minutes.");
```

### Toast Container

Added to root layout (`app/layout.tsx`):
```typescript
<ToastContainer />
```

---

## Error Boundary

### Location
`client/components/error-boundary.tsx`

### Purpose
Catches React rendering errors and prevents entire app from crashing.

### Features
- Catches component errors
- Shows user-friendly error UI
- Displays error details in development only
- Provides "Refresh Page" button
- Logs to console in development

### Usage

Wrap entire app in root layout:
```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

Or wrap specific sections:
```typescript
<ErrorBoundary fallback={<CustomErrorUI />}>
  <RiskyComponent />
</ErrorBoundary>
```

---

## Form Error Handling Pattern

### Complete Example

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/lib/validation";
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/toast";

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const router = useRouter();
  const toast = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await myApiCall({ email, password });
      toast.success("Success!");
      router.push("/success");
    } catch (err) {
      const appError = handleApiError(err, "MyForm");
      setError(appError.message);
      toast.error(appError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => ({ ...prev, email: "" }));
          }}
          className={fieldErrors.email ? "border-red-500" : "border-white/10"}
        />
        {fieldErrors.email && (
          <p className="text-xs text-red-400">{fieldErrors.email}</p>
        )}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
```

---

## Error Display Hierarchy

1. **Toast Notification** (top-right, auto-dismiss)
   - For all operations (success/error/info)
   - User can dismiss manually
   - Non-blocking

2. **Inline Form Error** (below form, persistent)
   - For general form submission errors
   - Stays until next submission
   - Red background with border

3. **Field-Level Error** (below input, persistent)
   - For specific field validation errors
   - Stays until user starts typing in that field
   - Red border on input + error text below

---

## HTTP Status Code Handling

| Code | Meaning | User Message | Action |
|---|---|---|---|
| 400 | Bad Request | "Invalid request. Please check your input." | Show field errors |
| 401 | Unauthorized | "Authentication required. Please login." | Redirect to login |
| 403 | Forbidden | "You do not have permission." | Show error, stay on page |
| 404 | Not Found | "Resource not found." | Show error or redirect |
| 409 | Conflict | "Already exists." | Show specific conflict message |
| 422 | Unprocessable | "Invalid data provided." | Show validation errors |
| 429 | Rate Limited | "Too many requests. Try again later." | Show error with retry |
| 500 | Server Error | "Server error. Please try again later." | Show error, allow retry |

---

## Testing Error Handling

### Validation Tests

```typescript
import { validateEmail } from '@/lib/validation';

it('should reject invalid email', () => {
  const result = validateEmail('invalid');
  expect(result.isValid).toBe(false);
  expect(result.error).toBe('Invalid email format');
});
```

### Component Error Tests

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

it('shows error message on failed login', async () => {
  render(<LoginClient />);
  
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
```

---

## Best Practices

### DO ✅
- Validate all inputs before API calls
- Show specific error messages
- Clear errors when user starts typing
- Use toast for operation feedback
- Log errors in development only
- Handle all promise rejections
- Provide loading states
- Disable buttons during submission

### DON'T ❌
- Use `alert()` or `confirm()`
- Show stack traces to users
- Log sensitive data (passwords, tokens)
- Ignore validation errors
- Make API calls without error handling
- Leave forms in loading state on error
- Show generic "Error occurred" messages
- Expose internal error details

---

*Last updated: March 2026*
