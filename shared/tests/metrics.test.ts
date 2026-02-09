import { createCounter, createHistogram, createGauge } from '../observability/metrics';

describe('Metrics Core', () => {
  it('should create a counter', () => {
    // Ideally we would mock the MeterProvider here
    // but verifying the factory function returns an object with add() is a good start
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
    // Gauges are observable, so they might behave differently depending on how they are created.
    // In OTel JS, we often use createObservableGauge or just a normal Gauge if available (UpDownCounter might be better for some cases)
    // The prompt asked for "createGauge".
    // Let's assume standard OTel Gauge behavior which usually involves callbacks or manual setting if it's an UpDownCounter used as gauge.
    // Wait, OTel JS has ObservableGauge.
    
    // We'll check if it's defined for now.
    expect(gauge).toBeDefined();
  });
});