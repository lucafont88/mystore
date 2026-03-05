# Architettura del Sistema

Documentazione dell'architettura attuale della piattaforma e-commerce basata su microservizi.

> **Aggiornato al:** 2026-03-02

---

## Panoramica

La piattaforma è un e-commerce full-stack basato su architettura a microservizi. Ogni dominio funzionale è incapsulato in un servizio indipendente, con un API Gateway come unico punto di ingresso per il frontend.

```
                        ┌──────────────────────────────┐
                        │    Frontend React (Vite)       │
                        │         porta 5173             │
                        │   /api → proxy → Gateway       │
                        └──────────────┬───────────────┘
                                       │
                                       ▼
                        ┌──────────────────────────────┐
                        │       API Gateway             │
                        │         porta 3000            │
                        │  • Proxy routing              │
                        │  • Rate limiting              │
                        │  • Logging centralizzato      │
                        └────┬──────┬──────┬──────┬────┘
                             │      │      │      │
              ┌──────────────┘      │      │      └──────────────┐
              ▼                     ▼      ▼                     ▼
   ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
   │  Auth Service    │  │Product Svc   │  │ Order Svc    │  │ Shop Page Svc    │
   │    porta 3001    │  │  porta 3002  │  │  porta 3004  │  │   porta 3003     │
   │                  │  │              │  │              │  │                  │
   │ • Auth (JWT)     │  │ • Prodotti   │  │ • Ordini     │  │ • Shop pages     │
   │ • Registrazione  │  │ • Categorie  │  │ • Checkout   │  │ • HTML editor    │
   │ • Admin users    │  │ • Digitali   │  │ • Stats      │  │ • Pubblicazione  │
   │ • Ban/Reset pwd  │  │ • Bundle     │  │ • Vendor     │  │                  │
   └────────┬─────────┘  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘
            │                   │                  │                   │
            ▼                   ▼                  ▼                   ▼
   ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
   │  PostgreSQL       │  │ PostgreSQL   │  │ PostgreSQL   │  │   PostgreSQL      │
   │   auth_db         │  │ products_db  │  │  orders_db   │  │  shop_pages_db    │
   └──────────────────┘  └──────┬───────┘  └──────────────┘  └──────────────────┘
                                │
                        ┌───────┴──────┐
                        │    Redis     │
                        │  DB 0: Auth  │
                        │  DB 1: Cache │
                        └──────────────┘

                   ┌──────────────────────────────┐
                   │          MinIO               │
                   │  • HTML shop pages (S3)      │
                   │  • File digitali             │
                   └──────────────────────────────┘
```

---

## Microservizi

### API Gateway (`services/api-gateway`) — porta 3000

Unico punto di ingresso. Instrada le richieste ai microservizi usando `http-proxy-middleware`.

| Percorso | Destinazione |
|----------|-------------|
| `/api/v1/auth/*` | auth-service:3001 |
| `/api/v1/admin/*` | auth-service:3001 |
| `/api/v1/products/*` | product-service:3002 |
| `/api/v1/categories/*` | product-service:3002 |
| `/api/v1/digital-products/*` | product-service:3002 |
| `/api/v1/bundles/*` | product-service:3002 |
| `/api/v1/orders/*` | order-service:3004 |
| `/api/v1/shop-pages/*` | shop-page-service:3003 |

**Nota tecnica:** Express strips il prefisso del path prima di passarlo al proxy middleware. Le route files usano `pathRewrite` per ripristinare il path completo atteso dal servizio di destinazione.

---

### Auth Service (`services/auth-service`) — porta 3001

Gestisce autenticazione, autorizzazione e amministrazione utenti.

**Stack:** Express + TypeScript + Prisma + PostgreSQL + argon2

**Schema utenti (`auth_db.users`):**
```
id           UUID        PK
email        TEXT        UNIQUE
passwordHash TEXT
role         ENUM        CUSTOMER | VENDOR | ADMIN | SUPPORT
isBanned     BOOLEAN     default: false
lastLoginAt  TIMESTAMP?
createdAt    TIMESTAMP
updatedAt    TIMESTAMP
```

**Funzionalità:**
- Registrazione e login con JWT (access token + refresh token)
- Hashing password con argon2 (non bcrypt)
- Controllo ban al login → 401 se `isBanned = true`
- Aggiornamento automatico `lastLoginAt` ad ogni login riuscito (fire-and-forget)
- Endpoint admin per gestione utenti (list, change role, ban/unban, reset password)

---

### Product Service (`services/product-service`) — porta 3002

Gestisce il catalogo prodotti con supporto multi-tipo.

**Stack:** Express + TypeScript + Prisma + PostgreSQL + Redis (cache) + MinIO (file digitali)

**Tipi di prodotto (`ProductType`):**
- `PHYSICAL` — prodotto fisico con stock
- `DIGITAL_FILE` — file scaricabile (MinIO)
- `DIGITAL_LICENSE` — chiavi di licenza
- `DIGITAL_ACCESS` — abbonamenti/accessi

**Cache Redis (DB 1):**
- Cache-aside pattern per le categorie
- TTL dinamico: scade alle 03:30 AM ogni giorno
- Invalidazione automatica su create/update/delete categoria

