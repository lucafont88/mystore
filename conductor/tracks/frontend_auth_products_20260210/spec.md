# Specification - Frontend for Auth and Products

## Overview
Implement the initial frontend for the e-commerce platform using React, TypeScript, and Vite. The focus is on core authentication flows, product browsing, and the shopping cart/checkout skeleton.

## Tech Stack
- **Framework:** React 18+ with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (Indigo/Blue theme)
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **I18n:** i18next
- **Forms:** React Hook Form + Zod

## Core Features
1.  **Authentication:**
    - Login and Registration pages.
    - JWT token management with Zustand persistence.
    - Protected routes.
2.  **Product Catalog:**
    - Product listing grid with responsive design.
    - Product detail page with image and description.
    - Client-side filtering and search integration.
3.  **Shopping Cart:**
    - Persistent cart (Zustand + LocalStorage).
    - Cart drawer/sidebar for quick access.
4.  **Checkout:**
    - Multi-step checkout skeleton.
    - Order summary.

## Design Goals
- Clean, professional UI with Indigo/Blue accents.
- Responsive design for mobile and desktop.
- Internationalization support (IT/EN).
