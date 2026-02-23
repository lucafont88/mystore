import { Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

const productProxy = createProxyMiddleware({
  target: PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (reqPath: string, req: any) => {
    const isCategory = req.originalUrl.includes('/categories');
    const prefix = isCategory ? '/api/v1/categories' : '/api/v1/products';
    return reqPath.startsWith('/api/v1') ? reqPath : `${prefix}${reqPath}`;
  },
  on: {
    proxyReq: fixRequestBody,
    error: (err: any, req: any, res: any) => {
      console.error('Proxy Error (Product Service):', err);
    }
  }
});

router.use('/', productProxy);

export default router;
