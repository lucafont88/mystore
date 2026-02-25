import { Router } from 'express';
import productController from '../controllers/product.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags: [Products]
 *     summary: List products with optional filters
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
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: productType
 *         schema:
 *           type: string
 *           enum: [PHYSICAL, DIGITAL_FILE, DIGITAL_LICENSE, DIGITAL_ACCESS]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Paginated product list
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
router.get('/', productController.list);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details (includes digital relations if applicable)
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a physical product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, sku, categoryId]
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
 *               stockQuantity:
 *                 type: integer
 *                 default: 0
 *               productType:
 *                 type: string
 *                 enum: [PHYSICAL]
 *                 default: PHYSICAL
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (VENDOR or ADMIN required)
 */
router.post('/', authenticate, authorize(['VENDOR', 'ADMIN']), productController.create);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product
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
 *               sku:
 *                 type: string
 *               stockQuantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put('/:id', authenticate, authorize(['VENDOR', 'ADMIN']), productController.update);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
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
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authenticate, authorize(['VENDOR', 'ADMIN']), productController.delete);

export default router;
