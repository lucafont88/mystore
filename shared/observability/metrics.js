const { Registry, Counter, Histogram, Gauge, collectDefaultMetrics } = require('prom-client');

const register = new Registry();

collectDefaultMetrics({ register });

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'service'],
  registers: [register],
});

const httpRequestDurationSeconds = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'service'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  registers: [register],
});

const httpRequestsInProgress = new Gauge({
  name: 'http_requests_in_progress',
  help: 'Number of HTTP requests currently in progress',
  labelNames: ['service'],
  registers: [register],
});

function createBusinessMetric(type, config) {
  const metricConfig = { ...config, registers: [register] };
  switch (type) {
    case 'Counter':
      return new Counter(metricConfig);
    case 'Histogram':
      return new Histogram(metricConfig);
    case 'Gauge':
      return new Gauge(metricConfig);
    default:
      throw new Error(`Unsupported metric type: ${type}`);
  }
}

const metricsHandler = async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

module.exports = {
  register,
  httpRequestsTotal,
  httpRequestDurationSeconds,
  httpRequestsInProgress,
  createBusinessMetric,
  metricsHandler,
};
