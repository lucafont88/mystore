# MEMORY.md — Contesto progetto mystore

Questo file riassume tutto il contesto accumulato sul progetto. Rileggilo all'inizio di ogni sessione.

> **Ultimo aggiornamento:** 2026-03-02

---

## Cos'è il progetto

E-commerce full-stack a microservizi: store B2C + marketplace vendor.
- **Monorepo pnpm** con workspace
- **Backend:** microservizi Node.js/TypeScript in Docker
- **Frontend:** React 18 + Vite (porta 5173)

---

## Servizi attivi e porte

| Servizio | Porta | DB | Note |
|---------|-------|----|------|
| `api-gateway` | 3000 | — | Unico ingresso, proxy verso tutti |
| `auth-service` | 3001 | `auth_db` (postgres) | JWT, RBAC, gestione utenti admin |
| `product-service` | 3002 | `products_db` (postgres) | Prodotti, categorie, digitali, bundle |
| `shop-page-service` | 3003 | `shop_pages_db` (postgres) | Pagine HTML vendor su MinIO |
| `order-service` | 3004 | `orders_db` (postgres) | Ordini, checkout, stats |
| Redis | — | DB 0: auth / DB 1: cache | Cache categorie in product-service |
| MinIO | — | — | HTML shop pages + file digitali |

---

## Architettura gateway

Il gateway usa `http-proxy-middleware`. Express **strips il prefisso** prima di passare al proxy, quindi ogni `routes/*.ts` nel gateway usa `pathRewrite` per ripristinare il path completo:

```typescript
pathRewrite: (reqPath: string) => `/api/v1/admin${reqPath}`
```

Senza `pathRewrite` il servizio destinazione riceve `/users` invece di `/api/v1/admin/users`.

---

## Ruoli utente

`CUSTOMER` | `VENDOR` | `ADMIN` | `SUPPORT`

Middleware auth-service:
```typescript
authenticate            // verifica JWT
authorize(['ADMIN'])    // verifica ruolo
```

---

## Pattern e regole critiche

### Password
- Hashing con **argon2** (NON bcrypt)
- **Mai** aggiornare un hash direttamente via `psql` — il `$` in bash corrompe il valore
- Per aggiornare password da container:
  ```bash
  docker compose exec auth-service node -e "
    const argon2 = require('argon2');
    const {PrismaClient} = require('@prisma/client');
    const prisma = new PrismaClient();
    argon2.hash('NuovaPassword!').then(h =>
      prisma.user.update({where:{email:'x@y.com'}, data:{passwordHash:h}})
    ).then(console.log)"
  ```

### Docker rebuild
- Dopo aggiunta di **nuovi file** TypeScript usare `--no-cache`:
  ```bash
  docker compose build --no-cache <service> && docker compose up -d <service>
  ```
- Dopo modifica **schema Prisma**, rigenerare il client sull'**host** prima del build Docker:
  ```bash
  cd services/<service> && npx prisma generate
  ```

### React
- **Mai** fare `setState` durante il render — usare sempre `useEffect`
- `Radix TabsContent` smonta il componente quando il tab non è attivo (no `forceMount`)

### API contratti
- `getPages` (shop-page-service) ritorna `{ items, total }` — non array diretto
- `getPage` include `htmlContent` letto da MinIO nella risposta
- Campo body per save content è `htmlContent` (non `html`)
- Risposta DELETE categorie: `204 No Content` — gestire nel frontend (`api.ts`)

---

## Cache Redis (product-service)

- Cache-aside su `GET /categories`
- **DB 1** (auth usa DB 0)
- TTL dinamico: scade ogni giorno alle **03:30 AM**
- Graceful fallback al DB se Redis non disponibile
- Invalidazione automatica su create/update/delete categoria

---

## Schema utenti — campi rilevanti

```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  role         Role      @default(CUSTOMER)
  isBanned     Boolean   @default(false)   // aggiunto 2026-03-01
  lastLoginAt  DateTime?                   // aggiunto 2026-03-01
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  @@map("users")
}
```

Migrazione applicata: `20260301090000_add_user_management_fields`

---

## Frontend — struttura pagine

```
pages/
├── Auth/              — Login, Registrazione
├── Home/
├── Products/          — Lista + dettaglio (fisici, digitali, license)
├── Bundles/           — Lista + dettaglio bundle
├── Checkout/
├── ShopPages/         — Visualizzazione + builder DnD
├── Vendor/
│   ├── Dashboard/     — Stats + AreaChart (Recharts)
│   ├── Products/      — CRUD (multi-tipo con upload file)
│   └── Bundles/       — CRUD bundle
└── Admin/             — Solo ADMIN
    ├── Dashboard/     — Stats + BarChart ordini (Recharts)
    ├── Categories/    — CRUD categorie
    └── Users/         — Gestione utenti (ban, ruolo, reset pwd)
```

### State management
- **Zustand**: auth (token + user), cart
- **TanStack Query**: tutto il server state (fetch, cache, invalidazione)

### i18n
- `react-i18next`, namespace separati: `common`, `auth`, `products`, `vendor`, `admin`
- File in `public/locales/{it,en}/*.json`

---

## Tipi prodotto

```typescript
enum ProductType {
  PHYSICAL         // stock, spedizione
  DIGITAL_FILE     // upload su MinIO, presigned URL download
  DIGITAL_LICENSE  // license keys (import bulk)
  DIGITAL_ACCESS   // abbonamenti
}
```

Bundle: prodotti fisici + digitali misti, `discountPercent`, `qty=1` enforced per digitali.

---

## Conductor (tracciamento)

File chiave:
- `conductor/tracks.md` — lista track attivi e archiviati
- `conductor/tracks/<nome>/plan.md` — piano della feature
- `conductor/archive/<nome>/` — feature completate

**Track attivo al 2026-03-02:** `admin_panel_20260301`
- Dashboard + Gestione Categorie ✅
- Gestione Utenti ✅ (completata in sessione 2026-03-01/02)

---

## Documentazione (docs/)

| File | Contenuto |
|------|-----------|
| `ARCHITECTURE.md` | Diagramma sistema, servizi, note Docker |
| `API_REFERENCE.md` | Tutti gli endpoint con esempi curl |
| `ADMIN_PANEL.md` | Dashboard, Categorie, Utenti — detail tecnico |
| `FEATURES.md` | Log cronologico di tutte le 15 feature |
| `IMPLEMENTATION_GUIDE.md` | Setup infrastruttura (Swarm, K8s) |
| `OBSERVABILITY_GUIDE.md` | Stack LGTM |

---

## Preferenze di lavoro (utente)

- Comunicare in **italiano**
- Strutturare risposte con sezioni (Descrizione / Codice / Note)
- Tracciare tutto in `conductor/` seguendo il pattern esistente
- Non creare branch git — lavorare sempre sul branch corrente
- Non committare mai senza richiesta esplicita

---

## Comandi di sviluppo frequenti

```bash
# Avviare tutti i servizi
docker compose up -d

# Rebuild singolo servizio (con cache)
docker compose build <service> && docker compose up -d <service>

# Rebuild senza cache (nuovi file TS)
docker compose build --no-cache <service> && docker compose up -d <service>

# TypeScript check frontend
cd frontend/store-app && npx tsc --noEmit

# Vite build check
cd frontend/store-app && npm run build

# Log servizio
docker compose logs -f <service>

# Shell in container
docker compose exec <service> sh

# Prisma generate (dopo modifica schema)
cd services/<service> && npx prisma generate

# Prisma migrate (in container)
docker compose exec <service> npx prisma migrate deploy
```
