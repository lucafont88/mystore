import { Registry, Counter, Histogram, Gauge, collectDefaultMetrics, CounterConfiguration, HistogramConfiguration, GaugeConfiguration } from 'prom-client';
import { Request, Response } from 'express';

export const register = new Registry();

collectDefaultMetrics({ register });

export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'service'],
  registers: [register],
});

export const httpRequestDurationSeconds = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'service'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  registers: [register],
});

export const httpRequestsInProgress = new Gauge({
  name: 'http_requests_in_progress',
  help: 'Number of HTTP requests currently in progress',
  labelNames: ['service'],
  registers: [register],
});

/**
 * Creates a new business metric and registers it to the global registry.
 * @param type - The type of metric (Counter, Histogram, Gauge).
 * @param config - The metric configuration.
 */
export function createBusinessMetric(type: 'Counter' | 'Histogram' | 'Gauge', config: CounterConfiguration<string> | HistogramConfiguration<string> | GaugeConfiguration<string>): any {
  const metricConfig = { ...config, registers: [register] };
  switch (type) {
    case 'Counter':
      return new Counter(metricConfig as CounterConfiguration<string>);
    case 'Histogram':
      return new Histogram(metricConfig as HistogramConfiguration<string>);
    case 'Gauge':
      return new Gauge(metricConfig as GaugeConfiguration<string>);
    default:
      throw new Error(`Unsupported metric type: ${type}`);
  }
}

/**
 * Express handler for the /metrics endpoint.
 */
export const metricsHandler = async (_req: Request, res: Response): Promise<void> => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};
