import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Meter, Counter, Histogram, ObservableGauge, MetricOptions, UpDownCounter } from '@opentelemetry/api';
import { ObservabilityConfig } from './types';

let meterProvider: MeterProvider | null = null;
let meter: Meter | null = null;

export interface HttpMetrics {
  requestCounter: Counter;
  durationHistogram: Histogram;
  inProgressCounter: UpDownCounter;
}

export let httpMetrics: HttpMetrics | null = null;

export function initMetrics(config: ObservabilityConfig): MeterProvider {
  const metricExporter = new OTLPMetricExporter({
    url: `${config.otlpEndpoint}/v1/metrics`,
    timeoutMillis: config.reliability?.exportTimeoutMillis || 30000,
  });

  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 60000, // Export every 60s
    exportTimeoutMillis: 30000,
  });

  meterProvider = new MeterProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: config.serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: config.serviceVersion || '1.0.0',
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: config.environment || 'development',
    }),
    readers: [metricReader],
  });

  meter = meterProvider.getMeter(config.serviceName, config.serviceVersion);

  // Initialize standard HTTP metrics
  httpMetrics = {
    requestCounter: meter.createCounter('http_requests_total', {
      description: 'Total number of HTTP requests',
    }),
    durationHistogram: meter.createHistogram('http_request_duration_seconds', {
      description: 'Duration of HTTP requests in seconds',
      unit: 's',
    }),
    inProgressCounter: meter.createUpDownCounter('http_requests_in_progress', {
      description: 'Number of HTTP requests currently in progress',
    }),
  };

  return meterProvider;
}

export function createCounter(name: string, options?: MetricOptions): Counter {
  if (!meter) throw new Error('Metrics not initialized. Call initMetrics first.');
  return meter.createCounter(name, options);
}

export function createHistogram(name: string, options?: MetricOptions): Histogram {
  if (!meter) throw new Error('Metrics not initialized. Call initMetrics first.');
  return meter.createHistogram(name, options);
}

export function createGauge(name: string, options?: MetricOptions): ObservableGauge {
  if (!meter) throw new Error('Metrics not initialized. Call initMetrics first.');
  return meter.createObservableGauge(name, options);
}

export function createUpDownCounter(name: string, options?: MetricOptions): UpDownCounter {
  if (!meter) throw new Error('Metrics not initialized. Call initMetrics first.');
  return meter.createUpDownCounter(name, options);
}