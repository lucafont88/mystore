import { initObservability } from '@ecommerce/shared';
const { metricsHandler, middlewares } = initObservability('api-gateway');

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const app: express.Application = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

// Observability Middlewares
app.use(middlewares.metricsMiddleware);
app.use(middlewares.requestLogger);

// Middlewares
app.use(helmet());
app.use(cors());

// Routes
app.use(routes);

app.use(express.json());

// Metrics endpoint
app.get('/metrics', metricsHandler);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', service: 'api-gateway', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});

export default app;
