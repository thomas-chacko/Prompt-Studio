# Admin Module Documentation

> **Purpose:** Admin dashboard and management interface  
> **Access:** Admin role required

## Overview

Admin module provides platform management capabilities. Access restricted to users with `role: "admin"`.

## Accessing Admin Dashboard

**Desktop:** Look for purple "Admin" button with shield icon in top-right navbar  
**Mobile:** Open hamburger menu, find "Admin Dashboard" at bottom  
**Direct URL:** `/admin`

**Setup:**
1. Set admin role in database: `UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';`
2. Logout and login again
3. Admin button will appear in navbar

---

## Access Control

### Admin Route Protection

All admin pages use the `AdminRoute` component which:
1. Checks if user is authenticated
2. Verifies user role is `admin`
3. Redirects to `/login` if not authenticated
4. Redirects to `/` if authenticated but not admin

```typescript
import AdminRoute from "@/components/admin-route";

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}
```

### Role Hierarchy

| Role | Access Level |
|---|---|
| `user` | No admin access — redirected to home |
| `admin` | Full admin dashboard access |

**Note:** There is no `super_admin` role in the frontend. All admins have equal access.

---

## API Integration

### Admin API Client

Location: `client/lib/api/admin.api.ts`

All admin API calls go through the centralized admin API client:

```typescript
import { adminApi } from '@/lib/api';

// Platform Stats
const stats = await adminApi.getStats();

// User Management
const users = await adminApi.getUsers({ page: 1, limit: 20 });
await adminApi.updateUserRole(userId, 'admin');
await adminApi.deleteUser(userId);

// Prompt Management
const prompts = await adminApi.getPrompts({ isPublished: false });
await adminApi.updatePrompt(promptId, { isPublished: true });
await adminApi.deletePrompt(promptId);

// Category Management
const categories = await adminApi.getCategories();
await adminApi.createCategory({ category: 'Sci-Fi', slug: 'sci-fi' });
await adminApi.updateCategory(categoryId, { category: 'Updated Name' });
await adminApi.deleteCategory(categoryId);

// Generation Monitoring
const generations = await adminApi.getGenerations({ page: 1 });
```

---

## Custom Hook: useAdmin

Location: `client/hooks/useAdmin.ts`

The `useAdmin` hook wraps all admin API calls with loading states, error handling, and toast notifications.

### Usage Example

```typescript
import { useAdmin } from '@/hooks/useAdmin';

function AdminComponent() {
  const {
    isLoading,
    getStats,
    getUsers,
    updateUserRole,
    deleteUser,
    getPrompts,
    updatePrompt,
    deletePrompt,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getGenerations,
  } = useAdmin();

  const handleUpdateRole = async (userId: string) => {
    try {
      await updateUserRole(userId, 'admin');
      // Success toast shown automatically
      // Refresh data
    } catch (error) {
      // Error toast shown automatically
    }
  };

  return <div>...</div>;
}
```

### Hook Methods

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `getStats` | - | Platform stats object | Get dashboard statistics |
| `getUsers` | `{ page, limit, role, plan, search }` | Paginated users | Get all users with filters |
| `updateUserRole` | `userId, role` | Updated user | Change user role |
| `deleteUser` | `userId` | Success message | Delete user and all data |
| `getPrompts` | `{ page, limit, isPublished, categoryId, search }` | Paginated prompts | Get all prompts with filters |
| `updatePrompt` | `promptId, data` | Updated prompt | Update prompt details |
| `deletePrompt` | `promptId` | Success message | Delete prompt |
| `getCategories` | - | Categories array | Get all categories |
| `createCategory` | `{ category, slug, imageUrl }` | New category | Create category |
| `updateCategory` | `categoryId, data` | Updated category | Update category |
| `deleteCategory` | `categoryId` | Success message | Delete category |
| `getGenerations` | `{ page, limit, userId, apiKeySource }` | Paginated generations | Get all generations |

