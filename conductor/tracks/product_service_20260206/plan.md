# Implementation Plan - Product Service Implementation

## Phase 1: Infrastructure & Scaffolding [checkpoint: 0c896e5]
- [x] Task: Create `services/product-service` directory structure and initialize project. (ed745ee)
    - [x] Initialize `package.json` with necessary dependencies (express, prisma, zod, etc.).
    - [x] Configure TypeScript (`tsconfig.json`) extending root config.
    - [x] Create basic Express application scaffolding in `src/app.ts`.
- [x] Task: Database Configuration (PostgreSQL) (cd2d79f)
    - [x] Update root `.env` with `PRODUCT_DATABASE_URL`.
    - [x] Initialize Prisma in `services/product-service`.
    - [x] Define initial schema in `schema.prisma` (Product, Category, and Role enum).
    - [x] Run initial migration to create the `products_db` database and tables.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Infrastructure & Scaffolding' (Protocol in workflow.md)

## Phase 2: Core Data Models & Repositories
- [x] Task: Implement Category Repository (37c57de)
    - [x] Write Tests: Create unit tests for Category CRUD operations including tree structure support.
    - [x] Implement: Create `category.repository.ts` using Prisma.
- [x] Task: Implement Product Repository (42ace65)
    - [x] Write Tests: Create unit tests for Product CRUD operations.
    - [x] Implement: Create `product.repository.ts` using Prisma.
    - [x] Implement: Add automatic slug generation logic.
- [~] Task: Conductor - User Manual Verification 'Phase 2: Core Data Models & Repositories' (Protocol in workflow.md)

## Phase 3: Product Management Logic (Vendor & Admin)
- [ ] Task: Implement Product Service Logic
    - [ ] Write Tests: Create unit tests for business logic (ownership verification, inventory validation).
    - [ ] Implement: Create `product.service.ts` to handle business rules.
- [ ] Task: Implement Product Controllers & Routes
    - [ ] Write Tests: Create integration tests for Product endpoints (POST, PUT, DELETE).
    - [ ] Implement: Create `product.controller.ts` and define routes in `routes/product.routes.ts`.
    - [ ] Implement: Add ownership verification middleware using JWT data.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Product Management Logic (Vendor & Admin)' (Protocol in workflow.md)

## Phase 4: Category Management & Public Catalog
- [ ] Task: Implement Category Controllers & Routes (Admin)
    - [ ] Write Tests: Create integration tests for Category management endpoints.
    - [ ] Implement: Create `category.controller.ts` and define routes.
- [ ] Task: Implement Public Catalog Endpoints
    - [ ] Write Tests: Create integration tests for listing, searching, and detailing products.
    - [ ] Implement: Add public routes for paginated listing and searching (using ILIKE).
    - [ ] Implement: Add public routes for fetching category tree.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Category Management & Public Catalog' (Protocol in workflow.md)

## Phase 5: API Gateway Integration & Final E2E
- [ ] Task: Connect Gateway to Product Service
    - [ ] Update API Gateway routing strategy to forward `/api/v1/products/*` to Product Service.
    - [ ] Add `PRODUCT_SERVICE_URL` to root `.env`.
- [ ] Task: Final System Integration Test
    - [ ] Write Tests: Perform a manual E2E test through the Gateway: Login as Vendor -> Create Product -> Search as Guest -> Update as Vendor.
    - [ ] Verify: Ensure RBAC is enforced (e.g., Guest cannot create product).
- [ ] Task: Conductor - User Manual Verification 'Phase 5: API Gateway Integration & Final E2E' (Protocol in workflow.md)
