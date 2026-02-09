import { initObservability } from '@ecommerce/shared';
const { metricsHandler, middlewares } = initObservability('auth-service');

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const app: express.Application = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3001;

// Observability Middlewares
app.use(middlewares.metricsMiddleware);
app.use(middlewares.requestLogger);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Metrics endpoint
app.get('/metrics', metricsHandler);

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', service: 'auth-service', timestamp: new Date().toISOString() });
});

// Root API path
app.get('/api/v1/auth', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Auth Service API v1' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
  });
}

export default app;
