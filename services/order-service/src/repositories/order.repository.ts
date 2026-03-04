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

export interface AdminStatsResult {
  totalOrders: number;
  ordersByDay: { date: string; orders: number }[];
}

export interface VendorBulkStatsResult {
  [vendorId: string]: { totalOrders: number; totalRevenue: number };
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

  async getAdminStats(startDate: Date, endDate: Date): Promise<AdminStatsResult> {
    const totalOrders = await prisma.order.count({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        status: { notIn: ['CANCELLED', 'REFUNDED'] },
      },
    });

    // Aggregate orders by day using in-memory grouping
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        status: { notIn: ['CANCELLED', 'REFUNDED'] },
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const byDay: Record<string, number> = {};
    for (const order of orders) {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      byDay[dateKey] = (byDay[dateKey] ?? 0) + 1;
    }

    const ordersByDay = Object.entries(byDay).map(([date, count]) => ({
      date,
      orders: count,
    }));

    return { totalOrders, ordersByDay };
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

  async getAllVendorsStats(): Promise<VendorBulkStatsResult> {
    const revenueRows = await prisma.orderItem.groupBy({
      by: ['vendorId'],
      where: {
        order: {
          status: { notIn: ['CANCELLED', 'REFUNDED'] },
        },
      },
      _sum: { subtotal: true },
    });

    const orderCountRows: { vendorId: string; orderCount: bigint }[] =
      await prisma.$queryRaw`
        SELECT oi."vendorId", COUNT(DISTINCT oi."orderId") AS "orderCount"
        FROM "order_items" oi
        JOIN "orders" o ON oi."orderId" = o."id"
        WHERE o."status" NOT IN ('CANCELLED', 'REFUNDED')
        GROUP BY oi."vendorId"
      `;

    const result: VendorBulkStatsResult = {};
    for (const row of revenueRows) {
      result[row.vendorId] = {
        totalOrders: 0,
        totalRevenue: Math.round(Number(row._sum.subtotal ?? 0) * 100) / 100,
      };
    }
    for (const row of orderCountRows) {
      if (result[row.vendorId]) {
        result[row.vendorId].totalOrders = Number(row.orderCount);
      }
    }
    return result;
  }
}

export default new OrderRepository();
