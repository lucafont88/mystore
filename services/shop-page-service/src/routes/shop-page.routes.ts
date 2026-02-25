import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import shopPageController from '../controllers/shop-page.controller';

const router: ReturnType<typeof Router> = Router();

/**
 * @swagger
 * /api/v1/shop-pages/public/{slug}:
 *   get:
 *     tags: [Shop Pages]
 *     summary: Get a published shop page by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Published shop page with HTML content
 *       404:
 *         description: Page not found or not published
 */
router.get('/public/:slug', shopPageController.getPublicPage.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages:
 *   post:
 *     tags: [Shop Pages]
 *     summary: Create a new shop page
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, slug]
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shop page created
 *       403:
 *         description: Not authorized (VENDOR required)
 */
router.post('/', authenticate, authorize(['VENDOR']), shopPageController.create.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages:
 *   get:
 *     tags: [Shop Pages]
 *     summary: List vendor's shop pages
 *     security:
 *       - bearerAuth: []
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
 *         description: Paginated list of shop pages
 */
router.get('/', authenticate, authorize(['VENDOR']), shopPageController.list.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}:
 *   get:
 *     tags: [Shop Pages]
 *     summary: Get shop page by ID
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
 *         description: Shop page details with HTML content
 *       404:
 *         description: Page not found
 */
router.get('/:id', authenticate, authorize(['VENDOR']), shopPageController.getById.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}:
 *   put:
 *     tags: [Shop Pages]
 *     summary: Update shop page metadata
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
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shop page updated
 *       404:
 *         description: Page not found
 */
router.put('/:id', authenticate, authorize(['VENDOR']), shopPageController.update.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}/content:
 *   put:
 *     tags: [Shop Pages]
 *     summary: Save shop page HTML content
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
 *             required: [htmlContent]
 *             properties:
 *               htmlContent:
 *                 type: string
 *                 description: Full HTML content of the page
 *     responses:
 *       200:
 *         description: Content saved to MinIO
 */
router.put('/:id/content', authenticate, authorize(['VENDOR']), shopPageController.saveContent.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}/builder:
 *   get:
 *     tags: [Shop Pages]
 *     summary: Get builder JSON data for a shop page
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
 *         description: Builder JSON data
 */
router.get('/:id/builder', authenticate, authorize(['VENDOR']), shopPageController.getBuilder.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}/builder:
 *   put:
 *     tags: [Shop Pages]
 *     summary: Save builder JSON data
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
 *     responses:
 *       200:
 *         description: Builder data saved
 */
router.put('/:id/builder', authenticate, authorize(['VENDOR']), shopPageController.saveBuilder.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}/publish:
 *   put:
 *     tags: [Shop Pages]
 *     summary: Publish a shop page
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
 *         description: Page published
 *       404:
 *         description: Page not found
 */
router.put('/:id/publish', authenticate, authorize(['VENDOR']), shopPageController.publish.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}/unpublish:
 *   put:
 *     tags: [Shop Pages]
 *     summary: Unpublish a shop page
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
 *         description: Page unpublished
 */
router.put('/:id/unpublish', authenticate, authorize(['VENDOR']), shopPageController.unpublish.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}:
 *   delete:
 *     tags: [Shop Pages]
 *     summary: Delete a shop page
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
 *         description: Page deleted
 *       404:
 *         description: Page not found
 */
router.delete('/:id', authenticate, authorize(['VENDOR']), shopPageController.delete.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}/products:
 *   post:
 *     tags: [Shop Pages]
 *     summary: Associate products with a shop page
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
 *             required: [productIds]
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Products associated
 */
router.post('/:id/products', authenticate, authorize(['VENDOR']), shopPageController.addProducts.bind(shopPageController));

/**
 * @swagger
 * /api/v1/shop-pages/{id}/products/{productId}:
 *   delete:
 *     tags: [Shop Pages]
 *     summary: Remove a product from a shop page
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from page
 */
router.delete('/:id/products/:productId', authenticate, authorize(['VENDOR']), shopPageController.removeProduct.bind(shopPageController));

export default router;
