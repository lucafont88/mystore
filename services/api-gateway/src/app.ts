import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const app: express.Application = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use(routes);

app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', service: 'api-gateway', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});

export default app;
