import { Router } from 'express';
import digitalProductController from '../controllers/digital-product.controller';
import licenseKeyController from '../controllers/license-key.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router: Router = Router();

// All digital product routes require VENDOR auth
router.post('/', authenticate, authorize(['VENDOR']), upload.single('file'), digitalProductController.create);
router.put('/:id', authenticate, authorize(['VENDOR']), digitalProductController.update);
router.post('/:id/file', authenticate, authorize(['VENDOR']), upload.single('file'), digitalProductController.uploadFile);
router.get('/:id/download', authenticate, digitalProductController.getDownloadUrl);

// License key management
router.post('/:id/license-keys', authenticate, authorize(['VENDOR']), licenseKeyController.addKeys);
router.get('/:id/license-keys', authenticate, authorize(['VENDOR']), licenseKeyController.getKeys);
router.delete('/:id/license-keys/:keyId', authenticate, authorize(['VENDOR']), licenseKeyController.deleteKey);

export default router;
