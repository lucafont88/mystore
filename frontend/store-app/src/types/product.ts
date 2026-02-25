export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export type ProductType = 'PHYSICAL' | 'DIGITAL_FILE' | 'DIGITAL_LICENSE' | 'DIGITAL_ACCESS';

export interface DigitalFileInfo {
  fileName: string;
  fileSize: number;
  mimeType: string;
  maxDownloads: number;
}

export interface DigitalAccessInfo {
  accessDurationDays: number;
  accessUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stockQuantity: number;
  images: string[];
  vendorId: string;
  categoryId: string;
  category?: Category;
  productType: ProductType;
  digitalFile?: DigitalFileInfo;
  digitalLicense?: { id: string };
  digitalAccess?: DigitalAccessInfo;
  availableLicenses?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
  productType?: ProductType;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pages: number;
}

export interface BundleItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  vendorId: string;
  categoryId: string;
  category?: Category;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  items: BundleItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedBundles {
  items: Bundle[];
  total: number;
}

export interface LicenseKey {
  id: string;
  key: string;
  isRedeemed: boolean;
  redeemedAt?: string;
  redeemedBy?: string;
  createdAt: string;
}
