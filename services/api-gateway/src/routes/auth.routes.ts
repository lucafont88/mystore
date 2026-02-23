import { Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

const authProxy = createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (reqPath: string) => {
    return reqPath.startsWith('/api/v1/auth') ? reqPath : `/api/v1/auth${reqPath}`;
  },
  on: {
    proxyReq: fixRequestBody,
    error: (err: any, req: any, res: any) => {
      console.error('Proxy Error (Auth Service):', err.message);
    }
  }
});

router.use('/', authProxy);

export default router;
