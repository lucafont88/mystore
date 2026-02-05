import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

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
