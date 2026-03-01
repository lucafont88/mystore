import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import orderController from '../controllers/order.controller';

const router: ReturnType<typeof Router> = Router();

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, vendorId, productName, unitPrice, quantity]
 *                   properties:
 *                     productId:
 *                       type: string
 *                     bundleId:
 *                       type: string
 *                     vendorId:
 *                       type: string
 *                     productName:
 *                       type: string
 *                     productType:
 *                       type: string
 *                     unitPrice:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *               shippingAddress:
 *                 type: object
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticate, orderController.create.bind(orderController));

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     tags: [Orders]
 *     summary: List current user's orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Paginated list of orders
 */
router.get('/', authenticate, orderController.list.bind(orderController));

/**
 * @swagger
 * /api/v1/orders/vendor/stats:
 *   get:
 *     tags: [Orders]
 *     summary: Get vendor sales statistics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [week, month, quarter, year]
 *           default: month
 *     responses:
 *       200:
 *         description: Vendor sales statistics with daily breakdown
 *       403:
 *         description: Not authorized (VENDOR required)
 */
router.get('/vendor/stats', authenticate, authorize(['VENDOR']), orderController.vendorStats.bind(orderController));

router.get('/admin/stats', authenticate, authorize(['ADMIN']), orderController.adminStats.bind(orderController));

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order by ID
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
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get('/:id', authenticate, orderController.getById.bind(orderController));

export default router;
