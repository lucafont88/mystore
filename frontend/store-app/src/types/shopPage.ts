export type ShopPageStatus = 'NEW_PAGE' | 'DRAFT' | 'PUBLISHED';

export interface ShopPage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: ShopPageStatus;
  vendorId: string;
  htmlContent?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopPageListItem {
  id: string;
  title: string;
  slug: string;
  status: ShopPageStatus;
  updatedAt: string;
}

export interface CreateShopPageRequest {
  title: string;
  description?: string;
}

export interface UpdateShopPageRequest {
  title?: string;
  description?: string;
}

export interface ReorderShopPagesRequest {
  pageIds: string[];
}
