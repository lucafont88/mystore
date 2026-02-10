import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { trace, context, Tracer, Span } from '@opentelemetry/api';
import { ObservabilityConfig } from './types';

let sdk: NodeSDK | null = null;

export function initTracing(config: ObservabilityConfig): NodeSDK {
  const traceExporter = new OTLPTraceExporter({
    url: `${config.otlpEndpoint}/v1/traces`,
    timeoutMillis: config.reliability?.exportTimeoutMillis || 30000,
  });

  sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: config.serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: config.serviceVersion || '1.0.0',
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: config.environment || 'development',
    }),
    traceExporter,
    spanProcessor: new BatchSpanProcessor(traceExporter, {
      // ⭐ High Reliability Configuration
      maxQueueSize: config.reliability?.maxQueueSize || 2048,
      maxExportBatchSize: config.reliability?.maxExportBatchSize || 512,
      scheduledDelayMillis: config.reliability?.scheduledDelayMillis || 5000,
      exportTimeoutMillis: config.reliability?.exportTimeoutMillis || 30000,
    }),
    instrumentations: [
      getNodeAutoInstrumentations({
        // Disable fs instrumentation by default to reduce noise, enable others
        '@opentelemetry/instrumentation-fs': { enabled: false },
        '@opentelemetry/instrumentation-express': { enabled: true },
        '@opentelemetry/instrumentation-http': { enabled: true },
        '@opentelemetry/instrumentation-pg': { enabled: true },
        '@opentelemetry/instrumentation-ioredis': { enabled: true },
        '@opentelemetry/instrumentation-amqplib': { enabled: true },
      }),
    ],
  });

  sdk.start();
  
  // Handle graceful shutdown
  process.on('SIGTERM', async () => {
    try {
      await sdk?.shutdown();
      console.log('Tracing terminated');
    } catch (error) {
      console.log('Error terminating tracing', error);
    }
  });

  return sdk;
}

export function getTracer(name: string, version?: string): Tracer {
  return trace.getTracer(name, version);
}

export function getActiveSpan(): Span | undefined {
  return trace.getSpan(context.active());
}

export function createSpan<T>(name: string, fn: (span: Span) => T): T {
  const tracer = trace.getTracer('default');
  return tracer.startActiveSpan(name, (span) => {
    try {
      return fn(span);
    } finally {
      span.end();
    }
  });
}