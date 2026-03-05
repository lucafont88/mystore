import { Router } from 'express';
import authRoutes from './auth.routes';
import adminRoutes from './admin.routes';
import productRoutes from './product.routes';
import shopPageRoutes from './shop-page.routes';
import orderRoutes from './order.routes';
import userDataRoutes from './user-data.routes';

const router: Router = Router();

// Forwarding /api/v1/auth to authRoutes which handles the proxy
router.use('/api/v1/auth', authRoutes);

// Forwarding /api/v1/admin to auth-service (admin user management)
router.use('/api/v1/admin', adminRoutes);

// Forwarding product-service routes
router.use('/api/v1/products', productRoutes);
router.use('/api/v1/categories', productRoutes);
router.use('/api/v1/digital-products', productRoutes);
router.use('/api/v1/bundles', productRoutes);

// Forwarding /api/v1/shop-pages to shopPageRoutes
router.use('/api/v1/shop-pages', shopPageRoutes);

// Forwarding /api/v1/orders to orderRoutes
router.use('/api/v1/orders', orderRoutes);

// Forwarding /api/v1/user-data to user-data-service
router.use('/api/v1/user-data', userDataRoutes);

export default router;
