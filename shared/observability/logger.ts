import pino, { Logger } from 'pino';
import * as api from '@opentelemetry/api';

/**
 * Pino Logger configured with OpenTelemetry context correlation.
 */
export const logger: Logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
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
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(process.env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
});
