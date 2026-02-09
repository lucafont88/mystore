import { register, httpRequestsTotal, httpRequestDurationSeconds, httpRequestsInProgress } from '../observability/metrics';

describe('Metrics', () => {
  beforeEach(() => {
    register.resetMetrics();
  });

  it('should have standard HTTP metrics defined', () => {
    expect(httpRequestsTotal).toBeDefined();
    expect(httpRequestDurationSeconds).toBeDefined();
    expect(httpRequestsInProgress).toBeDefined();
  });

  it('should allow incrementing httpRequestsTotal', async () => {
    httpRequestsTotal.inc({ method: 'GET', route: '/test', status_code: '200', service: 'test-service' });
    const metrics = await register.metrics();
    expect(metrics).toContain('http_requests_total{method="GET",route="/test",status_code="200",service="test-service"} 1');
  });
});
