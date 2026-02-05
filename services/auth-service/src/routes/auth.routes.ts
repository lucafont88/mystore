import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { registerValidator, loginValidator } from '../validators/auth.validator';

const router: Router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

export default router;
