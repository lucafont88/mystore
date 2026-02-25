# Implementation Plan - Digital Products & Product Bundles

## Phase 1: Schema Prisma + Migration
- [x] Task: Aggiungere enum ProductType e campo productType a Product
- [x] Task: Creare modello DigitalFile (1:1 con Product)
- [x] Task: Creare modello DigitalLicense + LicenseKey
- [x] Task: Creare modello DigitalAccess (1:1 con Product)
- [x] Task: Creare modello Bundle con categoryId e isFeatured
- [x] Task: Creare modello BundleItem con constraint unique
- [x] Task: Eseguire prisma migrate dev

## Phase 2: MinIO per file digitali
- [x] Task: Creare config/minio.ts in product-service (pattern da shop-page-service)
- [x] Task: Creare services/minio.service.ts (uploadFile, getPresignedDownloadUrl, deleteFile)
- [x] Task: Aggiornare docker-compose.yml (env MinIO + depends_on)
- [x] Task: Installare multer + @types/multer

## Phase 3: Backend — Repository + Service Layer
- [x] Task: Creare digital-file.repository.ts
- [x] Task: Creare digital-license.repository.ts (con gestione LicenseKey)
- [x] Task: Creare digital-access.repository.ts
- [x] Task: Creare bundle.repository.ts
- [x] Task: Aggiornare product.repository.ts (filtro productType + include relazioni)
- [x] Task: Creare digital-product.service.ts (transazione Prisma, validazione tipo-specifica)
- [x] Task: Creare license-key.service.ts (import bulk, assegnazione, listing)
- [x] Task: Creare bundle.service.ts (CRUD, validazione ownership, calcolo sconto)
- [x] Task: Aggiornare product.service.ts (skip stock check per digitali)

## Phase 4: Backend — Controller + Routes + Gateway
- [x] Task: Creare upload.middleware.ts (multer memoryStorage)
- [x] Task: Creare digital-product.controller.ts
- [x] Task: Creare license-key.controller.ts
- [x] Task: Creare bundle.controller.ts
- [x] Task: Creare digital-product.routes.ts
- [x] Task: Creare bundle.routes.ts
- [x] Task: Aggiornare routes/index.ts (registrare nuove rotte)
- [x] Task: Aggiornare API Gateway (proxy /digital-products e /bundles)
- [x] Task: Docker rebuild + test API con curl

## Phase 5: Frontend — Types + Services + Hooks
- [x] Task: Aggiornare types/product.ts (ProductType, campi digitali, Bundle, BundleItem)
- [x] Task: Fix bug stock vs stockQuantity nel tipo Product
- [x] Task: Creare services/digitalProducts.service.ts
- [x] Task: Creare services/bundles.service.ts
- [x] Task: Creare queries/useDigitalProductsQuery.ts
- [x] Task: Creare queries/useBundlesQuery.ts

## Phase 6: Frontend — Pagine Venditore
- [x] Task: Creare Vendor/Products/index.tsx (lista con badge tipo)
- [x] Task: Creare Vendor/Products/create.tsx (form multi-step)
- [x] Task: Creare Vendor/Products/[id].tsx (modifica)
- [x] Task: Creare Vendor/Bundles/index.tsx (lista bundle)
- [x] Task: Creare Vendor/Bundles/create.tsx (con product picker)
- [x] Task: Creare Vendor/Bundles/[id].tsx (modifica)
- [x] Task: Aggiungere route /vendor/products/* e /vendor/bundles/* con VENDOR guard

## Phase 7: Frontend — Catalogo Pubblico
- [x] Task: Aggiornare ProductCard.tsx (badge tipo, disponibilità adattata)
- [x] Task: Aggiornare Products/[id].tsx (info tipo-specifiche, quantità fissa per digitali)
- [x] Task: Creare BundleCard.tsx
- [x] Task: Creare Bundles/index.tsx (listing con prezzo scontato)
- [x] Task: Creare Bundles/[id].tsx (dettaglio con prodotti inclusi)
- [x] Task: Aggiornare cartStore.ts (supporto bundle + enforce qty=1 digitali)

## Phase 8: Localizzazione
- [x] Task: Creare locales IT + EN per vendor.json e products.json
- [x] Task: Aggiornare common.json IT + EN con chiavi navigazione
- [x] Task: Registrare namespace 'vendor' in i18n config

## Phase 9: Build + Verifica
- [x] Task: npx tsc --noEmit senza errori
- [x] Task: Docker rebuild product-service + api-gateway
- [x] Task: Test API con curl (bundles endpoint + products con filtro productType)
