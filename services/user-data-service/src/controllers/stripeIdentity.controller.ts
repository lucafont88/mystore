import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import {
  createVerificationSession,
  handleWebhookEvent,
  pollVerificationStatus,
} from '../services/stripeIdentity.service';

export class StripeIdentityController {
  async createSession(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user!.id;

    try {
      const clientSecret = await createVerificationSession(userId);
      res.status(200).json({ clientSecret });
    } catch (error: any) {
      console.error('Error creating verification session:', error);
      res.status(500).json({ error: 'Failed to create verification session' });
    }
  }

  async pollStatus(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user!.id;

    try {
      const status = await pollVerificationStatus(userId, console);
      res.status(200).json({ status });
    } catch (error: any) {
      console.error('Error polling verification status:', error);
      res.status(500).json({ error: 'Failed to check verification status' });
    }
  }

  async webhook(req: Request, res: Response): Promise<void> {
    const signature = req.headers['stripe-signature'] as string;

    try {
      await handleWebhookEvent(req.body as Buffer, signature ?? '', console);
      res.status(200).json({ received: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new StripeIdentityController();
