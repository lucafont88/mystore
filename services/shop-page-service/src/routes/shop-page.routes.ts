import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import shopPageController from '../controllers/shop-page.controller';

const router: ReturnType<typeof Router> = Router();

// Public endpoint
router.get('/public/:slug', shopPageController.getPublicPage.bind(shopPageController));

// Protected endpoints (VENDOR only)
router.post('/', authenticate, authorize(['VENDOR']), shopPageController.create.bind(shopPageController));
router.get('/', authenticate, authorize(['VENDOR']), shopPageController.list.bind(shopPageController));
router.get('/:id', authenticate, authorize(['VENDOR']), shopPageController.getById.bind(shopPageController));
router.put('/:id', authenticate, authorize(['VENDOR']), shopPageController.update.bind(shopPageController));
router.put('/:id/content', authenticate, authorize(['VENDOR']), shopPageController.saveContent.bind(shopPageController));
router.put('/:id/publish', authenticate, authorize(['VENDOR']), shopPageController.publish.bind(shopPageController));
router.put('/:id/unpublish', authenticate, authorize(['VENDOR']), shopPageController.unpublish.bind(shopPageController));
router.delete('/:id', authenticate, authorize(['VENDOR']), shopPageController.delete.bind(shopPageController));

// Product association
router.post('/:id/products', authenticate, authorize(['VENDOR']), shopPageController.addProducts.bind(shopPageController));
router.delete('/:id/products/:productId', authenticate, authorize(['VENDOR']), shopPageController.removeProduct.bind(shopPageController));

export default router;
