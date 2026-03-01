import { Router } from 'express';
import adminUserController from '../controllers/adminUser.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router: Router = Router();

router.get('/', authenticate, authorize(['ADMIN']), adminUserController.listUsers.bind(adminUserController));
router.put('/:id/role', authenticate, authorize(['ADMIN']), adminUserController.changeRole.bind(adminUserController));
router.put('/:id/ban', authenticate, authorize(['ADMIN']), adminUserController.toggleBan.bind(adminUserController));
router.post('/:id/reset-password', authenticate, authorize(['ADMIN']), adminUserController.resetPassword.bind(adminUserController));

export default router;
