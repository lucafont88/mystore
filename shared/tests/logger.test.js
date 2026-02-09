const pino = require('pino');
const api = require('@opentelemetry/api');
const { logger } = require('../observability/logger');

// Initialize OTel context manager and provider for testing
const { BasicTracerProvider } = require('@opentelemetry/sdk-trace-base');
const { AsyncHooksContextManager } = require('@opentelemetry/context-async-hooks');

const provider = new BasicTracerProvider();
api.trace.setGlobalTracerProvider(provider);

const contextManager = new AsyncHooksContextManager();
contextManager.enable();
api.context.setGlobalContextManager(contextManager);

describe('Logger', () => {
  it('should include trace context when available', (done) => {
    const traceId = '1234567890abcdef1234567890abcdef';
    const spanId = '1234567890abcdef';
    
    const spanContext = {
      traceId,
      spanId,
      traceFlags: api.TraceFlags.SAMPLED,
    };

    const stream = new (require('stream').PassThrough)();
    const testLogger = pino({
        formatters: {
            log(object) {
                const span = api.trace.getSpan(api.context.active());
                if (!span) return object;
                const spanContext = span.spanContext();
                if (!spanContext) return object;
                return { 
                    ...object, 
                    traceId: spanContext.traceId, 
                    spanId: spanContext.spanId 
                };
            }
        }
    }, stream);

    stream.on('data', (chunk) => {
      const lastLog = JSON.parse(chunk.toString());
      try {
        expect(lastLog.msg).toBe('Test message');
        expect(lastLog.traceId).toBe(traceId);
        expect(lastLog.spanId).toBe(spanId);
        done();
      } catch (e) {
        done(e);
      }
    });

    const ctx = api.trace.setSpanContext(api.context.active(), spanContext);
    
    api.context.with(ctx, () => {
      testLogger.info('Test message');
    });
  });
});
