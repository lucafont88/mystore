import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { registerValidator } from '../validators/auth.validator';

const router: Router = Router();

router.post('/register', registerValidator, authController.register);

export default router;
