import express from 'express';
import request from 'supertest';
import { requestLogger } from '../observability/middlewares/requestLogger';
import { metricsMiddleware } from '../observability/middlewares/metricsMiddleware';
import { register } from '../observability/metrics';

describe('Middlewares', () => {
  let app: express.Application;

  beforeEach(() => {
    register.resetMetrics();
    app = express();
    app.use(express.json());
    app.use(metricsMiddleware);
    app.use(requestLogger);
    
    app.get('/test/:id', (req, res) => {
      res.status(200).json({ ok: true });
    });
  });

  it('should propagate X-Request-ID and log request', async () => {
    const response = await request(app)
      .get('/test/123')
      .set('X-Request-ID', 'custom-id');
    
    expect(response.status).toBe(200);
    expect(response.headers['x-request-id']).toBe('custom-id');
  });

  it('should track metrics for the request', async () => {
    await request(app).get('/test/123');
    
    const metrics = await register.metrics();
    expect(metrics).toContain('http_requests_total');
    // Ensure route is normalized
    expect(metrics).toContain('route="/test/:id"');
  });
});
