# Implementation Plan - Migration from Jest to Vitest

## Phase 1: Global Setup & Shared Package Migration [checkpoint: b0fc486]
- [x] Task: Configure Vitest Workspace & Global Dependencies 72ba364
    - [x] Update root `package.json`: Add `vitest` and `@vitest/coverage-v8` to devDependencies.
    - [x] Create `vitest.workspace.ts` in the root to manage the monorepo structure.
    - [x] Implement: Add root `test` scripts for running all tests and coverage.
- [x] Task: Migrate `@ecommerce/shared` Package 7b9ccdb
    - [x] Create `shared/vitest.config.ts`.
    - [x] Update `shared/package.json`: Remove `jest`, `ts-jest`, `@types/jest`. Add `vitest`.
    - [x] Refactor: Update all `shared/tests/**/*.test.ts` files to use explicit imports from `vitest` and replace `jest.*` with `vi.*`.
    - [x] Verify: Run `pnpm --filter @ecommerce/shared test` and ensure all tests pass.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Global Setup & Shared Package Migration' (Protocol in workflow.md)

## Phase 2: Pilot Service Migration (API Gateway) [checkpoint: c8f0599]
- [x] Task: Migrate `api-gateway` Service 28438d7
    - [x] Create `services/api-gateway/vitest.config.ts`.
    - [x] Update `services/api-gateway/package.json`: Remove Jest dependencies and add `vitest`.
    - [x] Refactor: Update `services/api-gateway/src/tests/**/*.test.ts` to use Vitest syntax and explicit imports.
    - [x] Verify: Run `pnpm --filter api-gateway test` and ensure health check/metrics tests pass.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Pilot Service Migration (API Gateway)' (Protocol in workflow.md)

## Phase 3: Core Services Migration (Auth & Product) [checkpoint: cc9d5bc]
- [x] Task: Migrate `auth-service` 2300dac
    - [x] Create `services/auth-service/vitest.config.ts`.
    - [x] Update `services/auth-service/package.json`: Remove Jest dependencies and add `vitest`.
    - [x] Refactor: Update all `auth-service` test files (Prisma mocks, context propagation).
    - [x] Verify: Run `pnpm --filter auth-service test` and ensure all tests pass.
- [x] Task: Migrate `product-service` 2300dac
    - [x] Create `services/product-service/vitest.config.ts`.
    - [x] Update `services/product-service/package.json`: Remove Jest dependencies and add `vitest`.
    - [x] Refactor: Update all `product-service` test files (CRUD operations, integration tests).
    - [x] Verify: Run `pnpm --filter product-service test` and ensure all tests pass.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Core Services Migration (Auth & Product)' (Protocol in workflow.md)

## Phase 4: Final Cleanup & Global Validation
- [~] Task: Dependency Cleanup & Lockfile Update
    - [ ] Remove all remaining `jest.config.js` files across the workspace.
    - [ ] Execute `pnpm install` to update the lockfile and remove orphaned Jest dependencies.
- [ ] Task: Global Test & Coverage Verification
    - [ ] Verify: Run `pnpm test` from root and ensure 100% pass rate across the workspace.
    - [ ] Verify: Run coverage report and confirm `v8` provider is generating reports correctly.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Cleanup & Global Validation' (Protocol in workflow.md)
