import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import authService from '../services/auth.service';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      const user = await authService.register(email, password);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}

export default new AuthController();
