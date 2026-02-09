const pino = require('pino');
const api = require('@opentelemetry/api');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label };
    },
    log(object) {
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

module.exports = { logger };
