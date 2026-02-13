import { api } from './api';
import { Product, ProductFilters, PaginatedProducts } from '../types/product';

export const productsService = {
  getProducts: async (filters: ProductFilters = {}) => {
    // Convert filters to string params for the fetch wrapper
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params[key] = String(value);
    });

    return api.get<PaginatedProducts>('/products', { params });
  },

  getProduct: async (id: string) => {
    return api.get<Product>(`/products/${id}`);
  },

  getCategories: async () => {
    return api.get<any[]>('/products/categories');
  },
};
