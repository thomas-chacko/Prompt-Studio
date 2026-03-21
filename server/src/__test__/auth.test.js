import request from 'supertest'
import app from '../app.js'

describe('Auth API', () => {
  let authToken
  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'Test123!@#'
  }

  describe('POST /api/v1/auth/signup', () => {
    it('should create a new user account', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .expect(201)

      expect(res.body.success).toBe(true)
      expect(res.body.data.user).toHaveProperty('id')
      expect(res.body.data.user.email).toBe(testUser.email.toLowerCase())
      expect(res.body.data.user.username).toBe(testUser.username)
      expect(res.body.data).toHaveProperty('token')
      expect(res.body.data.user).not.toHaveProperty('passwordHash')

      authToken = res.body.data.token
    })

    it('should reject duplicate email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .expect(409)

      expect(res.body.success).toBe(false)
      expect(res.body.message).toContain('Email already registered')
    })

    it('should reject missing fields', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'test@example.com' })
        .expect(400)

      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should authenticate with valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200)

      expect(res.body.success).toBe(true)
      expect(res.body.data.user.email).toBe(testUser.email.toLowerCase())
      expect(res.body.data).toHaveProperty('token')
    })

    it('should reject invalid password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401)

      expect(res.body.success).toBe(false)
      expect(res.body.message).toContain('Invalid email or password')
    })

    it('should reject non-existent user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401)

      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /api/v1/auth/logout', () => {
    it('should invalidate token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(res.body.success).toBe(true)
      expect(res.body.data.message).toContain('Logged out successfully')
    })

    it('should reject requests with blocklisted token', async () => {
      // Try to use the logged out token
      const res = await request(app)
        .get('/api/v1/user/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(401)

      expect(res.body.success).toBe(false)
    })

    it('should reject logout without token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/logout')
        .expect(401)

      expect(res.body.success).toBe(false)
    })
  })
})
