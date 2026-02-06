import request from 'supertest';
import app from '../app';

describe('App Scaffolding', () => {
  it('should return UP for health check', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
    expect(res.body.service).toBe('product-service');
  });

  it('should return 200 for ping', async () => {
    const res = await request(app).get('/api/v1/products/ping');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Product Service is alive');
  });
});
