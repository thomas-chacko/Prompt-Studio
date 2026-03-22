# Admin API Documentation

> **Base URL:** `/api/v1/admin`  
> **Authentication:** Required (Admin role only)

## Overview

Admin API for managing users, prompts, categories, and monitoring platform activity. All endpoints require authentication with admin role.

---

## Authentication

All admin endpoints require:
1. Valid JWT token in Authorization header
2. User role must be `admin`

```bash
Authorization: Bearer <jwt_token>
```

If the user is not an admin, the API returns `403 Forbidden`.

---

## Endpoints Summary

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/api/v1/admin/stats` | Get platform statistics | 200 |
| GET | `/api/v1/admin/users` | Get all users (paginated) | 200 |
| PUT | `/api/v1/admin/users/:id/role` | Update user role | 200 |
| DELETE | `/api/v1/admin/users/:id` | Delete user | 200 |
| GET | `/api/v1/admin/prompts` | Get all prompts (paginated) | 200 |
| PUT | `/api/v1/admin/prompts/:id` | Update prompt | 200 |
| DELETE | `/api/v1/admin/prompts/:id` | Delete prompt | 200 |
| GET | `/api/v1/admin/categories` | Get all categories | 200 |
| POST | `/api/v1/admin/categories` | Create category | 201 |
| PUT | `/api/v1/admin/categories/:id` | Update category | 200 |
| DELETE | `/api/v1/admin/categories/:id` | Delete category | 200 |
| GET | `/api/v1/admin/generations` | Get all generations (paginated) | 200 |

---

## Platform Statistics

### GET /api/v1/admin/stats

Get comprehensive platform statistics for the admin dashboard.

**Request:**
```bash
curl -X GET https://prompt-studio-0egh.onrender.com/api/v1/admin/stats \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 1250,
      "totalPrompts": 3420,
      "totalGenerations": 8750,
      "totalCategories": 15,
      "publishedPrompts": 3200,
      "unpublishedPrompts": 220,
      "adminUsers": 3,
      "proUsers": 45
    },
    "recentActivity": {
      "newUsersThisWeek": 87,
      "newPromptsThisWeek": 142,
      "generationsThisWeek": 523
    }
  }
}
```

---

## User Management

### GET /api/v1/admin/users

Get all users with pagination and filtering.

**Query Parameters:**
- `page` (number, optional) — Page number (default: 1)
- `limit` (number, optional) — Items per page (default: 20)
- `role` (string, optional) — Filter by role: `user` or `admin`
- `plan` (string, optional) — Filter by plan: `free` or `pro`
- `search` (string, optional) — Search by username or email

**Request:**
```bash
curl -X GET "https://prompt-studio-0egh.onrender.com/api/v1/admin/users?page=1&limit=20&role=user" \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "plan": "free",
      "avatarUrl": "https://res.cloudinary.com/.../avatar.jpg",
      "isVerified": true,
      "createdAt": "2026-03-15T10:30:00.000Z",
      "_count": {
        "prompts": 12,
        "generations": 45,
        "collections": 3
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1250,
    "totalPages": 63
  }
}
```

---

### PUT /api/v1/admin/users/:id/role

Update a user's role.

**URL Parameters:**
- `id` (uuid) — User ID

**Request Body:**
```json
{
  "role": "admin"
}
```

**Valid Roles:** `user`, `admin`

**Request:**
```bash
curl -X PUT https://prompt-studio-0egh.onrender.com/api/v1/admin/users/550e8400-e29b-41d4-a716-446655440000/role \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"role":"admin"}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "admin",
    "plan": "free",
    "createdAt": "2026-03-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` — Invalid role
- `404` — User not found

---

### DELETE /api/v1/admin/users/:id

Delete a user and all associated data (force delete).

**URL Parameters:**
- `id` (uuid) — User ID

**Request:**
```bash
curl -X DELETE https://prompt-studio-0egh.onrender.com/api/v1/admin/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "User deleted successfully"
  }
}
```

**What Gets Deleted:**
- User account
- All user's prompts (and their Cloudinary images)
- All user's collections
- All user's generations
- User's API key
- User's generation quota

**Error Responses:**
- `404` — User not found

---

## Prompt Management

### GET /api/v1/admin/prompts

Get all prompts with pagination and filtering.

**Query Parameters:**
- `page` (number, optional) — Page number (default: 1)
- `limit` (number, optional) — Items per page (default: 20)
- `isPublished` (boolean, optional) — Filter by published status: `true` or `false`
- `categoryId` (number, optional) — Filter by category ID
- `search` (string, optional) — Search by title or prompt text

**Request:**
```bash
curl -X GET "https://prompt-studio-0egh.onrender.com/api/v1/admin/prompts?page=1&limit=20&isPublished=false" \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "title": "Cyberpunk City at Night",
      "prompt": "A futuristic cyberpunk city...",
      "image": "https://res.cloudinary.com/.../prompt.jpg",
      "modelUsed": "imagen-3.0-generate-002",
      "tags": ["cyberpunk", "city", "neon"],
      "totalCopiedCount": 45,
      "totalLikes": 23,
      "isPublished": false,
      "createdAt": "2026-03-20T14:30:00.000Z",
      "updatedAt": "2026-03-20T14:30:00.000Z",
      "author": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "username": "johndoe",
        "email": "john@example.com"
      },
      "category": {
        "id": 5,
        "category": "Cyberpunk",
        "slug": "cyberpunk"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 220,
    "totalPages": 11
  }
}
```

---

### PUT /api/v1/admin/prompts/:id

Update a prompt (admin can edit any prompt).

