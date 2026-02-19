# Implementation Plan - Shop Page Frontend V1

## Phase 1: Setup & Foundations
- [x] Task: Install @hello-pangea/dnd dependency
- [x] Task: Create shadcn/ui Tabs component wrapper
- [x] Task: Create ShopPage TypeScript types
- [x] Task: Create i18n translation files (IT/EN)
- [ ] Task: Conductor - User Manual Verification 'Phase 1'

## Phase 2: Services & Data Layer
- [x] Task: Create shopPages.service.ts with mock data
- [x] Task: Create useShopPagesQuery.ts query hooks
- [ ] Task: Conductor - User Manual Verification 'Phase 2'

## Phase 3: UI Components
- [x] Task: Create PagesSidebar with DnD reordering
- [x] Task: Create PageEditor with HTML/Preview tabs
- [x] Task: Create PageConfig placeholder
- [ ] Task: Conductor - User Manual Verification 'Phase 3'

## Phase 4: Page Assembly & Routing
- [x] Task: Create ShopPages/index.tsx main page with VENDOR guard
- [x] Task: Add /shop-pages route to router
- [x] Task: Add vendor navigation link in Header
- [ ] Task: Conductor - User Manual Verification 'Phase 4'

## Phase 5: Build & Verification
- [x] Task: Verify build compiles without errors
- [ ] Task: Manual verification of all features

## Phase 6: Site Builder — No-code page builder
- [x] Task: Create builder types (types/builder.ts)
- [x] Task: Add builder Json? field to Prisma schema + migration
- [x] Task: Backend API (repository, service, controller, routes) for GET/PUT builder
- [x] Task: Frontend service + query hooks (getBuilder, saveBuilder, useBuilderQuery, useSaveBuilder)
- [x] Task: Zustand builder store (builderStore.ts) with tree manipulation helpers
- [x] Task: Auto-save hook with 800ms debounce (useAutoSaveBuilder.ts)
- [x] Task: shadcn/ui prerequisites (Label, Select components)
- [x] Task: Block catalog + factory (blockCatalog.ts)
- [x] Task: BlockLibrary component (DnD source panel)
- [x] Task: BuilderCanvas + CanvasBlock (recursive DnD drop zone)
- [x] Task: PropertyInspector (dynamic form per block type)
- [x] Task: SiteBuilder orchestrator (DragDropContext, 3-column layout)
- [x] Task: Modify PageEditor to add "Site Builder" tab
- [x] Task: Modify index.tsx to pass pageId, manage tab state, hide PageConfig in builder mode
- [x] Task: i18n translations for builder (IT + EN)
- [x] Task: Build verification — pnpm build compiles without errors
- [ ] Task: Conductor - User Manual Verification 'Phase 6'
