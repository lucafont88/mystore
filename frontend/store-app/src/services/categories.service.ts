import { api } from './api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  children: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  parentId?: string | null;
}

export interface UpdateCategoryPayload {
  name?: string;
  description?: string;
  parentId?: string | null;
}

export const categoriesService = {
  getCategories: async (): Promise<Category[]> => {
    return api.get<Category[]>('/categories');
  },

  createCategory: async (data: CreateCategoryPayload): Promise<Category> => {
    return api.post<Category>('/categories', data);
  },

  updateCategory: async (id: string, data: UpdateCategoryPayload): Promise<Category> => {
    return api.put<Category>(`/categories/${id}`, data);
  },

  deleteCategory: async (id: string): Promise<void> => {
    return api.delete<void>(`/categories/${id}`);
  },
};
