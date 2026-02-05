import { Router } from 'express';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.use('/', proxy(AUTH_SERVICE_URL, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    // We can intercept/modify response here if needed
    return proxyResData;
  }
}));

export default router;
