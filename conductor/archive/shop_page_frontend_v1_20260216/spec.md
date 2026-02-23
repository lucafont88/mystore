# Specification - Shop Page Frontend V1

## Overview
Implement the vendor-facing frontend for the shop-page-service. Vendors can create, edit, reorder, and preview their HTML shop pages through a 3-column layout interface. Includes a no-code Site Builder with drag-and-drop block editing.

## Tech Stack
- **Framework:** React 18+ with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (Indigo/Blue theme)
- **State Management:** Zustand (auth, builder), React useState (local)
- **Data Fetching:** TanStack Query (React Query)
- **I18n:** i18next
- **Drag and Drop:** @hello-pangea/dnd

## Core Features
1. **Access Control:**
   - Page accessible only to users with VENDOR role.
   - Non-vendor users see an access denied message.
2. **3-Column Layout:**
   - **Left Sidebar:** List of vendor's pages with drag-and-drop reordering, "Create new page" button, rename/delete actions.
   - **Center Editor:** Tabbed view with HTML Source (textarea), Preview (sandboxed iframe), and Site Builder.
   - **Right Config:** Empty placeholder for future settings (hidden in builder mode).
3. **Page Selection:**
   - Selecting a page in the sidebar updates the editor content.
   - Creating a new page adds it to the list and selects it.
4. **Mock Data:**
   - API calls use mock data fallback when backend is unavailable.
5. **Site Builder (Phase 6):**
   - 3-column inner layout: Block Library (left), Canvas (center), Property Inspector (right).
   - Block types: product, button, row, box, table.
   - Drag-and-drop from library to canvas, reorder within canvas, nested containers.
   - Property inspector with dynamic forms per block type.
   - Zustand store keyed by pageId for multi-page editing.
   - Backend persistence via GET/PUT /api/v1/shop-pages/:id/builder (Json field in Prisma).
   - Auto-save with 800ms debounce using Zustand subscribe API.

## Design Goals
- Clean, professional UI consistent with existing Indigo/Blue theme.
- Modular, extensible code for future V2 iterations.
- Responsive sidebar collapse on smaller screens.
