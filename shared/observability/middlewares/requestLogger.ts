import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'pino';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      log: Logger;
      id: string;
    }
  }
}

/**
 * Express middleware that attaches a unique Request ID and a Pino child logger to each request.
 * Logs the request completion status and duration.
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = (req.headers['x-request-id'] as string) || uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);

  // Attach logger to request with context
  req.log = logger.child({ requestId });

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    req.log.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'],
    }, 'Request completed');
  });

  next();
};
