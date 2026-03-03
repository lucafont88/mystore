# Feature Log

Cronologia completa di tutte le funzionalità implementate nella piattaforma.

> **Aggiornato al:** 2026-03-02

---

## Riepilogo feature implementate

| Feature | Data | Track | Stato |
|---------|------|-------|-------|
| Microservizi base + Auth Service | 2026-02-05 | `init_microservices_auth_20260205` | ✅ |
| Product Service (categorie + prodotti) | 2026-02-06 | `product_service_20260206` | ✅ |
| Containerizzazione Docker Compose | 2026-02-06 | `docker_service_20260206` | ✅ |
| Observability Stack (LGTM) | 2026-02-09 | `observability_20260209` | ✅ |
| Refactor Observability → TypeScript | 2026-02-09 | `observability_ts_refactor_20260209` | ✅ |
| OTel Collector centralizzato | 2026-02-09 | `observability_collector_20260209` | ✅ |
| Migrazione Jest → Vitest | 2026-02-09 | `jest_to_vitest_migration_20260209` | ✅ |
| Frontend Auth + Prodotti (React) | 2026-02-10 | `frontend_auth_products_20260210` | ✅ |
| Shop Page Service (MinIO + RabbitMQ) | 2026-02-13 | `shop_page_service_20260213` | ✅ |
| Fix applicazione (path, contratti API) | 2026-02-13 | `fix_current_application_20260213` | ✅ |
| Shop Page Frontend V1 (builder DnD) | 2026-02-16 | `shop_page_frontend_v1_20260216` | ✅ |
| Prodotti digitali + Bundle | 2026-02-23 | `digital_products_bundles_20260223` | ✅ |
| Order Service + Vendor Dashboard | 2026-02-24 | `order_service_vendor_dashboard_20260224` | ✅ |
| Cache Redis categorie + Admin Dashboard | 2026-02-26 | `redis_cache_categories_20260226` | ✅ |
| Admin Panel — Gestione Utenti | 2026-03-01 | `admin_panel_20260301` | 🚧 in corso |

---

## Dettaglio feature

### 1. Microservizi base + Auth Service

**Obiettivo:** setup dell'architettura a microservizi con autenticazione JWT e RBAC.

**Componenti:**
- API Gateway (porta 3000) con routing e rate limiting
- Auth Service (porta 3001) con Prisma + PostgreSQL
- Ruoli: `CUSTOMER`, `VENDOR`, `ADMIN`, `SUPPORT`
- JWT access token + refresh token
- Middleware `authenticate` + `authorize(['ROLE'])`
- Password hashing con argon2

---

### 2. Product Service

**Obiettivo:** gestione catalogo prodotti e categorie.

**Componenti:**
- Product Service (porta 3002) con Prisma + PostgreSQL
- CRUD prodotti (vendor/admin)
- Categorie gerarchiche
- Ricerca full-text e filtri
- Accesso pubblico al catalogo

---

### 3. Containerizzazione Docker Compose

**Obiettivo:** orchestrazione locale di tutti i servizi.

**Componenti:**
- Multi-stage Dockerfile per ogni servizio
- `docker-compose.yml` con tutti i servizi
- PostgreSQL con database separati per ogni servizio
- Redis e RabbitMQ

---

### 4–6. Observability Stack (LGTM)

**Obiettivo:** monitoraggio completo con logging, metriche e tracing correlati.

**Stack:**
- **Pino** — logging strutturato JSON nei servizi Node.js
- **Loki + Promtail** — aggregazione log
- **OpenTelemetry SDK** — strumentazione metriche + tracing
- **Prometheus** — raccolta metriche
- **Tempo** — distributed tracing
- **Grafana** — dashboard con correlazione log/metriche/traces
- **OTel Collector** — collector centralizzato con persistent queues
- Tutto refactorizzato in TypeScript nel pacchetto `@ecommerce/shared`

---

### 7. Migrazione Jest → Vitest

**Obiettivo:** uniformare il framework di test all'intero workspace.

**Risultato:** tutti i microservizi e i pacchetti shared usano Vitest con workspace setup e coverage v8.

---

### 8. Frontend Auth + Prodotti

**Obiettivo:** prima versione del frontend.

**Stack:** React 18 + TypeScript + Vite + Zustand + TanStack Query + shadcn/ui + Tailwind (tema indaco/blu)

**Pagine:**
- Login / Registrazione
- Catalogo prodotti con filtri
- Dettaglio prodotto
- Carrello (Zustand store)
- Checkout

**Frontend proxy:** Vite dev server proxya `/api` → API Gateway (3000) via `vite.config.ts`.

---

### 9. Shop Page Service

**Obiettivo:** permettere ai vendor di creare pagine vetrina HTML personalizzate.

**Componenti:**
- Shop Page Service (porta 3003) con Prisma + PostgreSQL
- HTML salvato su **MinIO** (non nel DB): campo `htmlKey` nel DB contiene la chiave MinIO
- `getPages` restituisce `{ items, total }` (paginato)
- `getPage` include `htmlContent` letto da MinIO nella risposta
- Integrazione RabbitMQ per eventi

---

### 10. Fix applicazione

**Obiettivo:** correzione discrepanze tra frontend e backend emerse nel testing.

**Fix:**
- Path API mismatch
- Contratti dati auth non allineati
- Configurazione test

---

### 11. Shop Page Frontend V1

**Obiettivo:** editor visuale per shop pages.

