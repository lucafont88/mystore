import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/products.service';
import { productKeys } from './keys';
import { ProductFilters } from '@/types/product';

export function useProductsQuery(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(JSON.stringify(filters)),
    queryKeyHashFn: (queryKey) => JSON.stringify(queryKey),
    queryFn: () => productsService.getProducts(filters),
  });
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsService.getProduct(id),
    enabled: !!id,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productsService.getCategories(),
  });
}
