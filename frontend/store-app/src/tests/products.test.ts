import { describe, it, expect, vi, beforeEach } from 'vitest';
import { productsService } from '../services/products.service';
import { api } from '../services/api';

vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('products service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch products with filters', async () => {
    const mockResponse = { items: [], total: 0, page: 1, pages: 0 };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const filters = { search: 'test', category: 'electronics' };
    const result = await productsService.getProducts(filters);

    expect(api.get).toHaveBeenCalledWith('/products', {
      params: { search: 'test', category: 'electronics' },
    });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch a single product by id', async () => {
    const mockProduct = { id: '1', name: 'Product 1' };
    (api.get as any).mockResolvedValueOnce(mockProduct);

    const result = await productsService.getProduct('1');

    expect(api.get).toHaveBeenCalledWith('/products/1');
    expect(result).toEqual(mockProduct);
  });
});
