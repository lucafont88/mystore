import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const SHOP_PAGE_SERVICE_URL = process.env.SHOP_PAGE_SERVICE_URL || 'http://localhost:3003';

router.use('/', (req, res, next) => {
  return createProxyMiddleware({
    target: SHOP_PAGE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path: string, req: any) => {
      return path.startsWith('/api/v1') ? path : `/api/v1/shop-pages${path}`;
    },
    on: {
      error: (err: any, req: any, res: any) => {
        console.error('Proxy Error (Shop Page Service):', err);
      }
    }
  })(req, res, next);
});

export default router;
