# Specification: Migration from Jest to Vitest

## 1. Overview
Migrate the entire testing framework of the workspace (all microservices and shared packages) from Jest to Vitest. This transition aims to improve test execution speed, native TypeScript support, and alignment with the modern ESM ecosystem used in the project.

## 2. Goals
- **Full Migration:** Replace Jest with Vitest in `api-gateway`, `auth-service`, `product-service`, and `@ecommerce/shared`.
- **Centralized Configuration:** Establish a root `vitest.workspace.ts` (or base config) to manage testing configuration globally while allowing service-specific overrides.
- **Explicit Imports:** Refactor all test files to explicitly import testing primitives (`describe`, `it`, `expect`, `vi`) from `vitest` instead of relying on globals.
- **Coverage Provider:** Use the `v8` provider for fast and accurate code coverage reporting.
- **Dependency Cleanup:** Remove Jest and related dependencies (`ts-jest`, `@types/jest`) after successful verification.

## 3. Technical Requirements

### 3.1 Root Configuration
- **`vitest.workspace.ts`:** Define the workspace structure for Vitest to discover projects.
- **Root `package.json`:** Add `vitest` and `@vitest/coverage-v8` to devDependencies. Update `test` scripts to use `vitest`.

### 3.2 Service Configuration
For each package (`services/api-gateway`, `services/auth-service`, `services/product-service`, `shared`):
- **`vitest.config.ts`:** Create configuration files.
- **Dependencies:** Remove `jest`, `ts-jest`, `@types/jest`. Add `vitest`.
- **Scripts:** Update `package.json` scripts (`test`, `test:watch`, `test:coverage`) to execute `vitest`.

### 3.3 Code Refactoring
- **Imports:** Update all `*.test.ts` files to import `describe`, `it`, `expect`, `vi`, `beforeAll`, `afterAll`, `beforeEach` from `vitest`.
- **Mocks:** Replace `jest.fn()` with `vi.fn()`, `jest.spyOn()` with `vi.spyOn()`, and `jest.mock()` with `vi.mock()`.
- **Supertest:** Ensure integration with `supertest` continues to work seamlessly.

## 4. Acceptance Criteria
- `pnpm test` in the root executes tests for all packages using Vitest.
- `pnpm test` within each service directory executes local tests correctly.
- All existing tests (unit and integration) pass without modification to their logic (only imports/syntax).
- Code coverage reports are generated using the `v8` provider.
- Jest dependencies are completely removed from the `pnpm-lock.yaml`.
