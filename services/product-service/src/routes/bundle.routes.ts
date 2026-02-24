import { Router } from 'express';
import bundleController from '../controllers/bundle.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

/**
 * @swagger
 * /api/v1/bundles:
 *   get:
 *     tags: [Bundles]
 *     summary: List bundles
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated bundle list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                 total:
 *                   type: integer
 */
router.get('/', bundleController.list);

/**
 * @swagger
 * /api/v1/bundles/{id}:
 *   get:
 *     tags: [Bundles]
 *     summary: Get bundle by ID with included products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bundle details with expanded products
 *       404:
 *         description: Bundle not found
 */
router.get('/:id', bundleController.getById);

/**
 * @swagger
 * /api/v1/bundles:
 *   post:
 *     tags: [Bundles]
 *     summary: Create a bundle
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, categoryId, items]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               isFeatured:
 *                 type: boolean
 *                 default: false
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity]
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *     responses:
 *       201:
 *         description: Bundle created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Not authorized (VENDOR required)
 */
router.post('/', authenticate, authorize(['VENDOR']), bundleController.create);

/**
 * @swagger
 * /api/v1/bundles/{id}:
 *   put:
 *     tags: [Bundles]
 *     summary: Update a bundle
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
 *               isFeatured:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Bundle updated
 *       404:
 *         description: Bundle not found
 */
router.put('/:id', authenticate, authorize(['VENDOR']), bundleController.update);

/**
 * @swagger
 * /api/v1/bundles/{id}:
 *   delete:
 *     tags: [Bundles]
 *     summary: Delete a bundle
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
 *         description: Bundle deleted
 *       404:
 *         description: Bundle not found
 */
router.delete('/:id', authenticate, authorize(['VENDOR']), bundleController.delete);

export default router;
