import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bundlesService, BundleFilters } from '@/services/bundles.service';
import { bundleKeys } from './keys';

export function useBundlesQuery(filters: BundleFilters = {}) {
  return useQuery({
    queryKey: bundleKeys.list(JSON.stringify(filters)),
    queryKeyHashFn: (queryKey) => JSON.stringify(queryKey),
    queryFn: () => bundlesService.getBundles(filters),
  });
}

export function useBundleQuery(id: string) {
  return useQuery({
    queryKey: bundleKeys.detail(id),
    queryFn: () => bundlesService.getBundle(id),
    enabled: !!id,
  });
}

export function useCreateBundle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bundlesService.createBundle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bundleKeys.all });
    },
  });
}

export function useUpdateBundle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => bundlesService.updateBundle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bundleKeys.all });
    },
  });
}

export function useDeleteBundle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bundlesService.deleteBundle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bundleKeys.all });
    },
  });
}
