import { api } from './api';
import { Bundle, PaginatedBundles } from '../types/product';

export interface BundleFilters {
  skip?: number;
  take?: number;
  vendorId?: string;
  categoryId?: string;
  search?: string;
}

export const bundlesService = {
  getBundles: async (filters: BundleFilters = {}): Promise<PaginatedBundles> => {
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params[key] = String(value);
    });
    return api.get<PaginatedBundles>('/bundles', { params });
  },

  getBundle: async (id: string): Promise<Bundle> => {
    return api.get<Bundle>(`/bundles/${id}`);
  },

  createBundle: async (data: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    images?: string[];
    isFeatured?: boolean;
    items: { productId: string; quantity: number }[];
  }): Promise<Bundle> => {
    return api.post<Bundle>('/bundles', data);
  },

  updateBundle: async (id: string, data: any): Promise<Bundle> => {
    return api.put<Bundle>(`/bundles/${id}`, data);
  },

  deleteBundle: async (id: string): Promise<void> => {
    await api.delete(`/bundles/${id}`);
  },
};
