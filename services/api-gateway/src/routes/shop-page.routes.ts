import { Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const router: Router = Router();
const SHOP_PAGE_SERVICE_URL = process.env.SHOP_PAGE_SERVICE_URL || 'http://localhost:3003';

const shopPageProxy = createProxyMiddleware({
  target: SHOP_PAGE_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (reqPath: string) => {
    return reqPath.startsWith('/api/v1') ? reqPath : `/api/v1/shop-pages${reqPath}`;
  },
  on: {
    proxyReq: fixRequestBody,
    error: (err: any, req: any, res: any) => {
      console.error('Proxy Error (Shop Page Service):', err);
    }
  }
});

router.use('/', shopPageProxy);

export default router;
