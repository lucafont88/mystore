import { api } from './api';
import {
  ShopPage,
  ShopPageListItem,
  CreateShopPageRequest,
  UpdateShopPageRequest,
  ReorderShopPagesRequest,
} from '../types/shopPage';
import { BuilderData } from '../types/builder';

export const shopPagesService = {
  getPages: async (): Promise<ShopPageListItem[]> => {
    const res = await api.get<{ items: ShopPageListItem[] } | ShopPageListItem[]>('/shop-pages');
    return Array.isArray(res) ? res : res.items;
  },

  getPage: async (id: string): Promise<ShopPage> => {
    return api.get<ShopPage>(`/shop-pages/${id}`);
  },

  createPage: async (data: CreateShopPageRequest): Promise<ShopPage> => {
    return api.post<ShopPage>('/shop-pages', data);
  },

  updatePage: async (id: string, data: UpdateShopPageRequest): Promise<ShopPage> => {
    return api.put<ShopPage>(`/shop-pages/${id}`, data);
  },

  saveContent: async (id: string, htmlContent: string): Promise<ShopPage> => {
    return api.put<ShopPage>(`/shop-pages/${id}/content`, { htmlContent });
  },

  reorderPages: async (data: ReorderShopPagesRequest): Promise<void> => {
    return api.put<void>('/shop-pages/reorder', data);
  },

  deletePage: async (id: string): Promise<void> => {
    return api.delete<void>(`/shop-pages/${id}`);
  },

  getBuilder: async (id: string): Promise<BuilderData> => {
    return api.get<BuilderData>(`/shop-pages/${id}/builder`);
  },

  saveBuilder: async (id: string, data: BuilderData): Promise<void> => {
    return api.put<void>(`/shop-pages/${id}/builder`, data);
  },
};
