import { api } from './api';

export interface IpLogEntry {
  ipAddress: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN' | 'SUPPORT';
  isBanned: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  lastIp: string | null;
  ipHistory: IpLogEntry[];
}

export interface VendorSalesStats {
  totalOrders: number;
  totalRevenue: number;
}

export type VendorStatsMap = Record<string, VendorSalesStats>;

export const adminUsersService = {
  getUsers: (): Promise<AdminUser[]> =>
    api.get<AdminUser[]>('/admin/users'),

  getVendorStats: (): Promise<VendorStatsMap> =>
    api.get<VendorStatsMap>('/orders/admin/vendors/stats'),

  changeRole: (id: string, role: string): Promise<AdminUser> =>
    api.put<AdminUser>(`/admin/users/${id}/role`, { role }),

  toggleBan: (id: string, banned: boolean): Promise<AdminUser> =>
    api.put<AdminUser>(`/admin/users/${id}/ban`, { banned }),

  resetPassword: (id: string): Promise<{ tempPassword: string }> =>
    api.post<{ tempPassword: string }>(`/admin/users/${id}/reset-password`, {}),
};
