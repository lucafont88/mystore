// IMPORTANTE: initObservability DEVE essere chiamato PRIMA di qualsiasi altro import
import { initObservability } from '@ecommerce/shared';

const { logger, middlewares, shutdown } = initObservability({
  serviceName: 'api-gateway',
  serviceVersion: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://ecommerce-otel-collector:4318',
  logLevel: process.env.LOG_LEVEL || 'info',
});

import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const app: express.Application = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

// Security
app.use(helmet());
app.use(cors());

// Observability Middlewares
app.use(middlewares.requestLogger);
app.use(middlewares.metrics);

// Proxy routes MUST be mounted BEFORE body parsers.
// express.json() consumes the request stream, making it unavailable
// for http-proxy-middleware to forward to downstream services.
app.use(routes);

// Body parsing (only for non-proxied routes like health check)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'api-gateway', 
    timestamp: new Date().toISOString() 
  });
});

// Graceful shutdown
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    logger.info(`API Gateway started on port ${PORT}`);
  });

  process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(async () => {
      await shutdown();
      process.exit(0);
    });
  });
}

export default app;