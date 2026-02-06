import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.use('/', (req, res, next) => {
  return createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path: string, req: any) => {
      return path.startsWith('/api/v1/auth') ? path : `/api/v1/auth${path}`;
    },
    on: {
      error: (err: any, req: any, res: any) => {
        console.error('Proxy Error (Auth Service):', err);
      }
    }
  })(req, res, next);
});

export default router;