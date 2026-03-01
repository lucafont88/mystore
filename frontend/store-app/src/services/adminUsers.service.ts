import { api } from './api';

export interface AdminUser {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN' | 'SUPPORT';
  isBanned: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export const adminUsersService = {
  getUsers: (): Promise<AdminUser[]> =>
    api.get<AdminUser[]>('/admin/users'),

  changeRole: (id: string, role: string): Promise<AdminUser> =>
    api.put<AdminUser>(`/admin/users/${id}/role`, { role }),

  toggleBan: (id: string, banned: boolean): Promise<AdminUser> =>
    api.put<AdminUser>(`/admin/users/${id}/ban`, { banned }),

  resetPassword: (id: string): Promise<{ tempPassword: string }> =>
    api.post<{ tempPassword: string }>(`/admin/users/${id}/reset-password`, {}),
};
