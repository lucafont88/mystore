import { Router } from 'express';
import orderRoutes from './order.routes';

const router: Router = Router();

router.use('/orders', orderRoutes);

router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Order Service is alive' });
});

export default router;
