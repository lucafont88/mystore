# Admin Panel

Documentazione del pannello di amministrazione della piattaforma.

> **Aggiornato al:** 2026-03-02

---

## Accesso

L'admin panel è accessibile a tutti gli utenti con ruolo `ADMIN` all'URL:
```
http://localhost:5173/admin
```

Il link "Admin" appare nell'header del sito solo se l'utente autenticato ha ruolo `ADMIN`.

---

## Struttura

Il pannello è composto da un layout con sidebar a sinistra e contenuto a destra.

```
/admin                    → redirect a /admin/dashboard
/admin/dashboard          → Dashboard con statistiche e grafici
/admin/categories         → Gestione categorie
/admin/users              → Gestione utenti
```

### Sidebar

```
┌────────────────────┐
│  Admin Panel       │
│  ─────────────     │
│  📊 Dashboard      │  → /admin/dashboard
│  👥 Gestisci Utenti│  → /admin/users
│  🏷  Categorie      │  → /admin/categories
└────────────────────┘
```

---

## Dashboard (`/admin/dashboard`)

### Statistiche piattaforma

Mostra le statistiche aggregate degli ordini dell'intera piattaforma.

**Componenti:**
- **Selettore periodo** — 7, 30, 90 giorni
- **Card statistiche:**
  - Totale ordini nel periodo
  - Totale ricavi nel periodo
  - Media ordini/giorno
- **BarChart** — Recharts, ordini per giorno nel periodo selezionato

**API chiamata:**
```
GET /api/v1/orders/admin/stats?period=<giorni>
```

**File:**
- `frontend/store-app/src/pages/Admin/Dashboard/index.tsx`
- `frontend/store-app/src/queries/useAdminStatsQuery.ts`
- `services/order-service/src/controllers/order.controller.ts` → `adminStats()`

---

## Gestione Categorie (`/admin/categories`)

Permette la gestione completa (CRUD) delle categorie prodotto.

### Funzionalità

- **Lista categorie** — tabella con nome, slug, numero prodotti
- **Crea categoria** — dialog con form (nome, slug, categoria padre)
- **Modifica categoria** — dialog pre-popolato
- **Elimina categoria** — dialog di conferma

### Cache Redis

Ogni operazione di create/update/delete categoria invalida automaticamente la cache Redis (DB 1), forzando il refresh al prossimo accesso pubblico.

**API usate:**
```
GET    /api/v1/categories
POST   /api/v1/categories
PUT    /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

**File:**
- `frontend/store-app/src/pages/Admin/Categories/index.tsx`
- `frontend/store-app/src/queries/useCategoriesQuery.ts`
- `frontend/store-app/src/services/categories.service.ts`

---

## Gestione Utenti (`/admin/users`)

Permette la visualizzazione e gestione di tutti gli utenti registrati sulla piattaforma.

### Tabella utenti

Colonne visualizzate:
| Colonna | Descrizione |
|---------|-------------|
| **Email** | Indirizzo email dell'utente |
| **Ruolo** | Badge colorato: ADMIN (viola), VENDOR (blu), CUSTOMER (verde), SUPPORT (arancione) |
| **Stato** | Badge: Attivo (verde) / Bannato (rosso) |
| **Ultimo accesso** | Data/ora dell'ultimo login (o "Mai" se mai effettuato) |
| **Creato il** | Data di registrazione |
| **Azioni** | Menu con: Cambia ruolo, Banna/Sbanna, Reset password |

### Azioni disponibili

#### 1. Cambia ruolo

Apre un dialog con un select per scegliere il nuovo ruolo.

Ruoli selezionabili:
- `CUSTOMER` — cliente standard
- `VENDOR` — venditore con accesso all'area vendor
- `ADMIN` — amministratore con accesso all'admin panel
- `SUPPORT` — staff di supporto

**API:**
```
PUT /api/v1/admin/users/:id/role
Body: { "role": "VENDOR" }
```

#### 2. Banna / Sbanna account

Dialog di conferma. Un account bannato:
- Non può più effettuare il login (riceve errore `Account bannato`)
- I token JWT esistenti rimangono validi fino alla scadenza naturale (access token breve durata)

**API:**
```
PUT /api/v1/admin/users/:id/ban
Body: { "banned": true | false }
```

#### 3. Reset password

Dialog in due step:
1. Conferma dell'operazione
2. Mostra la password temporanea generata (copiabile con un click)

La password temporanea ha formato `Tmp_XXXXXX!` dove `XXXXXX` è alfanumerico maiuscolo casuale.

**API:**
```
POST /api/v1/admin/users/:id/reset-password
Response: { "tempPassword": "Tmp_ABC123!" }
```

### File

**Frontend:**
- `frontend/store-app/src/pages/Admin/Users/index.tsx`
- `frontend/store-app/src/queries/useAdminUsersQuery.ts`
- `frontend/store-app/src/services/adminUsers.service.ts`

**Backend (auth-service):**
- `services/auth-service/src/controllers/adminUser.controller.ts`
- `services/auth-service/src/routes/adminUser.routes.ts`

**Gateway:**
- `services/api-gateway/src/routes/admin.routes.ts`

---

## Schema database (utenti)

I campi aggiunti al model `User` per il supporto admin:

```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  role         Role      @default(CUSTOMER)
  isBanned     Boolean   @default(false)   // nuovo
  lastLoginAt  DateTime?                   // nuovo
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  @@map("users")
}
```

**Migrazione:** `services/auth-service/prisma/migrations/20260301090000_add_user_management_fields/`

---

## Internazionalizzazione

Tutte le stringhe dell'admin panel sono localizzate nel namespace `admin`.

**File:**
- `frontend/store-app/public/locales/it/admin.json`
- `frontend/store-app/public/locales/en/admin.json`

**Chiavi principali:**
```json
{
  "sidebar": {
    "dashboard": "Dashboard",
    "users": "Gestisci Utenti",
    "categories": "Categorie"
  },
  "users": {
    "title": "Gestione Utenti",
    "changeRole": "Cambia Ruolo",
    "ban": "Banna",
    "unban": "Sbanna",
    "resetPassword": "Reset Password",
    "tempPasswordLabel": "Password temporanea"
  }
}
```

---

## Note tecniche

### Routing gateway per `/api/v1/admin`

Il gateway proxy tutte le richieste `/api/v1/admin/*` verso `auth-service`. Il `pathRewrite` è necessario perché Express strips il prefisso prima di passare la richiesta al proxy middleware:

```typescript
// services/api-gateway/src/routes/admin.routes.ts
pathRewrite: (reqPath: string) => `/api/v1/admin${reqPath}`
```

Senza questo, `auth-service` riceverebbe `/users` invece di `/api/v1/admin/users`.

### Autorizzazione

Tutti gli endpoint admin richiedono il doppio middleware:
```typescript
router.get('/', authenticate, authorize(['ADMIN']), ...)
```
