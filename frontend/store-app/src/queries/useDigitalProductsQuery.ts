import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { digitalProductsService } from '@/services/digitalProducts.service';
import { productKeys, licenseKeyKeys } from './keys';

export function useCreateDigitalProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: digitalProductsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useUpdateDigitalProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => digitalProductsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useUploadDigitalFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, file }: { productId: string; file: File }) =>
      digitalProductsService.uploadFile(productId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useDownloadUrl(productId: string) {
  return useQuery({
    queryKey: ['downloadUrl', productId],
    queryFn: () => digitalProductsService.getDownloadUrl(productId),
    enabled: false, // only fetch on demand
  });
}

export function useLicenseKeysQuery(productId: string) {
  return useQuery({
    queryKey: licenseKeyKeys.byProduct(productId),
    queryFn: () => digitalProductsService.getLicenseKeys(productId),
    enabled: !!productId,
  });
}

export function useAddLicenseKeys() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, keys }: { productId: string; keys: string[] }) =>
      digitalProductsService.addLicenseKeys(productId, keys),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: licenseKeyKeys.byProduct(productId) });
    },
  });
}

export function useDeleteLicenseKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, keyId }: { productId: string; keyId: string }) =>
      digitalProductsService.deleteLicenseKey(productId, keyId),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: licenseKeyKeys.byProduct(productId) });
    },
  });
}