---

## Components

### AdminRoute

Location: `client/components/admin-route.tsx`

Protected route wrapper for admin-only pages.

```typescript
interface AdminRouteProps {
  children: React.ReactNode;
}

// Usage
<AdminRoute>
  <AdminDashboard />
</AdminRoute>
```

**Behavior:**
- Checks authentication status
- Verifies user role is `admin`
- Shows loading spinner while checking
- Redirects to `/login` if not authenticated
- Redirects to `/` if not admin

---

### AdminDashboardClient

Location: `client/app/admin/admin-client.tsx`

Main admin dashboard component with tabbed interface.

**Features:**
- Overview tab with platform statistics
- Users tab (placeholder for user management)
- Prompts tab (placeholder for prompt moderation)
- Categories tab (placeholder for category management)
- Generations tab (placeholder for generation monitoring)

**State Management:**
```typescript
const [stats, setStats] = useState<any>(null);
const [activeTab, setActiveTab] = useState<"overview" | "users" | "prompts" | "categories" | "generations">("overview");
```

---

## Page Structure

### Admin Dashboard Page

Location: `client/app/admin/page.tsx`

```typescript
import { Metadata } from "next";
import AdminRoute from "@/components/admin-route";
import AdminDashboardClient from "./admin-client";

export const metadata: Metadata = {
  title: "Admin Dashboard — Manage Platform | PromptStudio",
  description: "Admin dashboard for managing users, prompts, categories, and monitoring platform activity.",
  robots: "noindex, nofollow", // Prevent search engine indexing
};

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <AdminDashboardClient />
    </AdminRoute>
  );
}
```

**Important:** Admin pages should have `robots: "noindex, nofollow"` to prevent search engine indexing.

---

## Dashboard Statistics

### Overview Stats

The overview tab displays:

**Platform Overview:**
- Total Users
- Total Prompts
- Total Generations
- Total Categories
- Published Prompts
- Unpublished Prompts
- Admin Users
- Pro Users

**Recent Activity (Last 7 Days):**
- New Users This Week
- New Prompts This Week
- Generations This Week

### Data Structure

```typescript
interface PlatformStats {
  overview: {
    totalUsers: number;
    totalPrompts: number;
    totalGenerations: number;
    totalCategories: number;
    publishedPrompts: number;
    unpublishedPrompts: number;
    adminUsers: number;
    proUsers: number;
  };
  recentActivity: {
    newUsersThisWeek: number;
    newPromptsThisWeek: number;
    generationsThisWeek: number;
  };
}
```

---

## Error Handling

All admin operations use the standard error handling pattern:

```typescript
try {
  await adminOperation();
  toast.success("Operation successful");
} catch (error) {
  // Error automatically handled by useAdmin hook
  // Toast notification shown automatically
  console.error("Operation failed:", error);
}
```

### Common Error Scenarios

| Error | Status | Message | Action |
|---|---|---|---|
| Not authenticated | 401 | "Authorization token required" | Redirect to login |
| Not admin | 403 | "Admin access required" | Redirect to home |
| User not found | 404 | "User with id \"xyz\" not found" | Show error toast |
| Category has prompts | 400 | "Cannot delete category with X prompts" | Show error toast |
| Duplicate category | 409 | "Category or slug already exists" | Show error toast |

---

## UI Components

### StatCard

Displays a single statistic with icon and value.

```typescript
<StatCard
  icon={Users}
  label="Total Users"
  value={1250}
  color="purple" // or "cyan"
/>
```

### ActivityCard

Displays recent activity metric.

```typescript
<ActivityCard
  icon={UserPlus}
  label="New Users"
  value={87}
/>
```

---

## Styling Guidelines

### Color Scheme

