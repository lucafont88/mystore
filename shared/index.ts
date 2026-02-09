export * from './observability/tracing';
export * from './observability/logger';
export * from './observability/metrics';
export * from './observability/middlewares/requestLogger';
export * from './observability/middlewares/metricsMiddleware';

import { initTracing } from './observability/tracing';
import { logger } from './observability/logger';
import { metricsHandler } from './observability/metrics';
import { requestLogger } from './observability/middlewares/requestLogger';
import { metricsMiddleware } from './observability/middlewares/metricsMiddleware';

/**
 * Initializes the full observability stack for a service.
 * @param serviceName - The name of the service (e.g., 'auth-service').
 * @returns An object containing the observability components.
 */
export function initObservability(serviceName: string) {
  process.env.SERVICE_NAME = serviceName;
  
  const sdk = initTracing(serviceName);

  return {
    logger,
    metricsHandler,
    middlewares: {
      requestLogger,
      metricsMiddleware,
    },
    sdk,
  };
}
