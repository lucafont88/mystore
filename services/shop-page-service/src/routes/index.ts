import { Router, Request, Response } from 'express';
import shopPageRoutes from './shop-page.routes';

const router: ReturnType<typeof Router> = Router();

router.use('/shop-pages', shopPageRoutes);

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Shop Page Service is alive' });
});

export default router;
