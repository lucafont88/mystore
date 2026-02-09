# Specification: Refactor Observability Module to TypeScript

## 1. Overview
Refactor the existing observability module in `@ecommerce/shared` from JavaScript to native TypeScript. This transition aims to improve developer experience through better autocompletion, ensure type safety across the microservices stack, and align the shared library with the project's overall technology standards.

## 2. Goals
- **Native TypeScript Migration:** Convert all `.js` files in `shared/observability` and `shared/tests` to `.ts`.
- **Strong Typing:** Define comprehensive interfaces and types for all observability components (Logger options, Metric configurations, Tracing SDK setup).
- **Consolidated Exports:** Simplify the package API by exporting all public members directly from `shared/index.ts`.
- **Testing Standard:** Configure `ts-jest` within the `shared` package to support TypeScript-based unit and integration tests.
- **Build Pipeline:** Implement a TypeScript build process for the shared package.

## 3. Technical Requirements

### 3.1 Package Configuration
- **`shared/package.json`:** Add `typescript`, `ts-node`, `ts-jest`, and `@types/node` to devDependencies. Add a `build` script (`tsc`).
- **`shared/tsconfig.json`:** Create a configuration extending the root `tsconfig.base.json`.
- **`shared/jest.config.js`:** Update to use `ts-jest` and match `.ts` test files.

### 3.2 Refactoring Details
- **Logger (`logger.ts`):** Define types for log levels and custom context fields. Use ES modules (`import/export`).
- **Metrics (`metrics.ts`):** Define interfaces for `createBusinessMetric` parameters and specific HTTP labels.
- **Tracing (`tracing.ts`):** Properly type the OTel SDK configuration and resource attributes.
- **Middlewares:** Properly type Express `Request`, `Response`, and `NextFunction`. Extend the Express `Request` interface to include the `log` and `id` properties.
- **Index (`index.ts`):** Export everything from a single entry point.

### 3.3 Service Updates
- Update `api-gateway`, `auth-service`, and `product-service` to import from `@ecommerce/shared` directly.
- Remove the legacy `shared/index.d.ts` file as it will be superseded by native TS definitions.

## 4. Acceptance Criteria
- `pnpm --filter @ecommerce/shared build` executes without errors and generates type definitions.
- `pnpm --filter @ecommerce/shared test` executes all tests (now in `.ts`) and they pass with 100% success.
- API Gateway and other services build successfully using the new consolidated imports.
- Developers get full IntelliSense support when using `@ecommerce/shared` in any service.
