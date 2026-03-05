import { Router } from 'express';
import vendorProfileController from '../controllers/vendorProfile.controller';
import { vendorProfileValidator } from '../validators/vendorProfile.validator';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router: Router = Router();

/**
 * GET /api/v1/vendor/profile
 * Returns the current vendor's profile
 */
router.get(
  '/vendor/profile',
  authenticate,
  authorize(['VENDOR']),
  vendorProfileController.getProfile.bind(vendorProfileController)
);

/**
 * PUT /api/v1/vendor/profile
 * Create or update the vendor's profile (triggers profile.completed event on success)
 */
router.put(
  '/vendor/profile',
  authenticate,
  authorize(['VENDOR']),
  vendorProfileValidator,
  vendorProfileController.upsertProfile.bind(vendorProfileController)
);

export default router;
