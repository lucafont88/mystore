import { api } from './api';

export interface CreateOrderPayload {
  items: {
    productId: string;
    bundleId?: string;
    vendorId: string;
    productName: string;
    productType?: string;
    unitPrice: number;
    quantity: number;
  }[];
  shippingAddress?: Record<string, string>;
  notes?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerEmail: string;
  status: string;
  totalAmount: number;
  shippingAddress?: Record<string, string>;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  bundleId?: string;
  vendorId: string;
  productName: string;
  productType: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface PaginatedOrders {
  items: Order[];
  total: number;
}

export interface VendorStats {
  totalRevenue: number;
  totalOrders: number;
  totalItems: number;
  salesByDay: { date: string; revenue: number; orders: number }[];
}

export interface AdminStats {
  totalOrders: number;
  ordersByDay: { date: string; orders: number }[];
}

export const ordersService = {
  createOrder: async (data: CreateOrderPayload): Promise<Order> => {
    return api.post<Order>('/orders', data);
  },

  getOrders: async (skip = 0, take = 20): Promise<PaginatedOrders> => {
    return api.get<PaginatedOrders>('/orders', { params: { skip: String(skip), take: String(take) } });
  },

  getOrder: async (id: string): Promise<Order> => {
    return api.get<Order>(`/orders/${id}`);
  },

  getVendorStats: async (period: string): Promise<VendorStats> => {
    return api.get<VendorStats>('/orders/vendor/stats', { params: { period } });
  },

  getAdminStats: async (period: string): Promise<AdminStats> => {
    return api.get<AdminStats>('/orders/admin/stats', { params: { period } });
  },
};
