import { Router } from 'express';
import bundleController from '../controllers/bundle.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

// Public routes
router.get('/', bundleController.list);
router.get('/:id', bundleController.getById);

// Protected routes
router.post('/', authenticate, authorize(['VENDOR']), bundleController.create);
router.put('/:id', authenticate, authorize(['VENDOR']), bundleController.update);
router.delete('/:id', authenticate, authorize(['VENDOR']), bundleController.delete);

export default router;
