# Implementation Plan - Order Service & Vendor Dashboard

## Phase 1: Order Service Backend
- [x] Task: Creare struttura servizio order-service (package.json, tsconfig, Dockerfile)
- [x] Task: Definire schema Prisma (Order, OrderItem con vendorId)
- [x] Task: Implementare repository (CRUD + getVendorStats con aggregazione per vendor/data)
- [x] Task: Implementare service layer (createOrder, listOrders, getVendorStats)
- [x] Task: Implementare controller + routes con Swagger annotations
- [x] Task: Configurare auth middleware (JWT authenticate + authorize VENDOR)
- [x] Task: Aggiornare docker-compose.yml (order-service porta 3004, ORDER_DATABASE_URL)
- [x] Task: Aggiornare API Gateway (proxy /orders → order-service)
- [x] Task: Aggiornare tutti i Dockerfile per COPY order-service/package.json
- [x] Task: Aggiornare pnpm-workspace.yaml
- [x] Task: Creare init-databases.sh per auto-creazione DB al primo avvio

## Phase 2: Checkout Frontend Integration
- [x] Task: Creare services/orders.service.ts (createOrder, getOrders, getVendorStats)
- [x] Task: Aggiungere vendorId a CartItem in cartStore.ts
- [x] Task: Aggiornare ProductCard, ProductDetail, BundleDetail per passare vendorId al carrello
- [x] Task: Riscrivere Checkout per chiamare ordersService.createOrder

## Phase 3: Vendor Dashboard Frontend
- [x] Task: Installare recharts
- [x] Task: Creare useVendorStatsQuery hook
- [x] Task: Creare pagina Vendor/Dashboard con stat cards + AreaChart vendite + link rapidi
- [x] Task: Aggiornare Header (sostituire 3 link vendor con singolo link Dashboard)
- [x] Task: Aggiornare router (route /vendor/dashboard)
- [x] Task: Aggiungere traduzioni dashboard in vendor.json (IT + EN)

## Phase 4: Bundle in Products Page
- [x] Task: Rimuovere link Bundle dall'header
- [x] Task: Installare componente checkbox shadcn
- [x] Task: Aggiungere checkbox "Includi bundle" in ProductFilters
- [x] Task: Aggiornare ProductsPage per fetch condizionale bundle
- [x] Task: Aggiornare ProductGrid per renderizzare bundle e prodotti insieme
- [x] Task: Aggiungere traduzioni checkbox in products.json (IT + EN)

## Phase 5: Build & Verifica
- [x] Task: TypeScript check (npx tsc --noEmit) senza errori
- [x] Task: Vite build senza errori
- [x] Task: Docker build order-service + api-gateway
- [x] Task: Verificare health endpoint order-service
- [x] Task: Verificare tabelle DB (orders, order_items)
- [x] Task: Verificare auth enforcement sugli endpoint
