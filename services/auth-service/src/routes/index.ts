import { Router } from 'express';
import authRoutes from './auth.routes';
import adminUserRoutes from './adminUser.routes';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/admin/users', adminUserRoutes);

export default router;
