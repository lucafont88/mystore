import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.use('/', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^': '/api/v1/auth', // Prepend /api/v1/auth because Express strips the mount path
  },
  on: {
    proxyReq: (proxyReq, req, res) => {
      // Logic for request
    },
    error: (err, req, res) => {
      console.error('Proxy Error:', err);
    }
  }
}));

export default router;