# Implementation Plan - Refactor Observability Module to TypeScript

## Phase 1: Environment & Build Setup
- [x] Task: Configure TypeScript for Shared Package 04e5b37
    - [x] Update `shared/package.json`: Add `typescript`, `ts-jest`, `@types/node`, `@types/uuid`, and `@types/express` to devDependencies.
    - [x] Create `shared/tsconfig.json` extending the project root configuration.
    - [x] Update `shared/jest.config.js` to support TypeScript tests using `ts-jest`.
- [~] Task: Conductor - User Manual Verification 'Phase 1: Environment & Build Setup' (Protocol in workflow.md)

## Phase 2: Core Module Refactoring
- [ ] Task: Refactor Core Components to TS
    - [ ] Convert `shared/observability/tracing.js` -> `tracing.ts`. Define types for SDK initialization.
    - [ ] Convert `shared/observability/logger.js` -> `logger.ts`. Implement custom formatting logic with OTel types.
    - [ ] Convert `shared/observability/metrics.js` -> `metrics.ts`. Define interfaces for business metrics and labels.
- [ ] Task: Refactor Middlewares to TS
    - [ ] Convert `shared/observability/middlewares/requestLogger.js` -> `requestLogger.ts`. Extend Express `Request` type.
    - [ ] Convert `shared/observability/middlewares/metricsMiddleware.js` -> `metricsMiddleware.ts`.
- [ ] Task: Consolidated Entry Point
    - [ ] Create `shared/index.ts` exporting all observability components.
    - [ ] Remove legacy `shared/index.js` and `shared/index.d.ts`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Module Refactoring' (Protocol in workflow.md)

## Phase 3: Test Refactoring & Validation
- [ ] Task: Convert Unit Tests to TS
    - [ ] Convert `shared/tests/logger.test.js` -> `logger.test.ts`.
    - [ ] Convert `shared/tests/metrics.test.js` -> `metrics.test.ts`.
    - [ ] Convert `shared/tests/middlewares.test.js` -> `middlewares.test.ts`.
- [ ] Task: Validation & Build
    - [ ] Write Tests: Ensure all refactored tests pass in the new TS environment.
    - [ ] Implement: Run `pnpm build` in the shared package to verify type generation.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Test Refactoring & Validation' (Protocol in workflow.md)

## Phase 4: Service Integration Update
- [ ] Task: Update Microservices Imports
    - [ ] Update `api-gateway`, `auth-service`, and `product-service` to use the consolidated `import { ... } from '@ecommerce/shared'` syntax.
    - [ ] Verify: Run builds for all services to ensure type compatibility.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Service Integration Update' (Protocol in workflow.md)
