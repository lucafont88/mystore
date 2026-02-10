# Implementation Plan - Frontend for Auth and Products

## Phase 1: Project Scaffolding & Configuration [checkpoint: 886654c]
- [x] Task: Initialize Vite & Project Structure (5cf0bc0)
    - [ ] Create `frontend/store-app` directory and initialize with Vite (React + TS).
    - [ ] Configure `tsconfig.json`, `vite.config.ts`, and `tailwind.config.js` (Indigo/Blue theme).
    - [ ] Set up folder structure: `src/pages`, `src/components`, `src/hooks`, `src/stores`, etc.
- [x] Task: Configure Design System (shadcn/ui) (4c53c71)
    - [ ] Initialize `components.json`.
    - [ ] Install and configure base shadcn primitives (Button, Input, Card, Sheet, etc.).
- [x] Task: Implementation of i18n & Localization (e547c0b)
    - [ ] Set up `i18next` with `react-i18next` and language detector.
    - [ ] Create initial translation files for `it` and `en` (navigation, actions).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & Configuration' (Protocol in workflow.md)

## Phase 2: Core Infrastructure & State Management [checkpoint: bb9f708]
- [x] Task: Implement Typed API Client (`api.ts`) (6e55878)
    - [ ] Write Tests: Mock fetch to verify automatic Bearer token injection and 401 handling.
    - [ ] Implement: Generic fetch wrapper with global error handling.
- [x] Task: Implement Global Stores (Zustand) (87afcc0)
    - [ ] Implement: `authStore.ts` with local storage persistence.
    - [ ] Implement: `cartStore.ts` with basic add/remove logic and persistence.
    - [ ] Implement: `uiStore.ts` for managing drawers and modals.
- [x] Task: Configure Data Fetching (TanStack Query) (1020758)
    - [ ] Set up `QueryClient` and global provider in `App.tsx`.
    - [ ] Implement initial Query Key factory.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Infrastructure & State Management' (Protocol in workflow.md)

## Phase 3: Authentication & Protected Journeys [checkpoint: 6376391]
- [x] Task: Implement Auth Components & Logic (986b08d)
    - [ ] Write Tests: Verify LoginForm validation with Zod.
    - [ ] Implement: `LoginForm` and `RegisterForm` components.
    - [ ] Implement: `ProtectedRoute` guard component.
- [x] Task: Build Authentication Pages (12f83de)
    - [ ] Implement: `LoginPage` and `RegisterPage` layouts using Indigo/Blue accents.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Authentication & Protected Journeys' (Protocol in workflow.md)

## Phase 4: Product Catalog & Details [checkpoint: c322fbc]
- [x] Task: Implement Product Listing Flow (f70726a)
    - [ ] Implement: `ProductCard` with hover animations and Add-to-Cart functionality.
    - [ ] Implement: `ProductGrid` with responsive breakpoints.
    - [ ] Implement: `useProductsQuery` hook for fetching and filtering.
- [x] Task: Build Product Pages (e0e3b0c)
    - [ ] Implement: `ProductsPage` with sidebar filters and search integration.
    - [ ] Implement: `ProductDetailPage` with image gallery and full descriptions.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Product Catalog & Details' (Protocol in workflow.md)

## Phase 5: Cart & Checkout Scaffolding
- [ ] Task: Implement Shopping Cart UI
    - [ ] Implement: `CartDrawer` using shadcn Sheet component.
    - [ ] Implement: `CartItem` with quantity updates.
- [ ] Task: Build Checkout Skeleton
    - [ ] Implement: `CheckoutPage` using internal state for the multi-step flow.
    - [ ] Implement: Stepper component and final Order Summary.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Cart & Checkout Scaffolding' (Protocol in workflow.md)

## Phase 6: Final Integration & Polish
- [ ] Task: Build Main Layout & Home Page
    - [ ] Implement: `Header` with search debounce, user menu, and language switcher.
    - [ ] Implement: `HomePage` with the high-impact **Hero Section**.
- [ ] Task: Final Build & E2E Validation
    - [ ] Verify: Run `pnpm build` and ensure all assets are correctly generated.
    - [ ] Verify: Manual E2E flow (Login -> Browse -> Add to Cart -> Checkout).
- [ ] Task: Conductor - User Manual Verification 'Phase 6: Final Integration & Polish' (Protocol in workflow.md)
