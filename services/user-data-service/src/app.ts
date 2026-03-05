// IMPORTANTE: initObservability DEVE essere chiamato PRIMA di qualsiasi altro import
import { initObservability, MessagingConnection } from '@ecommerce/shared';

const { logger, middlewares, shutdown } = initObservability({
  serviceName: 'user-data-service',
  serviceVersion: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://ecommerce-otel-collector:4318',
  logLevel: process.env.LOG_LEVEL || 'info',
});

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { initProfileCompletedPublisher } from './events/profileCompletedPublisher';
import { setupVendorRegisteredConsumer } from './events/vendorRegisteredConsumer';

const app: express.Application = express();
const PORT = process.env.USER_DATA_SERVICE_PORT || 3005;

// Observability Middlewares
app.use(middlewares.metrics);
app.use(middlewares.requestLogger);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', service: 'user-data-service', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, async () => {
    logger.info(`User Data Service is running on port ${PORT}`);

    // Initialize RabbitMQ messaging
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    try {
      const mqConnection = new MessagingConnection({ url: rabbitmqUrl }, logger);
      await mqConnection.connect();
      await initProfileCompletedPublisher(mqConnection, logger);
      await setupVendorRegisteredConsumer(mqConnection, logger);
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
