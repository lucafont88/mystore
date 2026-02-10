import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'pino';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      log: Logger;
      requestId: string;
    }
  }
}

/**
 * Middleware that attaches a request ID and child logger to the request object.
 * Logs the incoming request and the response completion status.
 */
export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = (req.headers['x-request-id'] as string) || uuidv4();
  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  // Attach logger to request with context
  req.log = logger.child({ requestId });

  // Log incoming request
  req.log.debug({
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
  }, 'Incoming request');

  const start = process.hrtime();

  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationMs = (duration[0] * 1000) + (duration[1] / 1e6);

    req.log.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${durationMs.toFixed(3)}ms`,
    }, 'Request completed');
  });

  next();
};
