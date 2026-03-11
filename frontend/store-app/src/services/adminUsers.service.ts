import { api } from './api';
import { ApiError } from '../types/api';

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

export interface AdminUserDetail extends Omit<AdminUser, 'lastIp' | 'ipHistory'> {
  profileStatus: 'COMPLETE' | 'PENDING_PROFILE' | 'PENDING_IDENTITY';
  ipHistory: Array<{ ipAddress: string; createdAt: string }>;
}

export interface VendorProfile {
  id: string;
  userId: string;
  status: 'PENDING' | 'COMPLETE';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string | null;
  fiscalCode: string;
  businessName: string;
  vatNumber: string | null;
  contactEmail: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  identityStatus: 'PENDING' | 'PROCESSING' | 'VERIFIED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

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

  deleteUser: (id: string): Promise<void> =>
    api.delete<void>(`/admin/users/${id}`),

  getUserDetail: (id: string): Promise<AdminUserDetail> =>
    api.get<AdminUserDetail>(`/admin/users/${id}`),

  getVendorProfile: async (userId: string): Promise<VendorProfile | null> => {
    try {
      return await api.get<VendorProfile>(`/user-data/admin/vendor-profile/${userId}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  },

  setIdentityStatus: (
    userId: string,
    status: 'PENDING' | 'VERIFIED'
  ): Promise<VendorProfile> =>
    api.put<VendorProfile>(`/user-data/admin/vendor-profile/${userId}/identity-status`, { status }),
};
