import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminUsersService, VendorProfile } from '../services/adminUsers.service';

const USERS_KEY = ['admin-users'] as const;
const VENDOR_STATS_KEY = ['admin-vendor-stats'] as const;

export function useAdminUsersQuery() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: () => adminUsersService.getUsers(),
  });
}

export function useChangeRoleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      adminUsersService.changeRole(id, role),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
      queryClient.invalidateQueries({ queryKey: ['admin-user-detail', id] });
    },
  });
}

export function useToggleBanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, banned }: { id: string; banned: boolean }) =>
      adminUsersService.toggleBan(id, banned),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
      queryClient.invalidateQueries({ queryKey: ['admin-user-detail', id] });
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (id: string) => adminUsersService.resetPassword(id),
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminUsersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useAdminVendorStatsQuery() {
  return useQuery({
    queryKey: VENDOR_STATS_KEY,
    queryFn: () => adminUsersService.getVendorStats(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminUserDetailQuery(userId: string | null) {
  return useQuery({
    queryKey: ['admin-user-detail', userId],
    queryFn: () => adminUsersService.getUserDetail(userId!),
    enabled: !!userId,
  });
}

export function useAdminVendorProfileQuery(userId: string | null, role: string | undefined) {
  return useQuery<VendorProfile | null>({
    queryKey: ['admin-vendor-profile', userId],
    queryFn: () => adminUsersService.getVendorProfile(userId!),
    enabled: !!userId && role === 'VENDOR',
  });
}

export function useAdminSetIdentityStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'PENDING' | 'VERIFIED' }) =>
      adminUsersService.setIdentityStatus(userId, status),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-user-detail', userId] });
      queryClient.invalidateQueries({ queryKey: ['admin-vendor-profile', userId] });
    },
  });
}
