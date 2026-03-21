# Authentication API Documentation

Base URL: `https://prompt-studio-0egh.onrender.com/api/v1/auth`

## Endpoints

### 1. Signup

Create a new user account.

**Endpoint:** `POST /api/v1/auth/signup`  
**Auth Required:** No

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "avatarUrl": null,
      "bio": null,
      "plan": "free",
      "isVerified": false,
      "createdAt": "2026-03-21T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - Email already registered or username already taken

---

### 2. Login

Authenticate existing user.

**Endpoint:** `POST /api/v1/auth/login`  
**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "avatarUrl": null,
      "bio": null,
      "plan": "free",
      "isVerified": false,
      "createdAt": "2026-03-21T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid email or password

---

### 3. Logout

Invalidate current JWT token.

**Endpoint:** `POST /api/v1/auth/logout`  
**Auth Required:** Yes

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

**Error Responses:**
- `401` - Missing, invalid, or expired token

---

## Authentication Flow

### Client-Side Token Storage

After successful signup or login, store the JWT token:

```javascript
// Store token
localStorage.setItem('token', data.token)

// Include in subsequent requests
fetch('/api/v1/prompts', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### Token Payload

The JWT contains:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "role": "user",
  "iat": 1711015800,
  "exp": 1711620600
}
```

### Protected Routes

All routes requiring authentication will return `401` if:
- Token is missing
- Token is invalid or expired
- Token has been logged out (blocklisted)

### Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT signed with HS256 algorithm
- Tokens expire after 7 days (configurable)
- Logout blocklist prevents token reuse
- Email normalized to lowercase
- No password returned in any response
- Admin role cannot be set via API

---

## Example Usage

### JavaScript/Fetch
```javascript
// Signup
const signupResponse = await fetch('https://prompt-studio-0egh.onrender.com/api/v1/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
})
const { data } = await signupResponse.json()
const token = data.token

// Login
const loginResponse = await fetch('https://prompt-studio-0egh.onrender.com/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
})

// Logout
await fetch('https://prompt-studio-0egh.onrender.com/api/v1/auth/logout', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
})
```

### cURL
```bash
# Signup
curl -X POST https://prompt-studio-0egh.onrender.com/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"SecurePass123!"}'

# Login
curl -X POST https://prompt-studio-0egh.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'

# Logout
curl -X POST https://prompt-studio-0egh.onrender.com/api/v1/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
