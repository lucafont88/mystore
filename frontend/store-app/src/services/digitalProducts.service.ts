import { useAuthStore } from '../stores/authStore';
import { api } from './api';
import { Product, LicenseKey } from '../types/product';

const BASE_URL = '/api/v1';

export const digitalProductsService = {
  create: async (formData: FormData): Promise<Product> => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${BASE_URL}/digital-products`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to create digital product');
    }
    return response.json();
  },

  update: async (id: string, data: any): Promise<Product> => {
    return api.put<Product>(`/digital-products/${id}`, data);
  },

  uploadFile: async (productId: string, file: File): Promise<void> => {
    const token = useAuthStore.getState().token;
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${BASE_URL}/digital-products/${productId}/file`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to upload file');
    }
  },

  getDownloadUrl: async (productId: string): Promise<string> => {
    const result = await api.get<{ downloadUrl: string }>(`/digital-products/${productId}/download`);
    return result.downloadUrl;
  },

  addLicenseKeys: async (productId: string, keys: string[]): Promise<{ added: number }> => {
    return api.post<{ added: number }>(`/digital-products/${productId}/license-keys`, { keys });
  },

  getLicenseKeys: async (productId: string): Promise<LicenseKey[]> => {
    return api.get<LicenseKey[]>(`/digital-products/${productId}/license-keys`);
  },

  deleteLicenseKey: async (productId: string, keyId: string): Promise<void> => {
    await api.delete(`/digital-products/${productId}/license-keys/${keyId}`);
  },
};