**URL Parameters:**
- `id` (number) — Prompt ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "prompt": "Updated prompt text",
  "isPublished": true,
  "categoryId": 5,
  "tags": ["tag1", "tag2"]
}
```

**Request:**
```bash
curl -X PUT https://prompt-studio-0egh.onrender.com/api/v1/admin/prompts/123 \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"isPublished":true}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "Updated Title",
    "prompt": "Updated prompt text",
    "image": "https://res.cloudinary.com/.../prompt.jpg",
    "isPublished": true,
    "author": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe"
    },
    "category": {
      "id": 5,
      "category": "Cyberpunk",
      "slug": "cyberpunk"
    }
  }
}
```

**Error Responses:**
- `404` — Prompt not found

---

### DELETE /api/v1/admin/prompts/:id

Delete a prompt (force delete).

**URL Parameters:**
- `id` (number) — Prompt ID

**Request:**
```bash
curl -X DELETE https://prompt-studio-0egh.onrender.com/api/v1/admin/prompts/123 \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Prompt deleted successfully"
  }
}
```

**What Gets Deleted:**
- Prompt record
- Cloudinary image
- All collection items referencing this prompt
- All likes for this prompt
- Category prompt count is decremented

**Error Responses:**
- `404` — Prompt not found

---

## Category Management

### GET /api/v1/admin/categories

Get all categories with full details.

**Request:**
```bash
curl -X GET https://prompt-studio-0egh.onrender.com/api/v1/admin/categories \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category": "Cyberpunk",
      "slug": "cyberpunk",
      "imageUrl": "https://res.cloudinary.com/.../category.jpg",
      "totalPromptsCount": 245,
      "createdAt": "2026-01-10T08:00:00.000Z",
      "_count": {
        "prompts": 245
      }
    }
  ]
}
```

---

### POST /api/v1/admin/categories

Create a new category.

**Request Body:**
```json
{
  "category": "Sci-Fi",
  "slug": "sci-fi",
  "imageUrl": "https://res.cloudinary.com/.../category.jpg"
}
```

**Request:**
```bash
curl -X POST https://prompt-studio-0egh.onrender.com/api/v1/admin/categories \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"category":"Sci-Fi","slug":"sci-fi","imageUrl":"https://..."}'
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 16,
    "category": "Sci-Fi",
    "slug": "sci-fi",
    "imageUrl": "https://res.cloudinary.com/.../category.jpg",
    "totalPromptsCount": 0,
    "createdAt": "2026-03-22T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `409` — Category or slug already exists

---

### PUT /api/v1/admin/categories/:id

Update a category.

**URL Parameters:**
- `id` (number) — Category ID

**Request Body:**
```json
{
  "category": "Updated Name",
  "slug": "updated-slug",
  "imageUrl": "https://..."
}
```

**Request:**
```bash
curl -X PUT https://prompt-studio-0egh.onrender.com/api/v1/admin/categories/16 \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"category":"Updated Name"}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 16,
    "category": "Updated Name",
    "slug": "updated-slug",
    "imageUrl": "https://...",
    "totalPromptsCount": 0,
    "createdAt": "2026-03-22T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `404` — Category not found
- `409` — Category name or slug already exists

---

### DELETE /api/v1/admin/categories/:id

Delete a category.

**URL Parameters:**
- `id` (number) — Category ID

**Request:**
```bash
curl -X DELETE https://prompt-studio-0egh.onrender.com/api/v1/admin/categories/16 \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Category deleted successfully"
  }
}
```

**Error Responses:**
- `404` — Category not found
- `400` — Cannot delete category with existing prompts

**Note:** Categories with prompts cannot be deleted. Reassign or delete prompts first.

---

## Generation Monitoring

### GET /api/v1/admin/generations

Get all user generations with pagination and filtering.

**Query Parameters:**
- `page` (number, optional) — Page number (default: 1)
- `limit` (number, optional) — Items per page (default: 20)
- `userId` (uuid, optional) — Filter by user ID
- `apiKeySource` (string, optional) — Filter by source: `own` or `free`

**Request:**
```bash
curl -X GET "https://prompt-studio-0egh.onrender.com/api/v1/admin/generations?page=1&limit=20" \
  -H "Authorization: Bearer <admin_token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "gen-uuid-123",
      "promptUsed": "A futuristic city...",
      "aspectRatio": "16:9",
      "style": "photorealistic",
      "model": "imagen-3.0-generate-002",
      "apiKeySource": "free",
      "imageUrls": ["https://res.cloudinary.com/.../gen1.jpg"],
      "savedAsPromptId": null,
      "createdAt": "2026-03-22T09:30:00.000Z",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "username": "johndoe",
        "email": "john@example.com"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 8750,
    "totalPages": 438
  }
}
```

---

## Error Responses

All admin endpoints may return these errors:

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authorization token required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User with id \"xyz\" not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Category or slug already exists"
}
```

---

## Security

### Rate Limiting
All admin endpoints are subject to the global rate limiter (applied to all `/api/*` routes).

### Role Verification
The `adminOnly` middleware checks `req.user.role` on every request. Only users with `role: "admin"` can access these endpoints.

### Audit Trail
Consider implementing audit logging for admin actions (user deletions, role changes, content moderation).

---

## Testing Examples

### Test Admin Access
```bash
# Login as admin
curl -X POST https://prompt-studio-0egh.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"adminpass123"}'

# Use returned token for admin endpoints
export ADMIN_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Get platform stats
curl -X GET https://prompt-studio-0egh.onrender.com/api/v1/admin/stats \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Test User Management
```bash
# Get all users
curl -X GET "https://prompt-studio-0egh.onrender.com/api/v1/admin/users?page=1&limit=10" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Update user role
curl -X PUT https://prompt-studio-0egh.onrender.com/api/v1/admin/users/USER_ID/role \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"admin"}'
```

---

*Last updated: March 2026 — PromptStudio v1.0.0*
