import { api } from './api';
import {
  ShopPage,
  ShopPageListItem,
  CreateShopPageRequest,
  UpdateShopPageRequest,
  ReorderShopPagesRequest,
} from '../types/shopPage';
import { BuilderData } from '../types/builder';

// Mock data for development when backend is unavailable
const mockPages: ShopPage[] = [
  {
    id: '1',
    title: 'Homepage Negozio',
    slug: 'homepage-negozio',
    description: 'La pagina principale del mio negozio',
    status: 'PUBLISHED',
    vendorId: 'vendor-1',
    htmlContent: '<div style="font-family: sans-serif; padding: 20px;">\n  <h1 style="color: #4f46e5;">Benvenuto nel mio negozio!</h1>\n  <p>Scopri i nostri prodotti migliori.</p>\n  <ul>\n    <li>Prodotto A - €29.99</li>\n    <li>Prodotto B - €49.99</li>\n  </ul>\n</div>',
    publishedAt: '2026-02-15T10:00:00Z',
    createdAt: '2026-02-14T09:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Promozioni Invernali',
    slug: 'promozioni-invernali',
    description: 'Offerte speciali per la stagione invernale',
    status: 'DRAFT',
    vendorId: 'vendor-1',
    htmlContent: '<div style="font-family: sans-serif; padding: 20px; background: #f0f9ff;">\n  <h1 style="color: #0369a1;">Saldi Invernali!</h1>\n  <p>Fino al <strong>50% di sconto</strong> su tutti gli articoli.</p>\n  <p>Offerta valida fino al 28 febbraio 2026.</p>\n</div>',
    createdAt: '2026-02-15T14:00:00Z',
    updatedAt: '2026-02-15T14:00:00Z',
  },
  {
    id: '3',
    title: 'Chi Siamo',
    slug: 'chi-siamo',
    status: 'NEW_PAGE',
    vendorId: 'vendor-1',
    htmlContent: '<h1>Chi Siamo</h1>\n<p>Contenuto in arrivo...</p>',
    createdAt: '2026-02-16T08:00:00Z',
    updatedAt: '2026-02-16T08:00:00Z',
  },
];

const mockBuilders: Record<string, BuilderData> = {};

let USE_MOCK = false;

// Try a real API call first; if it fails, fall back to mock
async function withMockFallback<T>(apiFn: () => Promise<T>, mockFn: () => T): Promise<T> {
  if (USE_MOCK) {
    return mockFn();
  }
  try {
    return await apiFn();
  } catch {
    USE_MOCK = true;
    return mockFn();
  }
}

export const shopPagesService = {
  getPages: async (): Promise<ShopPageListItem[]> => {
    return withMockFallback(
      async () => {
        const res = await api.get<{ items: ShopPageListItem[] } | ShopPageListItem[]>('/shop-pages');
        return Array.isArray(res) ? res : res.items;
      },
      () => mockPages.map(({ id, title, slug, status, updatedAt }) => ({ id, title, slug, status, updatedAt }))
    );
  },

  getPage: async (id: string): Promise<ShopPage> => {
    return withMockFallback(
      () => api.get<ShopPage>(`/shop-pages/${id}`),
      () => {
        const page = mockPages.find((p) => p.id === id);
        if (!page) throw new Error('Page not found');
        return { ...page };
      }
    );
  },

  createPage: async (data: CreateShopPageRequest): Promise<ShopPage> => {
    return withMockFallback(
      () => api.post<ShopPage>('/shop-pages', data),
      () => {
        const newPage: ShopPage = {
          id: String(Date.now()),
          title: data.title,
          slug: data.title.toLowerCase().replace(/\s+/g, '-'),
          description: data.description,
          status: 'NEW_PAGE',
          vendorId: 'vendor-1',
          htmlContent: '<h1>La mia nuova pagina</h1>\n<p>Inizia a scrivere il tuo contenuto qui.</p>',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockPages.push(newPage);
        return { ...newPage };
      }
    );
  },

  updatePage: async (id: string, data: UpdateShopPageRequest): Promise<ShopPage> => {
    return withMockFallback(
      () => api.put<ShopPage>(`/shop-pages/${id}`, data),
      () => {
        const page = mockPages.find((p) => p.id === id);
        if (!page) throw new Error('Page not found');
        Object.assign(page, data, { updatedAt: new Date().toISOString() });
        return { ...page };
      }
    );
  },

  saveContent: async (id: string, htmlContent: string): Promise<ShopPage> => {
    return withMockFallback(
      () => api.put<ShopPage>(`/shop-pages/${id}/content`, { htmlContent }),
      () => {
        const page = mockPages.find((p) => p.id === id);
        if (!page) throw new Error('Page not found');
        page.htmlContent = htmlContent;
        page.status = page.status === 'NEW_PAGE' ? 'DRAFT' : page.status;
        page.updatedAt = new Date().toISOString();
        return { ...page };
      }
    );
  },

  reorderPages: async (data: ReorderShopPagesRequest): Promise<void> => {
    return withMockFallback(
      () => api.put<void>('/shop-pages/reorder', data),
      () => {
        // Reorder is handled client-side for mock
      }
    );
  },

  deletePage: async (id: string): Promise<void> => {
    return withMockFallback(
      () => api.delete<void>(`/shop-pages/${id}`),
      () => {
        const idx = mockPages.findIndex((p) => p.id === id);
        if (idx !== -1) mockPages.splice(idx, 1);
      }
    );
  },

  getBuilder: async (id: string): Promise<BuilderData> => {
    return withMockFallback(
      () => api.get<BuilderData>(`/shop-pages/${id}/builder`),
      () => mockBuilders[id] ?? { blocks: [] }
    );
  },

  saveBuilder: async (id: string, data: BuilderData): Promise<void> => {
    return withMockFallback(
      () => api.put<void>(`/shop-pages/${id}/builder`, data),
      () => {
        mockBuilders[id] = data;
      }
    );
  },
};
