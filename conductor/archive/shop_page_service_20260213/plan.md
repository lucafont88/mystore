# Implementation Plan - Shop Page Service

## Phase 1: Shared RabbitMQ Module
- [x] Create `shared/messaging/types.ts` - Event interfaces, constants
- [x] Create `shared/messaging/connection.ts` - Connection manager with reconnect
- [x] Create `shared/messaging/publisher.ts` - Publish + RPC request
- [x] Create `shared/messaging/consumer.ts` - Subscribe + RPC respond
- [x] Create `shared/messaging/index.ts` - Exports
- [x] Update `shared/index.ts` - Export messaging module
- [x] Add `amqplib` dependency to shared package
- [x] Build shared package successfully

## Phase 2: MinIO + Docker Infrastructure
- [x] Add MinIO container to `docker-compose.yml`
- [x] Add shop-page-service container to `docker-compose.yml`
- [x] Add RABBITMQ_URL to product-service in docker-compose
- [x] Add SHOP_PAGE_SERVICE_URL to api-gateway in docker-compose
- [x] Update `.env` with all new variables

## Phase 3: Shop-Page-Service Core
- [x] Create service structure (package.json, tsconfig.json, vitest.config.ts)
- [x] Create Prisma schema (ShopPage, ShopPageProduct, PageStatus enum)
- [x] Create `src/config/db.ts` - Prisma singleton
- [x] Create `src/config/minio.ts` - MinIO client + ensureBucket
- [x] Create `src/middlewares/auth.middleware.ts` - JWT auth + authorize
- [x] Create `src/repositories/shop-page.repository.ts` - CRUD + product association
- [x] Create `src/services/minio.service.ts` - Upload/download/delete HTML
- [x] Create `src/services/shop-page.service.ts` - Business logic + state machine
- [x] Create `src/controllers/shop-page.controller.ts` - HTTP handlers
- [x] Create `src/routes/shop-page.routes.ts` - Route definitions
- [x] Create `src/routes/index.ts` - Route aggregator
- [x] Create `src/events/consumer.ts` - Product event consumer
- [x] Create `src/events/publisher.ts` - RPC product validation
- [x] Create `src/app.ts` - Express app with observability + RabbitMQ

## Phase 4: Product-Service RabbitMQ Integration
- [x] Create `events/publisher.ts` - Product event publisher
- [x] Create `events/responder.ts` - Product validation RPC responder
- [x] Update `services/product.service.ts` - Publish events on create/update/delete
- [x] Update `app.ts` - Initialize RabbitMQ connection
- [x] Add `amqplib` dependency

## Phase 5: API Gateway + Workspace
- [x] Create `api-gateway/src/routes/shop-page.routes.ts` - Proxy route
- [x] Update `api-gateway/src/routes/index.ts` - Add shop-page route
- [x] Update `pnpm-workspace.yaml` - Add shop-page-service
- [x] Update root `package.json` - Dev script + migrate script
- [x] Run `pnpm install` + Prisma generate + migrate

## Phase 6: Testing
- [x] `shop-page.repository.test.ts` - 6 tests (CRUD + product association)
- [x] `shop-page.service.test.ts` - 8 tests (state machine, ownership, placeholders)
- [x] `shop-page.integration.test.ts` - 7 tests (HTTP endpoints, auth, roles)
- [x] Verify product-service tests still pass (26/26)
- [x] Verify auth-service tests still pass (11/11)
- [x] **Total: 58 tests across 12 files, all passing**

## Phase 7: Conductor Track
- [x] Create track folder with index.md, spec.md, plan.md, metadata.json
- [x] Update tracks.md with active track
