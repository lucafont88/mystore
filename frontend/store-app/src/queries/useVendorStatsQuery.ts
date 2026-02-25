import { useQuery } from '@tanstack/react-query';
import { ordersService } from '@/services/orders.service';

export function useVendorStatsQuery(period: string) {
  return useQuery({
    queryKey: ['vendor-stats', period],
    queryFn: () => ordersService.getVendorStats(period),
  });
}
