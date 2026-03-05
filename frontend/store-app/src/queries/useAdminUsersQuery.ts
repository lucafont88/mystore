import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminUsersService } from '../services/adminUsers.service';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useToggleBanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, banned }: { id: string; banned: boolean }) =>
      adminUsersService.toggleBan(id, banned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (id: string) => adminUsersService.resetPassword(id),
  });
}

export function useAdminVendorStatsQuery() {
  return useQuery({
    queryKey: VENDOR_STATS_KEY,
    queryFn: () => adminUsersService.getVendorStats(),
    staleTime: 5 * 60 * 1000,
  });
}
