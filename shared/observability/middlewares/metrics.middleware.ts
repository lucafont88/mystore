import { Request, Response, NextFunction } from 'express';
import { httpMetrics } from '../metrics';

/**
 * Middleware that collects HTTP metrics (requests count, duration, in-progress).
 */
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!httpMetrics) {
    // Metrics not initialized, skip
    next();
    return;
  }

  const start = process.hrtime();
  
  // Use route path if available (normalized), otherwise fall back to path
  // NOTE: req.route is only available AFTER the request is handled, 
  // so we might need to rely on 'finish' event to get the correct route.
  // However, capturing it here ensures we start timing early.
  
  // Increment in-progress counter
  httpMetrics.inProgressCounter.add(1, { 
    method: req.method,
    // We don't have the route yet, maybe skip or use 'unknown'
  });

  res.on('finish', () => {
    httpMetrics?.inProgressCounter.add(-1, { 
        method: req.method 
    });

    const duration = process.hrtime(start);
    const durationSeconds = duration[0] + duration[1] / 1e9;

    // Try to get normalized route
    let route = req.route ? req.route.path : req.path;
    
    // Fallback normalization logic if needed (e.g. replace IDs)
    // For now, rely on Express route path which usually contains :id
    if (!route) route = 'unknown';

    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode.toString(),
    };

    httpMetrics?.requestCounter.add(1, labels);
    httpMetrics?.durationHistogram.record(durationSeconds, labels);
  });

  next();
};