**Componenti:**
- Layout a 3 colonne (sidebar componenti / canvas / proprietà)
- Drag-and-drop dei blocchi
- HTML editor con preview in tempo reale
- Site Builder visuale
- Pulsanti Preview Draft / Publish
- Salvataggio asincrono

---

### 12. Prodotti Digitali + Bundle

**Obiettivo:** supporto a prodotti non fisici e bundle multi-prodotto.

**Tipi di prodotto (enum `ProductType`):**
| Tipo | Descrizione |
|------|-------------|
| `PHYSICAL` | Prodotto fisico con stock |
| `DIGITAL_FILE` | File scaricabile (salvato su MinIO) |
| `DIGITAL_LICENSE` | Chiavi di licenza (import bulk, assegnazione singola) |
| `DIGITAL_ACCESS` | Abbonamenti / accessi temporizzati |

**Bundle:**
- Prodotti fisici + digitali misti
- Campo `discountPercent` per sconto automatico
- `BundleItem` con constraint unique (no duplicati)
- Visualizzazione prezzo originale vs scontato

**Frontend:**
- Vendor: form multi-step creazione prodotto con upload file
- Vendor: gestione license keys
- Vendor: CRUD bundle con product picker
- Pubblico: pagine bundle con prodotti inclusi
- Carrello: enforce `quantity=1` per prodotti digitali

---

### 13. Order Service + Vendor Dashboard

**Obiettivo:** ciclo completo degli ordini e dashboard analytics vendor.

**Order Service (porta 3004):**
- Schema `Order` + `OrderItem` (con `vendorId` per filtraggio)
- Creazione ordini dal checkout
- Lista ordini per utente
- Statistiche aggregate per vendor e per admin

**Vendor Dashboard:**
- Card statistiche: totale ordini, ricavi totali, media ordini/giorno
- AreaChart (Recharts) vendite giornaliere con selettore periodo
- Link rapidi a prodotti e bundle

**Integrazione frontend:**
- `vendorId` aggiunto a `CartItem` in `cartStore.ts`
- Checkout chiama `ordersService.createOrder()`
- Header vendor semplificato: singolo link "Dashboard"

---

### 14. Cache Redis Categorie + Admin Dashboard

**Obiettivo:** performance per le categorie + prima versione admin panel.

**Cache Redis:**
- Cache-aside pattern per `GET /categories`
- Redis DB 1 (separato da auth su DB 0)
- TTL dinamico: scade ogni giorno alle 03:30 AM
- Graceful fallback al DB se Redis non disponibile
- Invalidazione automatica su create/update/delete categoria

**Admin Dashboard:**
- Layout admin con sidebar (React Router nested routes)
- Dashboard con BarChart ordini (Recharts) + stat card + selettore periodo
- CRUD categorie con invalidazione cache

---

### 15. Admin Panel — Gestione Utenti (in corso)

**Obiettivo:** pannello di amministrazione completo degli utenti.

**Schema database:**
- Aggiunto `isBanned Boolean @default(false)` al model `User`
- Aggiunto `lastLoginAt DateTime?` al model `User`
- Migrazione: `20260301090000_add_user_management_fields`

**Backend (auth-service):**
- Check `isBanned` al login → 401 `Account bannato`
- Aggiornamento automatico `lastLoginAt` ad ogni login riuscito (fire-and-forget)
- 4 endpoint admin: list, changeRole, ban/unban, resetPassword

**Gateway:**
- Route `/api/v1/admin/*` → auth-service con `pathRewrite`

**Frontend:**
- Tabella utenti con badge ruolo + stato
- Dialog cambia ruolo (Select)
- Dialog ban/unban con conferma
- Dialog reset password con password temporanea copiabile
- Sidebar aggiornata con link "Gestisci Utenti"
- Traduzioni IT + EN complete

---

## Stack tecnologico completo

### Backend
| Tecnologia | Versione | Utilizzo |
|-----------|---------|---------|
| Node.js | 20 LTS | Runtime |
| TypeScript | 5.x | Linguaggio |
| Express.js | 4.x | Framework HTTP |
| Prisma | 5.x | ORM |
| PostgreSQL | 15 | Database principale |
| Redis | 7 | Cache + sessioni |
| argon2 | latest | Hashing password |
| MinIO | latest | Object storage (S3-compatible) |
| RabbitMQ | 3.x | Message broker |
| JWT | latest | Autenticazione |
| http-proxy-middleware | 3.x | Proxy nel gateway |

### Frontend
| Tecnologia | Versione | Utilizzo |
|-----------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5.x | Linguaggio |
| Vite | 5.x | Build tool + dev server |
| Zustand | 4.x | State management client |
| TanStack Query | 5.x | Server state + cache |
| shadcn/ui | latest | Componenti UI |
| Tailwind CSS | 3.x | Styling |
| React Router | 6.x | Routing |
| react-i18next | latest | Internazionalizzazione |
| Recharts | latest | Grafici (AreaChart, BarChart) |
| Radix UI | latest | Primitivi accessibili |

### Infrastruttura
| Tecnologia | Utilizzo |
|-----------|---------|
| Docker + Docker Compose | Orchestrazione locale |
| Docker Swarm | Staging / mid-scale |
| Kubernetes | Produzione |
| OpenTelemetry | Metriche + tracing |
| Loki + Promtail | Logging centralizzato |
| Prometheus | Metriche |
| Grafana | Visualizzazione osservabilità |
| Vitest | Testing |
