import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import shopPageRoutes from './shop-page.routes';

const router: Router = Router();

// Forwarding /api/v1/auth to authRoutes which handles the proxy
router.use('/api/v1/auth', authRoutes);

// Forwarding /api/v1/products and /api/v1/categories to productRoutes
router.use('/api/v1/products', productRoutes);
router.use('/api/v1/categories', productRoutes);

// Forwarding /api/v1/shop-pages to shopPageRoutes
router.use('/api/v1/shop-pages', shopPageRoutes);

export default router;
