import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('API Gateway Scaffolding', () => {
  it('should return healthy for health check', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.service).toBe('api-gateway');
  });
});
