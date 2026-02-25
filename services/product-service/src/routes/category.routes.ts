import { Router } from 'express';
import categoryController from '../controllers/category.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router: Router = Router();

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags: [Categories]
 *     summary: List all categories
 *     responses:
 *       200:
 *         description: Array of categories
 */
router.get('/', categoryController.list);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a category (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       403:
 *         description: Not authorized (ADMIN required)
 */
router.post('/', authenticate, authorize(['ADMIN']), categoryController.create);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update a category (admin only)
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
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put('/:id', authenticate, authorize(['ADMIN']), categoryController.update);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category (admin only)
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
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete('/:id', authenticate, authorize(['ADMIN']), categoryController.delete);

export default router;
