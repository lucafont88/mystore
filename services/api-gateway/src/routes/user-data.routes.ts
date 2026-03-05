import { Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const USER_DATA_SERVICE_URL = process.env.USER_DATA_SERVICE_URL || 'http://localhost:3005';

const userDataProxy = createProxyMiddleware({
  target: USER_DATA_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (reqPath: string) => {
    // Express strips the mount prefix (/api/v1/user-data) before the proxy sees the request.
    // reqPath arrives as e.g. '/vendor/profile' — we must re-add '/api/v1'.
    return reqPath.startsWith('/api/v1') ? reqPath : `/api/v1${reqPath}`;
  },
  on: {
    proxyReq: fixRequestBody,
    error: (err: any, _req: any, res: any) => {
      console.error('Proxy Error (User Data Service):', err.message);
    },
  },
});

router.use('/', userDataProxy);

export default router;
