import orderRepository from '../repositories/order.repository';
import { Order, OrderStatus, Prisma } from '../generated/client';

interface CreateOrderInput {
  customerId: string;
  customerEmail: string;
  items: {
    productId: string;
    bundleId?: string;
    vendorId: string;
    productName: string;
    productType?: string;
    unitPrice: number;
    quantity: number;
  }[];
  shippingAddress?: any;
  notes?: string;
}

export class OrderService {
  async createOrder(data: CreateOrderInput): Promise<Order> {
    if (!data.items || data.items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    const orderData: Prisma.OrderCreateInput = {
      customerId: data.customerId,
      customerEmail: data.customerEmail,
      totalAmount,
      shippingAddress: data.shippingAddress || undefined,
      notes: data.notes,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          bundleId: item.bundleId,
          vendorId: item.vendorId,
          productName: item.productName,
          productType: item.productType || 'PHYSICAL',
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          subtotal: item.unitPrice * item.quantity,
        })),
      },
    };

    return orderRepository.create(orderData);
  }

  async getOrderById(id: string, userId: string): Promise<Order | null> {
    const order = await orderRepository.findById(id);
    if (!order) return null;
    // Only the customer who placed the order can view it
    if (order.customerId !== userId) {
      throw new Error('Forbidden');
    }
    return order;
  }

  async listOrders(customerId: string, skip?: number, take?: number): Promise<any> {
    return orderRepository.findAll({ customerId, skip, take });
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await orderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return orderRepository.updateStatus(id, status);
  }

  async getVendorStats(vendorId: string, period: string): Promise<any> {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'quarter':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    return orderRepository.getVendorStats({
      vendorId,
      startDate,
      endDate: now,
    });
  }
}

export default new OrderService();
