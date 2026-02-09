import pino, { Logger, LoggerOptions } from 'pino';
import * as api from '@opentelemetry/api';
import { ObservabilityConfig } from './types';

export { Logger, LoggerOptions };

export interface LogContext {
  timestamp: string;
  level: string;
  message: string;
  service: string;
  traceId?: string;
  spanId?: string;
  requestId?: string;
  [key: string]: unknown;
}

const formatters = {
  level: (label: string) => {
    return { level: label };
  },
  log(object: Record<string, unknown>) {
    const span = api.trace.getSpan(api.context.active());
    if (!span) return object;

    const spanContext = span.spanContext();
    if (!spanContext) return object;

    return {
      ...object,
      traceId: spanContext.traceId,
      spanId: spanContext.spanId,
    };
  },
};

/**
 * Creates a configured Pino logger instance.
 */
export function createLogger(config: Partial<ObservabilityConfig>): Logger {
  return pino({
    level: config.logLevel || 'info',
    formatters,
    timestamp: pino.stdTimeFunctions.isoTime,
    base: {
      service: config.serviceName,
      env: config.environment,
    },
    ...(process.env.NODE_ENV === 'development' && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    }),
  });
}

// Default logger instance (can be replaced by initObservability)
export let logger: Logger = createLogger({
  serviceName: process.env.OTEL_SERVICE_NAME || 'unknown-service',
  logLevel: process.env.LOG_LEVEL || 'info',
});

// Allow updating the default logger
export function setGlobalLogger(newLogger: Logger) {
  logger = newLogger;
}