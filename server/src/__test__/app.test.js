import request from 'supertest';
import app from '../app.js';

describe('App Health Check', () => {
  test('GET / should return 200 and a valid response', async () => {
    const response = await request(app).get('/');

    // ✅ Check status
    expect(response.status).toBe(200);

    // ✅ Check content type (optional but good)
    expect(response.headers['content-type']).toMatch(/json/);

    // ✅ Check response structure
    expect(response.body).toHaveProperty('message');

    // ✅ Exact match (if you return this)
    expect(response.body.message).toBe('Welcome to PromptStudio API');
  });
});