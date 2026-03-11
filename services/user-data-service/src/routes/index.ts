import { Router } from 'express';
import express from 'express';
import vendorProfileController from '../controllers/vendorProfile.controller';
import stripeIdentityController from '../controllers/stripeIdentity.controller';
import adminVendorProfileController from '../controllers/adminVendorProfile.controller';
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

/**
 * POST /api/v1/vendor/identity/session
 * Creates a Stripe Identity verification session for the authenticated vendor
 */
router.post(
  '/vendor/identity/session',
  authenticate,
  authorize(['VENDOR']),
  stripeIdentityController.createSession.bind(stripeIdentityController)
);

/**
 * GET /api/v1/vendor/identity/status
 * Polls Stripe API to check current verification status for the authenticated vendor
 */
router.get(
  '/vendor/identity/status',
  authenticate,
  authorize(['VENDOR']),
  stripeIdentityController.pollStatus.bind(stripeIdentityController)
);

/**
 * POST /api/v1/stripe/webhook
 * Receives Stripe webhook events (no auth, raw body required)
 */
router.post(
  '/stripe/webhook',
  express.raw({ type: '*/*' }),
  stripeIdentityController.webhook.bind(stripeIdentityController)
);

/**
 * GET /api/v1/user-data/admin/vendor-profile/:userId
 * Returns the VendorProfile for the given userId (admin only)
 */
router.get(
  '/admin/vendor-profile/:userId',
  authenticate,
  authorize(['ADMIN']),
  adminVendorProfileController.getVendorProfile.bind(adminVendorProfileController)
);

/**
 * PUT /api/v1/user-data/admin/vendor-profile/:userId/identity-status
 * Updates identityStatus; if VERIFIED also publishes identity.verified event (admin only)
 */
router.put(
  '/admin/vendor-profile/:userId/identity-status',
  authenticate,
  authorize(['ADMIN']),
  adminVendorProfileController.setIdentityStatus.bind(adminVendorProfileController)
);

export default router;
