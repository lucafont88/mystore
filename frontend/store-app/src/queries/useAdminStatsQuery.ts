import { useQuery } from '@tanstack/react-query';
import { ordersService } from '@/services/orders.service';

export function useAdminStatsQuery(period: string) {
  return useQuery({
    queryKey: ['admin-stats', period],
    queryFn: () => ordersService.getAdminStats(period),
  });
}
