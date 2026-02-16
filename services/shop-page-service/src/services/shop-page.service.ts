import slugify from 'slugify';
import shopPageRepository from '../repositories/shop-page.repository';
import minioService from './minio.service';
import { ShopPage } from '../generated/client';

export class ShopPageService {
  async createPage(data: { title: string; description?: string }, vendorId: string): Promise<ShopPage> {
    const baseSlug = slugify(data.title, { lower: true, strict: true });
    const existing = await shopPageRepository.findBySlug(baseSlug);
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    return shopPageRepository.create({
      title: data.title,
      slug,
      description: data.description,
      vendorId,
      status: 'NEW_PAGE',
    });
  }

  async updatePage(id: string, data: { title?: string; description?: string }, vendorId: string): Promise<ShopPage> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');

    const updateData: any = {};
    if (data.title) {
      updateData.title = data.title;
      updateData.slug = slugify(data.title, { lower: true, strict: true });
    }
    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    return shopPageRepository.update(id, updateData);
  }

  async saveContent(id: string, htmlContent: string, vendorId: string): Promise<ShopPage> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');

    const htmlKey = `${vendorId}/${id}.html`;
    await minioService.uploadHtml(htmlKey, htmlContent);

    return shopPageRepository.update(id, {
      htmlKey,
      status: 'DRAFT',
    });
  }

  async publishPage(id: string, vendorId: string): Promise<ShopPage> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');
    if (page.status !== 'DRAFT') throw new Error('Only DRAFT pages can be published');

    return shopPageRepository.update(id, {
      status: 'PUBLISHED',
      publishedAt: new Date(),
    });
  }

  async unpublishPage(id: string, vendorId: string): Promise<ShopPage> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');
    if (page.status !== 'PUBLISHED') throw new Error('Only PUBLISHED pages can be unpublished');

    return shopPageRepository.update(id, {
      status: 'DRAFT',
      publishedAt: null,
    });
  }

  async deletePage(id: string, vendorId: string): Promise<void> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');

    // Delete HTML from MinIO if it exists
    if (page.htmlKey) {
      try {
        await minioService.deleteHtml(page.htmlKey);
      } catch (err) {
        // Log but don't block deletion
      }
    }

    await shopPageRepository.delete(id);
  }

  async getPage(id: string, vendorId: string): Promise<ShopPage & { products: any[] }> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');
    return page;
  }

  async listPages(vendorId: string, filters: { skip?: number; take?: number; status?: string }) {
    return shopPageRepository.findByVendor(vendorId, filters);
  }

  async addProducts(id: string, productIds: string[], vendorId: string): Promise<void> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');

    await shopPageRepository.addProducts(id, productIds);
  }

  async removeProduct(id: string, productId: string, vendorId: string): Promise<void> {
    const page = await shopPageRepository.findById(id);
    if (!page) throw new Error('Page not found');
    if (page.vendorId !== vendorId) throw new Error('Ownership verification failed');

    await shopPageRepository.removeProduct(id, productId);
  }

  async getPublicPage(slug: string): Promise<{ page: ShopPage; html: string } | null> {
    const page = await shopPageRepository.findBySlug(slug);
    if (!page || page.status !== 'PUBLISHED') return null;

    let html = '';
    if (page.htmlKey) {
      html = await minioService.getHtml(page.htmlKey);
    }

    return { page, html };
  }

  /** Resolve {{product:uuid}} placeholders in HTML with product data */
  resolveProductPlaceholders(html: string, products: Array<{ id: string; name: string; price: number; images: string[] }>): string {
    let resolved = html;
    for (const product of products) {
      const placeholder = `{{product:${product.id}}}`;
      const replacement = `<div class="shop-product" data-product-id="${product.id}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        ${product.images.length > 0 ? `<img src="${product.images[0]}" alt="${product.name}" />` : ''}
      </div>`;
      resolved = resolved.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }
    return resolved;
  }
}

export default new ShopPageService();
