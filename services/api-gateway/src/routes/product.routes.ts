import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

router.use('/', (req, res, next) => {
  // Determine if we are coming from /products or /categories
  const isCategory = req.originalUrl.includes('/categories');
  const prefix = isCategory ? '/api/v1/categories' : '/api/v1/products';

  return createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path: string, req: any) => {
      // originalUrl is the full path e.g. /api/v1/products/ping
      // We want to forward it exactly as is to the product service
      return path.startsWith('/api/v1') ? path : `${prefix}${path}`;
    },
    on: {
      error: (err: any, req: any, res: any) => {
        console.error('Proxy Error (Product Service):', err);
      }
    }
  })(req, res, next);
});

export default router;
