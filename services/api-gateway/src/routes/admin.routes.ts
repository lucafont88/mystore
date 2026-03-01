import { Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

const adminProxy = createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (reqPath: string) => `/api/v1/admin${reqPath}`,
  on: {
    proxyReq: fixRequestBody,
    error: (err: any, req: any, res: any) => {
      console.error('Proxy Error (Auth Service - Admin):', err.message);
    }
  }
});

router.use('/', adminProxy);

export default router;
