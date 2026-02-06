import { Router } from 'express';
import categoryController from '../controllers/category.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

// Public routes
router.get('/', categoryController.list);
router.get('/:id', categoryController.getById);

// Admin routes
router.post('/', authenticate, authorize(['ADMIN']), categoryController.create);
router.put('/:id', authenticate, authorize(['ADMIN']), categoryController.update);
router.delete('/:id', authenticate, authorize(['ADMIN']), categoryController.delete);

export default router;