**Funzionalità:**
- CRUD prodotti (vendor/admin)
- Categorie con cache Redis
- Bundle (prodotti fisici + digitali misti)
- Upload file digitali su MinIO
- Gestione license keys (import bulk, assegnazione)

---

### Order Service (`services/order-service`) — porta 3004

Gestisce il ciclo degli ordini.

**Stack:** Express + TypeScript + Prisma + PostgreSQL

**Schema (`orders_db`):**
```
Order      — id, userId, total, status, createdAt
OrderItem  — id, orderId, productId, vendorId, quantity, price
```

**Funzionalità:**
- Creazione ordini da checkout
- Lista ordini utente
- Statistiche vendor (aggregazione per giorno)
- Statistiche admin (aggregazione per periodo)

---

### Shop Page Service (`services/shop-page-service`) — porta 3003

Gestisce le pagine vetrina HTML dei vendor.

**Stack:** Express + TypeScript + Prisma + PostgreSQL + MinIO

**Funzionalità:**
- CRUD pagine HTML per vendor
- HTML salvato su MinIO (campo `htmlKey` nel DB, non direttamente nel DB)
- Pubblicazione/bozza
- Preview delle pagine

---

## Frontend (`frontend/store-app`) — porta 5173

**Stack:** React 18 + TypeScript + Vite + Zustand + TanStack Query + shadcn/ui + Tailwind CSS

### Struttura pagine

```
pages/
├── Auth/              — Login, Registrazione
├── Home/              — Homepage catalogo
├── Products/          — Lista prodotti, dettaglio
├── Bundles/           — Lista bundle, dettaglio
├── Checkout/          — Processo di pagamento
├── ShopPages/         — Visualizzazione shop pages
│   └── builder/       — Editor HTML (drag-and-drop, preview)
├── Vendor/            — Area vendor
│   ├── Dashboard/     — Stats + grafico vendite (AreaChart)
│   ├── Products/      — CRUD prodotti vendor
│   └── Bundles/       — CRUD bundle vendor
└── Admin/             — Area amministrativa (solo ADMIN)
    ├── Dashboard/     — Stats piattaforma + BarChart ordini
    ├── Categories/    — CRUD categorie
    └── Users/         — Gestione utenti
```

### State management

| Layer | Tecnologia | Utilizzo |
|-------|-----------|---------|
| Server state | TanStack Query | Fetch, cache, invalidazione |
| Client state | Zustand | Auth (token, user), Cart |
| Routing | React Router v6 | Nested routes, protected routes |

### Internazionalizzazione

- `react-i18next` con namespace separati per area
- Lingue: italiano (IT), inglese (EN)
- File in `public/locales/{it,en}/*.json`
- Namespace: `common`, `auth`, `products`, `vendor`, `admin`

---

## Infrastruttura

### Docker Compose (sviluppo locale)

Tutti i servizi backend girano in Docker. Il frontend Vite gira localmente.

```yaml
# Servizi attivi:
api-gateway:3000
auth-service:3001
product-service:3002
shop-page-service:3003
order-service:3004
postgres (auth_db, products_db, orders_db, shop_pages_db)
redis
minio
```

### Comandi utili

```bash
# Avviare tutto
docker compose up -d

# Rebuild di un servizio (dopo modifiche al codice)
docker compose build --no-cache <service> && docker compose up -d <service>

# Logs in tempo reale
docker compose logs -f <service>

# Eseguire comando in un container
docker compose exec <service> <command>

# Rigenerare Prisma client (dopo modifica schema)
cd services/<service> && npx prisma generate
```

### Note importanti

- **Rebuild con `--no-cache`** quando si aggiungono nuovi file TypeScript: il layer caching Docker potrebbe servire un `dist/` obsoleto.
- **`prisma generate` deve essere eseguito sull'host** prima del build Docker quando si modifica lo schema, altrimenti TypeScript compilation fallisce per tipi mancanti.
- **Argon2** è il hasher usato per le password (non bcrypt). Non aggiornare mai un hash direttamente via `psql` — usare sempre il codice applicativo.

---

## Osservabilità (LGTM Stack)

Stack di monitoraggio completo integrato:

| Componente | Ruolo |
|-----------|-------|
| **Pino** | Logging strutturato JSON nei servizi |
| **Loki + Promtail** | Aggregazione e query dei log |
| **OpenTelemetry SDK** | Metriche + tracing nei servizi |
| **Prometheus** | Raccolta metriche |
| **Tempo** | Distributed tracing |
| **Grafana** | Visualizzazione (log + metriche + traces correlati) |
| **OTel Collector** | Collector centralizzato con persistent queues |

---

## Sicurezza

- **JWT** con access token (breve durata) + refresh token
- **Middleware `authenticate`** verifica JWT su tutti gli endpoint protetti
- **Middleware `authorize(['ROLE'])`** controlla il ruolo
- **argon2** per l'hashing delle password
- **Ban account**: `isBanned` bloccato al login, non richiede revoca token (access token breve durata)
- **Rate limiting** nell'API Gateway
