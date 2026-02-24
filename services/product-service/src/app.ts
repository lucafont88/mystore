// IMPORTANTE: initObservability DEVE essere chiamato PRIMA di qualsiasi altro import
import { initObservability, MessagingConnection } from '@ecommerce/shared';

const { logger, middlewares, shutdown } = initObservability({
  serviceName: 'product-service',
  serviceVersion: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://ecommerce-otel-collector:4318',
  logLevel: process.env.LOG_LEVEL || 'info',
});

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { initProductPublisher } from './events/publisher';
import { setupProductValidationResponder } from './events/responder';
import { ensureBucket } from './config/minio';

const app: express.Application = express();
const PORT = process.env.PRODUCT_SERVICE_PORT || 3002;

// Observability Middlewares
app.use(middlewares.metrics);
app.use(middlewares.requestLogger);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger spec endpoint
import swaggerSpec from './config/swagger';
app.get('/api/v1/docs.json', (_req: Request, res: Response) => res.json(swaggerSpec));

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', service: 'product-service', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, async () => {
    logger.info(`Product Service is running on port ${PORT}`);

    // Initialize MinIO bucket
    try {
      await ensureBucket();
      logger.info('MinIO bucket ready');
    } catch (err) {
      logger.warn({ err }, 'MinIO not available, digital file features disabled');
    }

    // Initialize RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    try {
      const mqConnection = new MessagingConnection({ url: rabbitmqUrl }, logger);
      await mqConnection.connect();
      await initProductPublisher(mqConnection, logger);
      await setupProductValidationResponder(mqConnection, logger);
      logger.info('RabbitMQ connected and handlers ready');
    } catch (err) {
      logger.warn({ err }, 'RabbitMQ not available, running without messaging');
    }
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