import { Router } from 'express';
import proxyMiddleware from '../middlewares/proxy.middleware';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.use('/', proxyMiddleware);

export default router;