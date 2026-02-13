// IMPORTANTE: initObservability DEVE essere chiamato PRIMA di qualsiasi altro import
import { initObservability, MessagingConnection } from '@ecommerce/shared';

const { logger, middlewares, shutdown } = initObservability({
  serviceName: 'shop-page-service',
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
import { ensureBucket } from './config/minio';
import { setupProductEventConsumer } from './events/consumer';
import { initPublisher } from './events/publisher';

const app: express.Application = express();
const PORT = process.env.SHOP_PAGE_SERVICE_PORT || 3003;

// Observability Middlewares
app.use(middlewares.metrics);
app.use(middlewares.requestLogger);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', service: 'shop-page-service', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, async () => {
    logger.info(`Shop Page Service is running on port ${PORT}`);

    // Initialize MinIO bucket
    try {
      await ensureBucket();
      logger.info('MinIO bucket ready');
    } catch (err) {
      logger.error({ err }, 'Failed to initialize MinIO bucket');
    }

    // Initialize RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    try {
      const mqConnection = new MessagingConnection({ url: rabbitmqUrl }, logger);
      await mqConnection.connect();

      initPublisher(mqConnection, 'shop-page-service', logger);
      await setupProductEventConsumer(mqConnection, logger);

      logger.info('RabbitMQ connected and consumers ready');

      process.on('SIGTERM', async () => {
        logger.info('SIGTERM received, shutting down gracefully');
        await mqConnection.close();
        server.close(async () => {
          await shutdown();
          process.exit(0);
        });
      });
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
