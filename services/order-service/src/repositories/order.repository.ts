import prisma from '../config/db';
import { Order, OrderStatus, Prisma } from '../generated/client';

export interface OrderFilter {
  customerId?: string;
  status?: OrderStatus;
  skip?: number;
  take?: number;
}

export interface VendorStatsFilter {
  vendorId: string;
  startDate: Date;
  endDate: Date;
}

export interface PaginatedOrders {
  items: Order[];
  total: number;
}

const orderInclude = {
  items: true,
} as const;

export class OrderRepository {
  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return prisma.order.create({
      data,
      include: orderInclude,
    });
  }

  async findById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: orderInclude,
    });
  }

  async findAll(filter: OrderFilter): Promise<PaginatedOrders> {
    const { customerId, status, skip = 0, take = 20 } = filter;

    const where: Prisma.OrderWhereInput = {};
    if (customerId) where.customerId = customerId;
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        include: orderInclude,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    return { items, total };
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { status },
      include: orderInclude,
    });
  }

  async getVendorStats(filter: VendorStatsFilter): Promise<any> {
    const { vendorId, startDate, endDate } = filter;

    // Get all order items for this vendor within the date range
    const orderItems = await prisma.orderItem.findMany({
      where: {
        vendorId,
        order: {
          createdAt: { gte: startDate, lte: endDate },
          status: { notIn: ['CANCELLED', 'REFUNDED'] },
        },
      },
      include: {
        order: {
          select: { createdAt: true, id: true },
        },
      },
      orderBy: { order: { createdAt: 'asc' } },
    });

    // Aggregate by day
    const salesByDay: Record<string, { revenue: number; orders: Set<string> }> = {};
    let totalRevenue = 0;
    let totalItems = 0;
    const uniqueOrders = new Set<string>();

    for (const item of orderItems) {
      const dateKey = item.order.createdAt.toISOString().split('T')[0];
      if (!salesByDay[dateKey]) {
        salesByDay[dateKey] = { revenue: 0, orders: new Set() };
      }
      const subtotal = Number(item.subtotal);
      salesByDay[dateKey].revenue += subtotal;
      salesByDay[dateKey].orders.add(item.orderId);
      totalRevenue += subtotal;
      totalItems += item.quantity;
      uniqueOrders.add(item.orderId);
    }

    const salesByDayArray = Object.entries(salesByDay).map(([date, data]) => ({
      date,
      revenue: Math.round(data.revenue * 100) / 100,
      orders: data.orders.size,
    }));

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders: uniqueOrders.size,
      totalItems,
      salesByDay: salesByDayArray,
    };
  }
}

export default new OrderRepository();
