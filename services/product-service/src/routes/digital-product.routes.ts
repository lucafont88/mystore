import { Router } from 'express';
import digitalProductController from '../controllers/digital-product.controller';
import licenseKeyController from '../controllers/license-key.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router: Router = Router();

/**
 * @swagger
 * /api/v1/digital-products:
 *   post:
 *     tags: [Digital Products]
 *     summary: Create a digital product
 *     description: Creates a digital product. For DIGITAL_FILE type, send as multipart/form-data with a file field.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, price, sku, categoryId, digitalType]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               sku:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               digitalType:
 *                 type: string
 *                 enum: [DIGITAL_FILE, DIGITAL_LICENSE, DIGITAL_ACCESS]
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Required for DIGITAL_FILE type
 *               maxDownloads:
 *                 type: integer
 *                 default: 5
 *               accessDurationDays:
 *                 type: integer
 *                 description: For DIGITAL_ACCESS type
 *               accessUrl:
 *                 type: string
 *                 description: For DIGITAL_ACCESS type
 *     responses:
 *       201:
 *         description: Digital product created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Not authorized (VENDOR required)
 */
router.post('/', authenticate, authorize(['VENDOR']), upload.single('file'), digitalProductController.create);

/**
 * @swagger
 * /api/v1/digital-products/{id}:
 *   put:
 *     tags: [Digital Products]
 *     summary: Update digital product metadata
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Digital product updated
 *       404:
 *         description: Product not found
 */
router.put('/:id', authenticate, authorize(['VENDOR']), digitalProductController.update);

/**
 * @swagger
 * /api/v1/digital-products/{id}/file:
 *   post:
 *     tags: [Digital Products]
 *     summary: Upload or replace file for a DIGITAL_FILE product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded
 *       404:
 *         description: Product not found
 */
router.post('/:id/file', authenticate, authorize(['VENDOR']), upload.single('file'), digitalProductController.uploadFile);

/**
 * @swagger
 * /api/v1/digital-products/{id}/download:
 *   get:
 *     tags: [Digital Products]
 *     summary: Get presigned download URL for a digital file
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Presigned URL for download
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *       404:
 *         description: Product or file not found
 */
router.get('/:id/download', authenticate, digitalProductController.getDownloadUrl);

/**
 * @swagger
 * /api/v1/digital-products/{id}/license-keys:
 *   post:
 *     tags: [License Keys]
 *     summary: Add license keys in bulk
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [keys]
 *             properties:
 *               keys:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["XXXXX-XXXXX-XXXXX", "YYYYY-YYYYY-YYYYY"]
 *     responses:
 *       201:
 *         description: License keys added
 *       404:
 *         description: Product not found
 */
router.post('/:id/license-keys', authenticate, authorize(['VENDOR']), licenseKeyController.addKeys);

/**
 * @swagger
 * /api/v1/digital-products/{id}/license-keys:
 *   get:
 *     tags: [License Keys]
 *     summary: List license keys for a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of license keys
 */
router.get('/:id/license-keys', authenticate, authorize(['VENDOR']), licenseKeyController.getKeys);

/**
 * @swagger
 * /api/v1/digital-products/{id}/license-keys/{keyId}:
 *   delete:
 *     tags: [License Keys]
 *     summary: Delete a license key
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: keyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: License key deleted
 *       404:
 *         description: Key not found
 */
router.delete('/:id/license-keys/:keyId', authenticate, authorize(['VENDOR']), licenseKeyController.deleteKey);

export default router;
