import { describe, it, expect, beforeAll } from 'vitest';
import { createCounter, createHistogram, createGauge, initMetrics } from '../observability/metrics';

describe('Metrics Core', () => {
  beforeAll(() => {
    initMetrics({
      serviceName: 'test-service',
      otlpEndpoint: 'http://localhost:4318',
    });
  });

  it('should create a counter', () => {
    const counter = createCounter('test_counter', { description: 'test' });
    expect(counter).toBeDefined();
    expect(typeof counter.add).toBe('function');
  });

  it('should create a histogram', () => {
    const histogram = createHistogram('test_histogram');
    expect(histogram).toBeDefined();
    expect(typeof histogram.record).toBe('function');
  });

  it('should create a gauge', () => {
    const gauge = createGauge('test_gauge');
    expect(gauge).toBeDefined();
  });
});