- Background: `bg-[#03010a]` (deep dark)
- Cards: `bg-black/40` with `border-white/10`
- Primary accent: `text-brand-purple` (#7c3aed)
- Secondary accent: `text-brand-cyan`
- Success: `text-green-400`
- Warning: `text-yellow-400`
- Error: `text-red-400`

### Layout

- Max width: `max-w-7xl mx-auto`
- Padding: `px-6 py-12`
- Card spacing: `gap-6`
- Border radius: `rounded-2xl`

---

## Future Enhancements

### User Management Tab

**Planned Features:**
- Searchable user table
- Filter by role and plan
- Inline role editing
- Bulk actions
- User detail modal

### Prompt Management Tab

**Planned Features:**
- Searchable prompt table
- Filter by published status and category
- Quick publish/unpublish toggle
- Inline editing
- Bulk moderation actions

### Category Management Tab

**Planned Features:**
- Category list with prompt counts
- Create category modal
- Edit category inline
- Delete with confirmation
- Drag-and-drop reordering

### Generation Monitoring Tab

**Planned Features:**
- Generation history table
- Filter by user and API key source
- View generation details
- Usage analytics
- Cost tracking

---

## Testing Checklist

### Access Control
- [ ] Non-authenticated users redirected to login
- [ ] Regular users redirected to home
- [ ] Admin users can access dashboard
- [ ] Loading state shown during auth check

### Dashboard Stats
- [ ] Stats load on page mount
- [ ] Loading spinner shown while fetching
- [ ] Error handling for failed requests
- [ ] Stats display correctly formatted numbers

### Navigation
- [ ] Tab switching works smoothly
- [ ] Active tab highlighted correctly
- [ ] Tab content renders correctly
- [ ] Mobile responsive navigation

### Error Handling
- [ ] 401 errors redirect to login
- [ ] 403 errors redirect to home
- [ ] Toast notifications shown for errors
- [ ] Error messages are user-friendly

---

## Security Considerations

### Client-Side Protection

1. **Route Protection:** All admin routes wrapped in `AdminRoute`
2. **Role Verification:** User role checked on every render
3. **Token Validation:** JWT token verified by backend on every request
4. **No Sensitive Data:** Admin credentials never stored in localStorage

### Backend Validation

1. **Middleware Chain:** `auth` → `adminOnly` on all admin endpoints
2. **Role Check:** Backend verifies role on every request
3. **No Client Trust:** Never trust client-side role checks alone

---

## Best Practices

### When Building Admin Features

1. **Always use AdminRoute** for page-level protection
2. **Use useAdmin hook** for all admin API calls
3. **Show loading states** during async operations
4. **Display toast notifications** for user feedback
5. **Handle errors gracefully** with user-friendly messages
6. **Add confirmation dialogs** for destructive actions
7. **Implement pagination** for large data sets
8. **Add search and filters** for better UX
9. **Use optimistic updates** where appropriate
10. **Log admin actions** for audit trail

---

## Code Examples

### Complete Admin Page Example

```typescript
// app/admin/users/page.tsx
import { Metadata } from "next";
import AdminRoute from "@/components/admin-route";
import UserManagementClient from "./users-client";

export const metadata: Metadata = {
  title: "User Management — Admin | PromptStudio",
  description: "Manage platform users",
  robots: "noindex, nofollow",
};

export default function UserManagement() {
  return (
    <AdminRoute>
      <UserManagementClient />
    </AdminRoute>
  );
}
```

### Complete Admin Component Example

```typescript
// app/admin/users/users-client.tsx
"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";

export default function UserManagementClient() {
  const { getUsers, updateUserRole, deleteUser, isLoading } = useAdmin();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      const response = await getUsers({ page, limit: 20 });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      await updateUserRole(userId, newRole);
      await loadUsers(); // Refresh list
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await deleteUser(userId);
      await loadUsers(); // Refresh list
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#03010a] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-4">
          {users.map((user: any) => (
            <div key={user.id} className="bg-black/40 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{user.username}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                    className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

*Last updated: March 2026 — PromptStudio v1.0.0*
