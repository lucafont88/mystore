import { Router } from 'express';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import digitalProductRoutes from './digital-product.routes';
import bundleRoutes from './bundle.routes';

const router: Router = Router();

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/digital-products', digitalProductRoutes);
router.use('/bundles', bundleRoutes);

router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Product Service is alive' });
});

export default router;
