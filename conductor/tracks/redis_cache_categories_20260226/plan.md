# Implementation Plan - Cache Redis Categorie Prodotti

## Phase 1: Setup Redis Cache
- [x] Task: Aggiungere ioredis a product-service/package.json + pnpm install
- [x] Task: Creare config/cache-redis.ts (connessione Redis DB 1, separata da auth DB 0)

## Phase 2: Cache-Aside Pattern
- [x] Task: Creare services/category-cache.service.ts (getCachedCategories, setCachedCategories, invalidateCategoriesCache, TTL dinamico fino 03:30 AM)
- [x] Task: Modificare category.controller.ts metodo list() per usare cache-aside pattern

## Phase 3: Build & Verifica
- [x] Task: Docker rebuild product-service
- [x] Task: Verificare health endpoint product-service
- [x] Task: Verificare cache miss → DB + popolamento cache
- [x] Task: Verificare cache hit → risposta da Redis
- [x] Task: Verificare TTL corretto (secondi fino alle 03:30 AM)
- [x] Task: Verificare separazione DB 0 (auth) / DB 1 (cache)

## Phase 4: Admin Dashboard + Gestione Categorie
- [x] Task: Backend - invalidateCategoriesCache() in create/update/delete (category.controller.ts)
- [x] Task: Frontend - categories.service.ts (CRUD API client)
- [x] Task: Frontend - useCategoriesQuery.ts (useQuery + mutation hooks con invalidateQueries)
- [x] Task: Frontend - Admin layout con sidebar (pages/Admin/index.tsx)
- [x] Task: Frontend - Admin dashboard page (pages/Admin/Dashboard/index.tsx)
- [x] Task: Frontend - Gestione categorie page CRUD (pages/Admin/Categories/index.tsx)
- [x] Task: Frontend - Router nested routes /admin + /admin/categories
- [x] Task: Frontend - Header link Admin per ruolo ADMIN
- [x] Task: Frontend - Traduzioni IT/EN (public/locales/*/admin.json) + namespace i18n
- [x] Task: Fix api.ts per gestire 204 no-content su DELETE
- [x] Task: Docker rebuild product-service + TypeScript check

## Phase 5: Admin Dashboard — Grafico Ordini (BarChart)
- [x] Task: Backend - getAdminStats() in order.repository.ts (aggregazione per giorno)
- [x] Task: Backend - getAdminStats() in order.service.ts (calcolo periodo)
- [x] Task: Backend - adminStats() controller + route GET /admin/stats (ADMIN only)
- [x] Task: Frontend - AdminStats interface + getAdminStats() in orders.service.ts
- [x] Task: Frontend - useAdminStatsQuery.ts (TanStack Query hook)
- [x] Task: Frontend - Admin Dashboard con BarChart Recharts + selettore periodo + stat card
- [x] Task: Frontend - Traduzioni stats IT/EN (admin.json)
- [x] Task: Docker rebuild order-service + TypeScript check + verifica endpoint
