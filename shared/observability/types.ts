import { Logger } from 'pino';
import { Tracer, Meter } from '@opentelemetry/api';
import { RequestHandler } from 'express';

export interface ObservabilityConfig {
  serviceName: string;
  serviceVersion?: string;
  environment?: string;
  otlpEndpoint?: string;  // default: http://otel-collector:4318
  logLevel?: string;      // default: info
  
  // ⭐ Reliability options
  reliability?: {
    // Batch processing
    maxQueueSize?: number;        // default: 2048
    maxExportBatchSize?: number;  // default: 512
    scheduledDelayMillis?: number; // default: 5000
    exportTimeoutMillis?: number;  // default: 30000
    
    // Retry (for metrics exporter if applicable via OTLP config)
    maxRetries?: number;          // default: 5
    initialRetryDelayMillis?: number; // default: 1000
    maxRetryDelayMillis?: number; // default: 30000
  };
}

export interface ObservabilityComponents {
  logger: Logger;
  tracer: Tracer;
  meter: Meter;
  middlewares: {
    requestLogger: RequestHandler;
    metrics: RequestHandler;
  };
  shutdown: () => Promise<void>;
}

export interface SpanOptions {
  kind?: any; // To be typed properly with OTel types
  attributes?: Record<string, any>;
}
