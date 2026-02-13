# Implementation Plan - Fix Current Application

## Phase 1: Fix API Path Alignment
- [x] Task: Fix frontend BASE_URL to include `/v1` segment
    - [x] Update `frontend/store-app/src/services/api.ts`: change `BASE_URL` from `/api` to `/api/v1`
    - [x] Verify all service files (`auth.service.ts`, `products.service.ts`) produce correct paths

## Phase 2: Fix Authentication Data Contracts
- [x] Task: Align registration flow between frontend and backend
    - [x] Update `frontend/store-app/src/services/auth.service.ts`: fix `AuthResponse` to match backend response shape (`accessToken`/`refreshToken` instead of `token`)
    - [x] Update `frontend/store-app/src/services/auth.service.ts`: adapt `register()` to handle backend response (registration returns user without tokens, login returns user + tokens)
    - [x] Update `frontend/store-app/src/stores/authStore.ts`: ensure store handles `accessToken` field correctly (removed `firstName`/`lastName`, added `role`)
    - [x] Update `frontend/store-app/src/components/layout/Header.tsx`: fix user display to use email instead of firstName/lastName
    - [x] Update `frontend/store-app/src/tests/api.test.ts`: align mock user object with new User interface
- [x] Task: Align login flow between frontend and backend
    - [x] Verify `authService.login()` correctly maps `accessToken` to the auth store
    - [x] Verify the `api.ts` request interceptor reads the correct token field for Authorization header
- [x] Task: Fix empty search filter sending `search=` parameter
    - [x] Update `frontend/store-app/src/services/products.service.ts`: exclude empty strings from query params

## Phase 3: Fix Auth-Service Tests
- [x] Task: Fix auth-service test configuration
    - [x] Convert `auth.test.ts` to use mocked Prisma client, Redis, argon2, and token utils
    - [x] Ensure all 5 tests pass without requiring external services (PostgreSQL, Redis)

## Phase 4: Verification & Polish
- [x] Task: Build frontend - `tsc -b && vite build` succeeds
- [x] Task: Manual E2E verification: Register -> auto-login -> user menu shows email -> Browse Products (4 products loaded) -> 0 console errors

## Phase 5: Fix Flaky Product-Service Integration Tests
- [x] Task: Fix test isolation for all 5 integration test files
    - [x] Remove `beforeAll` `deleteMany()` from `product.integration.test.ts`, `catalog.integration.test.ts`, `category.integration.test.ts`, `category.repository.test.ts`, `product.repository.test.ts`
    - [x] Add per-file tracking of created entity IDs (`createdProductIds`, `createdCategoryIds`)
    - [x] Clean up only own data in `afterAll` using `deleteMany({ where: { id: { in: [...] } } })`
    - [x] Make hardcoded slugs unique with `Date.now()` suffix in `category.integration.test.ts`
- [x] Task: Run full test suite - **19/19 test files pass, 63/63 tests pass**
