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
    const url = req.originalUrl;
    let prefix = '/api/v1/products';
    if (url.includes('/categories')) prefix = '/api/v1/categories';
    else if (url.includes('/digital-products')) prefix = '/api/v1/digital-products';
    else if (url.includes('/bundles')) prefix = '/api/v1/bundles';
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
