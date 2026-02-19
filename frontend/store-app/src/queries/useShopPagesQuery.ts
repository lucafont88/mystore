import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopPagesService } from '@/services/shopPages.service';
import { shopPageKeys } from './keys';
import { CreateShopPageRequest } from '@/types/shopPage';
import { BuilderData } from '@/types/builder';

export function useShopPagesQuery() {
  return useQuery({
    queryKey: shopPageKeys.lists(),
    queryFn: () => shopPagesService.getPages(),
  });
}

export function useShopPageQuery(id: string | null) {
  return useQuery({
    queryKey: shopPageKeys.detail(id ?? ''),
    queryFn: () => shopPagesService.getPage(id!),
    enabled: !!id,
  });
}

export function useCreateShopPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateShopPageRequest) => shopPagesService.createPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopPageKeys.all });
    },
  });
}

export function useSaveShopPageContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, htmlContent }: { id: string; htmlContent: string }) =>
      shopPagesService.saveContent(id, htmlContent),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: shopPageKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: shopPageKeys.lists() });
    },
  });
}

export function useUpdateShopPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      shopPagesService.updatePage(id, { title }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: shopPageKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: shopPageKeys.lists() });
    },
  });
}

export function useDeleteShopPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shopPagesService.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopPageKeys.all });
    },
  });
}

export function useBuilderQuery(id: string | null) {
  return useQuery({
    queryKey: shopPageKeys.builder(id ?? ''),
    queryFn: () => shopPagesService.getBuilder(id!),
    enabled: !!id,
  });
}

export function useSaveBuilder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BuilderData }) =>
      shopPagesService.saveBuilder(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: shopPageKeys.builder(id) });
    },
  });
}
