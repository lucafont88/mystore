import { Router } from 'express';
import productRoutes from './product.routes';

const router: Router = Router();

router.use('/products', productRoutes);

router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Product Service is alive' });
});

export default router;
