import express from 'express';
import request from 'supertest';
import { requestLoggerMiddleware } from '../observability/middlewares/requestLogger.middleware';
import { metricsMiddleware } from '../observability/middlewares/metrics.middleware';
import { httpMetrics, initMetrics } from '../observability/metrics';

describe('Express Middlewares', () => {
  let app: express.Application;

  beforeAll(() => {
    // Initialize metrics once
    initMetrics({ 
        serviceName: 'test-service',
        otlpEndpoint: 'http://localhost:4318',
    });
  });

  beforeEach(() => {
    app = express();
    app.use(express.json());
    // We need to attach middlewares
    app.use(metricsMiddleware);
    app.use(requestLoggerMiddleware);
    
    app.get('/test', (req, res) => {
      res.status(200).json({ ok: true });
    });
  });

  it('should attach X-Request-ID and log request', async () => {
    const response = await request(app)
      .get('/test')
      .set('User-Agent', 'supertest');
    
    expect(response.status).toBe(200);
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('should increment request counter', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(httpMetrics?.requestCounter).toBeDefined();
  });
});
