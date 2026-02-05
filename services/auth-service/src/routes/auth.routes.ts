import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { registerValidator, loginValidator } from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router: Router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.get('/me', authenticate, authController.me);

export default router;
