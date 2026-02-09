import { Request, Response, NextFunction } from 'express';
import { httpRequestsTotal, httpRequestDurationSeconds, httpRequestsInProgress } from '../metrics';

/**
 * Express middleware that tracks HTTP metrics (total requests, duration, in-progress).
 */
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const start = process.hrtime();
  
  // We use the service name from environment or a default
  const service = process.env.SERVICE_NAME || 'unknown-service';

  httpRequestsInProgress.inc({ service });

  res.on('finish', () => {
    httpRequestsInProgress.dec({ service });

    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;

    // Use req.route.path for normalized route if available, otherwise req.path
    const route = req.route ? req.route.path : req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: res.statusCode.toString(),
      service,
    });

    httpRequestDurationSeconds.observe(
      {
        method: req.method,
        route,
        service,
      },
      durationInSeconds
    );
  });

  next();
};
