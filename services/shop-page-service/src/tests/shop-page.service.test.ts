import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShopPageService } from '../services/shop-page.service';

// Mock dependencies
vi.mock('../config/db', () => ({
  default: {},
}));

vi.mock('../repositories/shop-page.repository', () => ({
  default: {
    create: vi.fn(),
    findById: vi.fn(),
    findBySlug: vi.fn(),
    findByVendor: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    addProducts: vi.fn(),
    removeProduct: vi.fn(),
    getProductIds: vi.fn(),
  },
}));

vi.mock('../services/minio.service', () => ({
  default: {
    uploadHtml: vi.fn(),
    getHtml: vi.fn(),
    deleteHtml: vi.fn(),
    getPresignedUrl: vi.fn(),
  },
}));

import shopPageRepository from '../repositories/shop-page.repository';
import minioService from '../services/minio.service';

const mockedRepo = vi.mocked(shopPageRepository);
const mockedMinio = vi.mocked(minioService);

describe('ShopPageService', () => {
  const service = new ShopPageService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createPage', () => {
    it('should create a page with NEW_PAGE status', async () => {
      mockedRepo.findBySlug.mockResolvedValue(null);
      mockedRepo.create.mockResolvedValue({
        id: '1', title: 'My Page', slug: 'my-page', status: 'NEW_PAGE',
        vendorId: 'v1', description: null, htmlKey: null, publishedAt: null,
        createdAt: new Date(), updatedAt: new Date(),
      });

      const result = await service.createPage({ title: 'My Page' }, 'v1');
      expect(result.status).toBe('NEW_PAGE');
      expect(mockedRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'My Page', vendorId: 'v1', status: 'NEW_PAGE' })
      );
    });
  });

  describe('state transitions', () => {
    const basePage = {
      id: '1', title: 'Test', slug: 'test', vendorId: 'v1', description: null,
      htmlKey: 'v1/1.html', publishedAt: null, createdAt: new Date(), updatedAt: new Date(),
      products: [],
    };

    it('should transition from NEW_PAGE to DRAFT on saveContent', async () => {
      mockedRepo.findById.mockResolvedValue({ ...basePage, status: 'NEW_PAGE' as any });
      mockedMinio.uploadHtml.mockResolvedValue(undefined);
      mockedRepo.update.mockResolvedValue({ ...basePage, status: 'DRAFT' as any });

      const result = await service.saveContent('1', '<h1>Hello</h1>', 'v1');
      expect(result.status).toBe('DRAFT');
      expect(mockedMinio.uploadHtml).toHaveBeenCalled();
    });

    it('should transition from DRAFT to PUBLISHED', async () => {
      mockedRepo.findById.mockResolvedValue({ ...basePage, status: 'DRAFT' as any });
      mockedRepo.update.mockResolvedValue({ ...basePage, status: 'PUBLISHED' as any, publishedAt: new Date() });

      const result = await service.publishPage('1', 'v1');
      expect(result.status).toBe('PUBLISHED');
    });

    it('should NOT publish a NEW_PAGE directly', async () => {
      mockedRepo.findById.mockResolvedValue({ ...basePage, status: 'NEW_PAGE' as any });

      await expect(service.publishPage('1', 'v1')).rejects.toThrow('Only DRAFT pages can be published');
    });

    it('should transition from PUBLISHED to DRAFT on unpublish', async () => {
      mockedRepo.findById.mockResolvedValue({ ...basePage, status: 'PUBLISHED' as any });
      mockedRepo.update.mockResolvedValue({ ...basePage, status: 'DRAFT' as any });

      const result = await service.unpublishPage('1', 'v1');
      expect(result.status).toBe('DRAFT');
    });

    it('should NOT unpublish a DRAFT page', async () => {
      mockedRepo.findById.mockResolvedValue({ ...basePage, status: 'DRAFT' as any });

      await expect(service.unpublishPage('1', 'v1')).rejects.toThrow('Only PUBLISHED pages can be unpublished');
    });
  });

  describe('ownership', () => {
    it('should reject update from different vendor', async () => {
      mockedRepo.findById.mockResolvedValue({
        id: '1', title: 'Test', slug: 'test', status: 'DRAFT' as any,
        vendorId: 'v1', description: null, htmlKey: null, publishedAt: null,
        createdAt: new Date(), updatedAt: new Date(), products: [],
      });

      await expect(service.updatePage('1', { title: 'Hack' }, 'v2'))
        .rejects.toThrow('Ownership verification failed');
    });
  });

  describe('resolveProductPlaceholders', () => {
    it('should replace product placeholders in HTML', () => {
      const html = '<div>{{product:abc-123}}</div>';
      const products = [{ id: 'abc-123', name: 'Test Product', price: 29.99, images: [] }];

      const result = service.resolveProductPlaceholders(html, products);
      expect(result).toContain('Test Product');
      expect(result).toContain('$29.99');
      expect(result).not.toContain('{{product:abc-123}}');
    });
  });
});
