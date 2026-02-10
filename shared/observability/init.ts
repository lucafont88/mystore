import { ObservabilityConfig, ObservabilityComponents } from './types';
import { initTracing, getTracer } from './tracing';
import { initMetrics } from './metrics';
import { createLogger, setGlobalLogger, logger } from './logger';
import { requestLoggerMiddleware, metricsMiddleware } from './middlewares';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';

/**
 * Initializes the full observability stack (Tracing -> Metrics -> Logging).
 * MUST be called before any other imports in the application.
 */
export function initObservability(config: ObservabilityConfig): ObservabilityComponents {
  // 1. Initialize Tracing FIRST (to ensure auto-instrumentation works)
  const sdk: NodeSDK = initTracing(config);

  // 2. Initialize Metrics
  const meterProvider: MeterProvider = initMetrics(config);
  const meter = meterProvider.getMeter(config.serviceName, config.serviceVersion);

  // 3. Initialize Logger
  const log = createLogger(config);
  setGlobalLogger(log);

  // 4. Return components
  return {
    logger: log,
    tracer: getTracer(config.serviceName, config.serviceVersion),
    meter,
    middlewares: {
      requestLogger: requestLoggerMiddleware,
      metrics: metricsMiddleware,
    },
    shutdown: async () => {
      log.info('Shutting down observability...');
      try {
        await meterProvider.shutdown();
        await sdk.shutdown();
        log.info('Observability shutdown complete');
      } catch (err) {
        log.error({ err }, 'Error during observability shutdown');
      }
    },
  };
}
