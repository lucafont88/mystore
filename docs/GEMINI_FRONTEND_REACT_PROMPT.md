# Prompt Gemini CLI - Frontend E-commerce React + Vite + TypeScript

Prompt completo per implementare il frontend e-commerce con Vite, React 18, TypeScript e stack moderno.

---

## PROMPT

```
Sei un Senior Frontend Developer esperto di React, TypeScript e architetture e-commerce. Devi implementare il frontend per un e-commerce B2B/B2C con Vite e React.

## CONTESTO PROGETTO

### Backend Esistente (Microservizi)

```
API Endpoints disponibili:
├── API Gateway: http://localhost:3000/api
│   ├── /auth/*        → Auth Service
│   ├── /products/*    → Product Service
│   ├── /cart/*        → Cart Service (futuro)
│   └── /orders/*      → Order Service (futuro)

Autenticazione: JWT (Bearer token)
```

### Struttura Monorepo Esistente

```
ecommerce-platform/
├── services/                    # Backend microservizi
│   ├── api-gateway/
│   ├── auth-service/
│   └── product-service/
├── shared/                      # Package condiviso backend
├── frontend/
│   └── store-app/              # ← FRONTEND DA IMPLEMENTARE
├── infrastructure/
├── pnpm-workspace.yaml
└── package.json
```

### Requisiti Tecnici

- **Build Tool**: Vite 5.x
- **Framework**: React 18.x
- **Linguaggio**: TypeScript 5.x (strict mode)
- **Routing**: React Router DOM 6.x
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query) v5
- **Styling**: Tailwind CSS 3.x
- **Componenti UI**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **i18n**: react-i18next (IT, EN, DE, FR)
- **HTTP Client**: fetch nativo (wrapper tipizzato)
- **Package Manager**: pnpm
- **Testing**: Vitest 1.x

## ARCHITETTURA FRONTEND

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND SPA                                    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                           PAGES (Routes)                                 ││
│  │  /              → HomePage                                               ││
│  │  /products      → ProductsPage (lista + filtri)                         ││
│  │  /products/:id  → ProductDetailPage                                      ││
│  │  /cart          → CartPage                                               ││
│  │  /checkout      → CheckoutPage (multi-step)                             ││
│  │  /account       → AccountPage (protetta)                                 ││
│  │  /account/orders→ OrdersPage (protetta)                                  ││
│  │  /login         → LoginPage                                              ││
│  │  /register      → RegisterPage                                           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                          COMPONENTS                                      ││
│  │                                                                          ││
│  │  ui/           → Button, Input, Card, Modal, etc. (shadcn)              ││
│  │  layout/       → Header, Footer, Sidebar, MobileNav                     ││
│  │  features/                                                               ││
│  │    products/   → ProductCard, ProductGrid, ProductFilters               ││
│  │    cart/       → CartItem, CartSummary, CartDrawer                      ││
│  │    checkout/   → CheckoutForm, PaymentForm, AddressForm                 ││
│  │    auth/       → LoginForm, RegisterForm, ProtectedRoute               ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────┬──────────────────┬───────────────────────────────────┐│
│  │      HOOKS       │     STORES       │           SERVICES                ││
│  │                  │    (Zustand)     │           (API)                   ││
│  │ useAuth          │ useAuthStore     │ authService                       ││
│  │ useCart          │ useCartStore     │ productsService                   ││
│  │ useProducts      │ useUIStore       │ cartService                       ││
│  │ useDebounce      │                  │ ordersService                     ││
│  │ useLocalStorage  │                  │                                   ││
│  └──────────────────┴──────────────────┴───────────────────────────────────┘│
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                      TANSTACK QUERY                                      ││
│  │                                                                          ││
│  │  QueryClient → Cache, Retry, Refetch, Optimistic Updates                ││
│  │                                                                          ││
│  │  useQuery      → GET requests (products, user, orders)                  ││
│  │  useMutation   → POST/PUT/DELETE (cart, checkout, auth)                 ││
│  │  useInfiniteQuery → Pagination prodotti                                 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                      FETCH WRAPPER (api.ts)                              ││
│  │                                                                          ││
│  │  baseURL: /api (proxy via Vite)                                         ││
│  │  features:                                                               ││
│  │    - Tipizzato con generics                                             ││
│  │    - Aggiunge Authorization header automaticamente                      ││
│  │    - Gestisce errori 401 (logout)                                       ││
│  │    - JSON parsing automatico                                            ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## STRUTTURA DIRECTORY

```
frontend/store-app/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── components.json                 # shadcn/ui config
├── package.json
├── .env.example
├── .env.local                      # (gitignored)
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── locales/                    # i18n JSON files
│       ├── it/
│       │   ├── common.json
│       │   ├── products.json
│       │   ├── cart.json
│       │   └── checkout.json
│       ├── en/
│       ├── de/
│       └── fr/
│
└── src/
    ├── main.tsx                    # Entry point
    ├── App.tsx                     # Root component + providers
    ├── vite-env.d.ts
    │
    ├── routes/
    │   ├── index.tsx               # Route definitions
    │   └── ProtectedRoute.tsx      # Auth guard
    │
    ├── pages/
    │   ├── Home/
    │   │   └── index.tsx
    │   ├── Products/
    │   │   ├── index.tsx           # Lista prodotti
    │   │   └── [id].tsx            # Dettaglio prodotto
    │   ├── Cart/
    │   │   └── index.tsx
    │   ├── Checkout/
    │   │   └── index.tsx
    │   ├── Account/
    │   │   ├── index.tsx
    │   │   └── Orders.tsx
    │   ├── Auth/
    │   │   ├── Login.tsx
    │   │   └── Register.tsx
    │   └── NotFound.tsx
    │
    ├── components/
    │   ├── ui/                     # shadcn/ui components
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── sheet.tsx           # Per cart drawer
    │   │   ├── skeleton.tsx
    │   │   ├── toast.tsx
    │   │   └── ... (altri shadcn)
    │   │
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── MobileNav.tsx
    │   │   ├── Layout.tsx          # Wrapper con Header+Footer
    │   │   └── Container.tsx
    │   │
    │   └── features/
    │       ├── products/
    │       │   ├── ProductCard.tsx
    │       │   ├── ProductGrid.tsx
    │       │   ├── ProductFilters.tsx
    │       │   ├── ProductSkeleton.tsx
    │       │   └── ProductImageGallery.tsx
    │       ├── cart/
    │       │   ├── CartItem.tsx
    │       │   ├── CartSummary.tsx
    │       │   ├── CartDrawer.tsx
    │       │   ├── CartBadge.tsx
    │       │   └── AddToCartButton.tsx
    │       ├── checkout/
    │       │   ├── CheckoutStepper.tsx
    │       │   ├── ShippingForm.tsx
    │       │   ├── PaymentForm.tsx
    │       │   └── OrderSummary.tsx
    │       └── auth/
    │           ├── LoginForm.tsx
    │           ├── RegisterForm.tsx
    │           └── UserMenu.tsx
    │
    ├── hooks/
    │   ├── useAuth.ts              # Auth utilities
    │   ├── useCart.ts              # Cart operations
    │   ├── useDebounce.ts
    │   ├── useLocalStorage.ts
    │   └── useMediaQuery.ts
    │
    ├── stores/
    │   ├── authStore.ts            # Zustand auth store
    │   ├── cartStore.ts            # Zustand cart store
    │   └── uiStore.ts              # UI state (sidebar, modals)
    │
    ├── services/
    │   ├── api.ts                  # Fetch wrapper tipizzato
    │   ├── auth.service.ts
    │   ├── products.service.ts
    │   ├── cart.service.ts
    │   └── orders.service.ts
    │
    ├── queries/
    │   ├── useProductsQuery.ts     # TanStack Query hooks
    │   ├── useProductQuery.ts
    │   ├── useUserQuery.ts
    │   ├── useOrdersQuery.ts
    │   └── useCartMutation.ts
    │
    ├── lib/
    │   ├── utils.ts                # cn() helper per Tailwind
    │   ├── formatters.ts           # Currency, date formatters
    │   └── validators.ts           # Zod schemas
    │
    ├── types/
    │   ├── index.ts
    │   ├── product.ts
    │   ├── cart.ts
    │   ├── order.ts
    │   ├── user.ts
    │   └── api.ts                  # API response types
    │
    ├── i18n/
    │   └── index.ts                # i18next configuration
    │
    └── styles/
        └── globals.css             # Tailwind imports + custom styles
```

## REQUISITI IMPLEMENTAZIONE

### FASE 1: Setup Progetto Base

#### 1. `package.json`

```json
{
  "name": "@ecommerce/store-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "@tanstack/react-query": "^5.20.0",
    "@tanstack/react-query-devtools": "^5.20.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "react-i18next": "^14.0.5",
    "i18next": "^23.8.2",
    "i18next-http-backend": "^2.4.3",
    "i18next-browser-languagedetector": "^7.2.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "class-variance-authority": "^0.7.0",
    "lucide-react": "^0.323.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@typescript-eslint/eslint-plugin": "^7.0.1",
    "@typescript-eslint/parser": "^7.0.1",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.3",
    "vitest": "^1.3.0"
  }
}
```

#### 2. `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
});
```

#### 3. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 4. `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### FASE 2: Core Services

#### 5. `src/services/api.ts` - Fetch Wrapper Tipizzato

```typescript
// Requisiti:
// - Wrapper fetch tipizzato con generics
// - Base URL da env (o /api con proxy Vite)
// - Funzioni: get<T>, post<T>, put<T>, delete<T>
// - Aggiunge Authorization Bearer token da authStore
// - Gestione errori:
//   - 401 → logout automatico e redirect a /login
//   - 4xx/5xx → throw ApiError con messaggio
// - JSON parsing automatico
// - Content-Type: application/json di default
// - Nessuna dipendenza esterna (solo fetch nativo)

interface ApiError {
  message: string;
  code?: string;
  status: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;  // Query params
}

// Export:
// - api.get<T>(url, options?): Promise<T>
// - api.post<T>(url, data, options?): Promise<T>
// - api.put<T>(url, data, options?): Promise<T>
// - api.delete<T>(url, options?): Promise<T>
// - ApiError class
```

#### 6. `src/stores/authStore.ts` - Auth State

```typescript
// Requisiti:
// - Zustand store con persist middleware (localStorage)
// - State: user, token, isAuthenticated, isLoading
// - Actions: login, logout, setUser, refreshToken
// - Computed: isAuthenticated basato su token validity

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

// Export: useAuthStore
```

#### 7. `src/stores/cartStore.ts` - Cart State

```typescript
// Requisiti:
// - Zustand store con persist middleware
// - State: items, isOpen (drawer)
// - Actions: addItem, removeItem, updateQuantity, clearCart
// - Computed: totalItems, totalPrice, isEmpty
// - Sync con backend quando user loggato

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  get totalItems(): number;
  get totalPrice(): number;
}

// Export: useCartStore
```

### FASE 3: TanStack Query Setup

#### 8. `src/queries/useProductsQuery.ts`

```typescript
// Requisiti:
// - useQuery per lista prodotti con filtri
// - useInfiniteQuery per pagination
// - Filtri: category, priceMin, priceMax, search, sort
// - Stale time: 5 minuti
// - Placeholder data per UX

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

// Export:
// - useProductsQuery(filters: ProductFilters)
// - useInfiniteProductsQuery(filters: ProductFilters)
// - useProductQuery(id: string)
// - productKeys (query key factory)
```

#### 9. `src/queries/useCartMutation.ts`

```typescript
// Requisiti:
// - useMutation per operazioni cart
// - Optimistic updates
// - Invalidate queries on success
// - Error handling con rollback

// Export:
// - useAddToCartMutation()
// - useUpdateCartItemMutation()
// - useRemoveFromCartMutation()
// - useClearCartMutation()
```

### FASE 4: Components

#### 10. `src/components/features/products/ProductCard.tsx`

```typescript
// Requisiti:
// - Card prodotto responsive
// - Immagine con lazy loading e skeleton
// - Nome, prezzo, prezzo scontato (se presente)
// - Badge "Nuovo" o "In offerta"
// - Bottone "Aggiungi al carrello" con loading
// - Link a pagina dettaglio
// - Animazione hover
// - i18n per testi

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}
```

#### 11. `src/components/features/cart/CartDrawer.tsx`

```typescript
// Requisiti:
// - Sheet (sidebar) da destra
// - Lista items con quantità modificabile
// - Rimuovi item
// - Subtotale e totale
// - Bottone "Vai al checkout"
// - Empty state
// - i18n

// Usa: @radix-ui/react-dialog o shadcn Sheet
```

#### 12. `src/components/layout/Header.tsx`

```typescript
// Requisiti:
// - Logo con link a home
// - Navigazione principale (categorie)
// - Search bar con debounce
// - Language switcher (IT/EN/DE/FR)
// - Cart icon con badge quantità
// - User menu (login/account)
// - Mobile responsive (hamburger menu)
```

### FASE 5: Pages

#### 13. `src/pages/Products/index.tsx`

```typescript
// Requisiti:
// - Griglia prodotti responsive
// - Sidebar filtri (mobile: bottom sheet)
// - Filtri: categoria, prezzo, ordinamento
// - Search integrata
// - Pagination o infinite scroll
// - Loading skeletons
// - Empty state
// - URL sync con filtri (?category=shoes&sort=price_asc)
```

#### 14. `src/pages/Checkout/index.tsx`

```typescript
// Requisiti:
// - Multi-step form (Shipping → Payment → Review)
// - Stepper visuale
// - Form validation con Zod
// - Salvataggio stato fra step
// - Riepilogo ordine sidebar
// - Integrazione Stripe Elements (placeholder)
// - Success page dopo ordine
```

### FASE 6: i18n

#### 15. `src/i18n/index.ts`

```typescript
// Requisiti:
// - i18next configurato
// - Lazy loading traduzioni
// - Language detector (browser + localStorage)
// - Fallback: italiano
// - Namespace: common, products, cart, checkout, auth
```

#### 16. `public/locales/it/common.json`

```json
// Traduzioni italiane per namespace common:
// - navigation (home, products, cart, account, etc.)
// - actions (add, remove, save, cancel, etc.)
// - messages (success, error, loading, empty, etc.)
// - footer (about, contact, terms, privacy, etc.)
```

### FASE 7: Routing & App

#### 17. `src/routes/index.tsx`

```typescript
// Requisiti:
// - React Router v6 con createBrowserRouter
// - Layout route con Header/Footer
// - Protected routes per /account/*
// - 404 catch-all
// - Lazy loading per code splitting

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Routes:
// /                    → Home
// /products            → ProductsPage
// /products/:id        → ProductDetailPage
// /cart                → CartPage
// /checkout            → CheckoutPage (protected)
// /account             → AccountPage (protected)
// /account/orders      → OrdersPage (protected)
// /login               → LoginPage
// /register            → RegisterPage
// *                    → NotFoundPage
```

#### 18. `src/App.tsx`

```typescript
// Requisiti:
// - QueryClientProvider (TanStack Query)
// - RouterProvider
// - Toaster (notifiche)
// - i18n provider già inizializzato
// - Error boundary

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minuti
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

## OUTPUT RICHIESTO

Genera TUTTI i file con codice TypeScript/TSX completo e funzionante:

### Setup & Config (8 file)
1. `package.json`
2. `vite.config.ts`
3. `tsconfig.json`
4. `tsconfig.node.json`
5. `tailwind.config.js`
6. `postcss.config.js`
7. `components.json` (shadcn config)
8. `.env.example`

### Core (10 file)
9. `src/main.tsx`
10. `src/App.tsx`
11. `src/styles/globals.css`
12. `src/lib/utils.ts`
13. `src/services/api.ts`
14. `src/stores/authStore.ts`
15. `src/stores/cartStore.ts`
16. `src/stores/uiStore.ts`
17. `src/i18n/index.ts`
18. `src/routes/index.tsx`

### Types (5 file)
19. `src/types/index.ts`
20. `src/types/product.ts`
21. `src/types/cart.ts`
22. `src/types/user.ts`
23. `src/types/api.ts`

### Queries (4 file)
24. `src/queries/keys.ts`
25. `src/queries/useProductsQuery.ts`
26. `src/queries/useUserQuery.ts`
27. `src/queries/useCartMutation.ts`

### Components UI (5 file shadcn base)
28. `src/components/ui/button.tsx`
29. `src/components/ui/input.tsx`
30. `src/components/ui/card.tsx`
31. `src/components/ui/skeleton.tsx`
32. `src/components/ui/sheet.tsx`

### Components Layout (4 file)
33. `src/components/layout/Header.tsx`
34. `src/components/layout/Footer.tsx`
35. `src/components/layout/Layout.tsx`
36. `src/components/layout/MobileNav.tsx`

### Components Features (8 file)
37. `src/components/features/products/ProductCard.tsx`
38. `src/components/features/products/ProductGrid.tsx`
39. `src/components/features/products/ProductFilters.tsx`
40. `src/components/features/cart/CartDrawer.tsx`
41. `src/components/features/cart/CartItem.tsx`
42. `src/components/features/cart/AddToCartButton.tsx`
43. `src/components/features/auth/LoginForm.tsx`
44. `src/components/features/auth/ProtectedRoute.tsx`

### Pages (8 file)
45. `src/pages/Home/index.tsx`
46. `src/pages/Products/index.tsx`
47. `src/pages/Products/[id].tsx`
48. `src/pages/Cart/index.tsx`
49. `src/pages/Checkout/index.tsx`
50. `src/pages/Auth/Login.tsx`
51. `src/pages/Account/index.tsx`
52. `src/pages/NotFound.tsx`

### i18n (4 file)
53. `public/locales/it/common.json`
54. `public/locales/it/products.json`
55. `public/locales/en/common.json`
56. `public/locales/en/products.json`

## VINCOLI TECNICI

- **TypeScript strict mode**: No `any`, tipi espliciti ovunque
- **React 18**: Usa Suspense e lazy loading
- **Path alias**: Usa sempre `@/` per imports
- **shadcn/ui**: Segui convenzioni (cn utility, CVA per varianti)
- **i18n**: Tutti i testi visibili in JSON, mai hardcoded
- **Accessibilità**: aria-labels, keyboard navigation, focus management
- **Responsive**: Mobile-first, breakpoints Tailwind (sm, md, lg, xl)
- **Performance**: Lazy loading images, code splitting routes

## STILE E UX

- Design moderno, pulito, minimale
- Palette colori configurabile via CSS variables
- Animazioni sottili (hover, transizioni)
- Loading states per ogni operazione async
- Error states con retry
- Empty states informativi
- Toast notifications per feedback

Inizia generando tutti i file richiesti con codice completo e funzionante.
```

---

## ISTRUZIONI D'USO

### 1. Copia il Prompt

Copia tutto il testo tra i backtick ``` (dal "Sei un Senior..." fino a "...codice completo e funzionante.")

### 2. Esegui con Gemini

**Opzione A: Gemini CLI**
```bash
gemini chat
# Incolla il prompt
```

**Opzione B: Google AI Studio**
1. Vai su https://aistudio.google.com
2. Incolla e clicca "Run"

### 3. Crea i File

Gemini genererà ~56 file. Per ogni file:
```bash
# Crea le directory
mkdir -p frontend/store-app/src/{pages,components,hooks,stores,services,queries,types,lib,i18n,routes,styles}
mkdir -p frontend/store-app/src/components/{ui,layout,features/{products,cart,checkout,auth}}
mkdir -p frontend/store-app/src/pages/{Home,Products,Cart,Checkout,Account,Auth}
mkdir -p frontend/store-app/public/locales/{it,en,de,fr}

# Crea i file con il contenuto generato
```

### 4. Installa e Avvia

```bash
cd frontend/store-app
pnpm install
pnpm dev
# → http://localhost:5173
```

---

## STRUTTURA FINALE

```
frontend/store-app/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── public/
│   └── locales/{it,en,de,fr}/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes/
│   ├── pages/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── features/
│   ├── hooks/
│   ├── stores/
│   ├── services/
│   ├── queries/
│   ├── types/
│   ├── lib/
│   ├── i18n/
│   └── styles/
```

---

## STACK TECNOLOGICO

| Categoria | Libreria | Versione |
|-----------|----------|----------|
| Build | Vite | 5.x |
| UI | React | 18.x |
| Language | TypeScript | 5.x |
| Routing | React Router DOM | 6.x |
| State | Zustand | 4.x |
| Data | TanStack Query | 5.x |
| Forms | React Hook Form + Zod | 7.x / 3.x |
| Styling | Tailwind CSS | 3.x |
| Components | shadcn/ui | latest |
| Icons | Lucide React | latest |
| i18n | react-i18next | 14.x |
| HTTP | fetch nativo (wrapper) | - |
| Test | Vitest | 1.x |
