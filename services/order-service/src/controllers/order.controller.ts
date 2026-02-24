import { Response } from 'express';
import orderService from '../services/order.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class OrderController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const order = await orderService.createOrder({
        customerId: req.user!.id,
        customerEmail: req.user!.email,
        items: req.body.items,
        shippingAddress: req.body.shippingAddress,
        notes: req.body.notes,
      });
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: AuthRequest, res: Response): Promise<void> {
    try {
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
      const take = req.query.take ? parseInt(req.query.take as string) : 20;
      const result = await orderService.listOrders(req.user!.id, skip, take);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const order = await orderService.getOrderById(req.params.id as string, req.user!.id);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.status(200).json(order);
    } catch (error: any) {
      if (error.message === 'Forbidden') {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }
      res.status(400).json({ error: error.message });
    }
  }

  async vendorStats(req: AuthRequest, res: Response): Promise<void> {
    try {
      const period = (req.query.period as string) || 'month';
      const stats = await orderService.getVendorStats(req.user!.id, period);
      res.status(200).json(stats);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new OrderController();
