import { Router } from 'express';
import productController from '../controllers/product.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

// Public routes
router.get('/', productController.list);
router.get('/:id', productController.getById);

// Protected routes
router.post('/', authenticate, authorize(['VENDOR', 'ADMIN']), productController.create);
router.put('/:id', authenticate, authorize(['VENDOR', 'ADMIN']), productController.update);
router.delete('/:id', authenticate, authorize(['VENDOR', 'ADMIN']), productController.delete);

export default router;
