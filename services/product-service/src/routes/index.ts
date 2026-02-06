import { Router } from 'express';

const router: Router = Router();

router.get('/products/ping', (req, res) => {
  res.status(200).json({ message: 'Product Service is alive' });
});

export default router;
