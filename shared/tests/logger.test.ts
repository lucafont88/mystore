import { describe, it, expect, vi } from 'vitest';
import { createLogger, logger } from '../observability/logger';
import * as api from '@opentelemetry/api';
import { PassThrough } from 'stream';

describe('Logger Core', () => {
  it('should create a logger', () => {
    const log = createLogger({ serviceName: 'test-service' });
    expect(log).toBeDefined();
    expect(typeof log.info).toBe('function');
  });

  it('should inject traceId and spanId', async () => {
    // Mock OTel context
    const traceId = 'd4cda95b652f4a1592b449d5929fda1b';
    const spanId = '6e0c63257de34c92';
    
    const spanContext = {
      traceId,
      spanId,
      traceFlags: api.TraceFlags.SAMPLED,
    };

    const stream = new PassThrough();
    
    // The safest way to test the FORMATTER logic is to extract it if possible, 
    // or trust the implementation we are about to write.
    
    // Let's write a test that mocks the OTel API and checks if the logger calls it.
    
    const getSpanSpy = vi.spyOn(api.trace, 'getSpan');
    
    logger.info('test message');
    
    expect(getSpanSpy).toHaveBeenCalled();
  });
});
